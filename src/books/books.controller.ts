import { Body, Controller, Get, Patch, Post, Query, Req } from '@nestjs/common';
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

  @Post('/share')
  async getShareToken(
    @Body('userId') userId: number,
    @Body('bookId') bookId: number,
  ) {
    return this.booksService.generateShareToken(userId, bookId);
  }

  @Get('/share/view')
  async getSharedBook(@Query('token') token: string) {
    return this.booksService.verifyTokenAndGetBookWithNotes(token);
  }
}
