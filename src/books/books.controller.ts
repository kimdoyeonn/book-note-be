import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Post('/share')
  async getShareToken(@Req() req, @Body('bookId') bookId: number) {
    return this.booksService.generateShareToken(req.user.id, bookId);
  }

  @Get('/share/view')
  async getSharedBook(@Query('token') token: string) {
    return this.booksService.verifyTokenAndGetBookWithNotes(token);
  }
}
