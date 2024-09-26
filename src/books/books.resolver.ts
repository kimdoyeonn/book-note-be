import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { Book } from 'src/graphql';
import { CreateBookInput } from './dto/create-book.input';
import { InternalServerErrorException } from '@nestjs/common';

@Resolver(() => Book)
export class BooksResolver {
  constructor(private booksService: BooksService) {}

  @Query(() => Book)
  async book(@Args('id') id: number) {
    return await this.booksService.findOneById(id);
  }

  @Mutation(() => Book)
  async createBook(@Args('input') input: CreateBookInput) {
    try {
      const book = await this.booksService.create(input);

      return book;
    } catch (error) {
      console.error('Error creating book:', error);
      throw new InternalServerErrorException('Internal server error'); // 사용자에게 보여줄 일반적인 에러 메시지
    }
  }
}
