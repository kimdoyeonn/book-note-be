import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { HttpModule } from '@nestjs/axios';
import { PrismaService } from 'src/prisma.service';
import { BooksResolver } from './books.resolver';

@Module({
  imports: [HttpModule],
  controllers: [BooksController],
  providers: [BooksService, PrismaService, BooksResolver],
})
export class BooksModule {}
