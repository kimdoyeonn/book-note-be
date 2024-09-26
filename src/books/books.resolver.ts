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
  async createBook(
    @Args('userId') userId: number,
    @Args('input') input: CreateBookInput,
  ) {
    const book = await this.booksService.create(userId, input);

    return book;
  }

  @Mutation(() => Book)
  async likeBook(
    @Args('userId') userId: number,
    @Args('bookId') bookId: number,
  ) {
    const book = await this.booksService.likeBook(userId, bookId);
    return book;
  }
}
