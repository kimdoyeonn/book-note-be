import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from 'src/prisma.service';
import { CreateBookInput } from './dto/create-book.input';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  async findOneById(id: number) {
    const result = this.prisma.book.findUnique({ where: { id } });
    return result;
  }

  async create(input: CreateBookInput) {
    const result = this.prisma.book.create({
      data: {
        isbn: input.isbn,
        title: input.title,
        author: input.author,
        shared: input.shared,
        publisher: input.publisher,
        summary: input.summary,
        thumbnailUrl: input.thumbnailUrl,
      },
    });
    return result;
  }

  async likeBook(id: number) {
    const result = await this.prisma.book.update({
      where: { id },
      data: { like: true },
    });

    return result;
  }

  async searchBooks(keyword: string, page: number, limit: number) {
    try {
      const { data } = await axios.get(
        'https://openapi.naver.com/v1/search/book.json',
        {
          headers: {
            'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
            'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET,
          },
          params: { query: keyword, display: limit, start: page * limit + 1 },
        },
      );

      return data;
    } catch (err) {
      console.error(err);
    }
  }
}
