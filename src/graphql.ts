
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
}

export class BookLike {
    id: string;
    userId: number;
    bookId: number;
    isLike: boolean;
}

export abstract class IQuery {
    abstract books(): Book[] | Promise<Book[]>;

    abstract book(id: string): Nullable<Book> | Promise<Nullable<Book>>;
}

export abstract class IMutation {
    abstract createBook(userId: number, input: CreateBookInput): Book | Promise<Book>;

    abstract likeBook(userId: number, bookId: number): BookLike | Promise<BookLike>;
}

type Nullable<T> = T | null;
