import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { Book } from 'src/graphql';
import { CreateBookInput } from './dto/create-book.input';

@Resolver(() => Book)
export class BooksResolver {
  constructor(private booksService: BooksService) {}

  @Query(() => Book)
  async book(@Args('id') id: number) {
    return await this.booksService.findOneById(id);
  }

  @Mutation(() => Book)
  async createBook(@Args('input') input: CreateBookInput) {
    const book = await this.booksService.create(input);

    return book;
  }

  @Mutation(() => Book)
  async likeBook(@Args('id') id: number) {
    const book = await this.booksService.likeBook(id);
    return book;
  }
}
