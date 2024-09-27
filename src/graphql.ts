
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateBookInput {
    isbn: string;
    title: string;
    summary: string;
    shared?: Nullable<boolean>;
    author: string;
    like?: Nullable<boolean>;
    thumbnailUrl: string;
    publisher: string;
}

export class CreateNoteInput {
    content: string;
    bookId: number;
}

export class Book {
    id: string;
    isbn: string;
    title: string;
    summary: string;
    shared?: Nullable<boolean>;
    author: string;
    thumbnailUrl: string;
    publisher: string;
    notes: Note[];
}

export class Note {
    content: string;
    userId: number;
    bookId: number;
    id: string;
}

export class BookLike {
    id: string;
    userId: number;
    bookId: number;
    isLike: boolean;
}

export abstract class IQuery {
    abstract books(): Book[] | Promise<Book[]>;

    abstract book(id: number): Nullable<Book> | Promise<Nullable<Book>>;

    abstract notes(bookId?: Nullable<number>): Note[] | Promise<Note[]>;

    abstract note(id: number): Nullable<Note> | Promise<Nullable<Note>>;
}

export abstract class IMutation {
    abstract createBook(input: CreateBookInput): Book | Promise<Book>;

    abstract likeBook(bookId: number): BookLike | Promise<BookLike>;

    abstract createNote(input: CreateNoteInput): Note | Promise<Note>;

    abstract deleteNote(id: number): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract editNote(id: number, content: string): Note | Promise<Note>;
}

type Nullable<T> = T | null;
