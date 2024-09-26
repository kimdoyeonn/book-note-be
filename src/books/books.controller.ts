import { Controller, Get, Query } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async searchBooks(
    @Query('keyword') keyword: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    const result = await this.booksService.searchBooks(
      keyword,
      page ?? 0,
      limit ?? 20,
    );

    return { ...result };
  }
}
