import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

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
