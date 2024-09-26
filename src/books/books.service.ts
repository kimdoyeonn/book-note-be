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

  // 책을 생성하고 책과 사용자를 연결
  async create(userId: number, input: CreateBookInput) {
    // ISBN 중복 체크
    let book = await this.prisma.book.findUnique({
      where: { isbn: input.isbn },
    });

    // 책이 없으면 새로 생성
    if (!book) {
      book = await this.prisma.book.create({
        data: {
          isbn: input.isbn,
          title: input.title,
          summary: input.summary,
          shared: input.shared ?? false,
          author: input.author,
          thumbnailUrl: input.thumbnailUrl,
          publisher: input.publisher,
        },
      });
    }

    const userBook = await this.prisma.userBook.findUnique({
      where: {
        userId_bookId: {
          bookId: book.id,
          userId,
        },
      },
    });

    if (!userBook) {
      // UserBook 관계 생성 (책과 사용자 연결)
      await this.prisma.userBook.create({
        data: {
          userId,
          bookId: book.id,
        },
      });
    }

    return book;
  }

  // 책 좋아요 기능
  async likeBook(userId: number, bookId: number) {
    const existingLike = await this.prisma.bookLike.findUnique({
      where: {
        userId_bookId: {
          userId,
          bookId,
        },
      },
    });

    // 좋아요 -> 취소, 취소 -> 좋아요
    if (existingLike) {
      const updatedLike = await this.prisma.bookLike.update({
        where: {
          userId_bookId: {
            userId,
            bookId,
          },
        },
        data: {
          isLike: !existingLike.isLike,
        },
      });
      return updatedLike;
    }

    // 새로운 좋아요 생성
    return this.prisma.bookLike.create({
      data: {
        userId,
        bookId,
        isLike: true,
      },
    });
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
