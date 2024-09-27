import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Note } from 'src/graphql';
import { CreateBookInput } from '../books/dto/create-book.input';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { NotesService } from './notes.service';
import { CreateNoteInput } from './dto/create-note.input';

@Resolver(() => Note)
export class NotesResolver {
  constructor(private notesService: NotesService) {}

  @UseGuards(GraphqlAuthGuard)
  @Query(() => Note)
  async note(@Context('req') req, @Args('id') noteId: number) {
    return await this.notesService.getNoteById(req.user.userId, noteId);
  }

  @UseGuards(GraphqlAuthGuard)
  @Query(() => [Note])
  async notes(@Context('req') req, @Args('bookId') bookId?: number) {
    return await this.notesService.getNotes(req.user.userId, bookId);
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => Note)
  async createNote(@Context('req') req, @Args('input') input: CreateNoteInput) {
    const note = await this.notesService.create(req.user.userId, input);

    return note;
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => Note)
  async editNote(
    @Context('req') req,
    @Args('id') id: number,
    @Args('content') content: string,
  ) {
    const note = await this.notesService.updateNote(
      req.user.userId,
      id,
      content,
    );

    return note;
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => Note)
  async deleteNote(@Context('req') req, @Args('id') id: number) {
    const note = await this.notesService.deleteNote(req.user.userId, id);

    return note;
  }
}
