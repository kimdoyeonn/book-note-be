import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { Book } from 'src/graphql';
import { CreateBookInput } from './dto/create-book.input';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from 'src/auth/graphql-auth.guard';

@Resolver(() => Book)
export class BooksResolver {
  constructor(private booksService: BooksService) {}

  @UseGuards(GraphqlAuthGuard)
  @Query(() => Book)
  async book(@Args('id') id: number) {
    return await this.booksService.findOneById(id);
  }

  @UseGuards(GraphqlAuthGuard)
  @Query(() => [Book])
  async books(@Context('req') req) {
    return await this.booksService.findBooks(req.user.userId);
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => Book)
  async createBook(@Context('req') req, @Args('input') input: CreateBookInput) {
    const book = await this.booksService.create(req.user.userId, input);

    return book;
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => Book)
  async likeBook(@Context('req') req, @Args('bookId') bookId: number) {
    const book = await this.booksService.likeBook(req.user.userId, bookId);
    return book;
  }
}
