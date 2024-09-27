import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteInput } from 'src/graphql';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) {}

  async getNoteById(userId: number, noteId: number) {
    const note = await this.prisma.note.findFirst({
      where: { id: noteId, userId, isDeleted: false },
    });

    if (!note) {
      throw new NotFoundException(
        `Note with ID ${noteId} not found for user ${userId}`,
      );
    }

    return note;
  }

  async getNotes(userId: number, bookId?: number) {
    return this.prisma.note.findMany({
      where: { userId, ...(bookId ? { bookId } : {}), isDeleted: false },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async create(userId: number, input: CreateNoteInput) {
    const existedBook = await this.prisma.book.findUnique({
      where: { id: input.bookId },
    });

    if (!existedBook) {
      throw new NotFoundException(`Book ${input.bookId} not found`);
    }

    const existedUserBook = await this.prisma.userBook.findFirst({
      where: { bookId: input.bookId, userId },
    });

    if (!existedUserBook) {
      throw new NotFoundException(
        `Book ${input.bookId} for User ${userId} not found`,
      );
    }

    return this.prisma.note.create({
      data: {
        userId,
        bookId: input.bookId,
        content: input.content,
      },
    });
  }

  async updateNote(userId: number, noteId: number, content: string) {
    const exitedNote = await this.prisma.note.findUnique({
      where: { id: noteId, userId, isDeleted: false },
    });

    if (!exitedNote) {
      throw new NotFoundException(
        `Note ${noteId} for User ${userId} not found`,
      );
    }

    const note = await this.prisma.note.update({
      where: { id: exitedNote.id },
      data: { content },
    });

    return note;
  }

  async deleteNote(userId: number, noteId: number) {
    const exitedNote = await this.prisma.note.findUnique({
      where: { id: noteId, userId },
    });

    if (!exitedNote) {
      throw new NotFoundException(
        `Note ${noteId} for User ${userId} not found`,
      );
    }

    await this.prisma.note.update({
      where: { id: exitedNote.id },
      data: {
        isDeleted: true,
      },
    });

    return true;
  }
}
