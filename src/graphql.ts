
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
    userId: number;
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
    like?: Nullable<boolean>;
    userId: number;
    notes: Note[];
}

export class Note {
    content: string;
    userId: number;
    bookId: number;
}

export abstract class IQuery {
    abstract books(): Book[] | Promise<Book[]>;

    abstract book(id: string): Nullable<Book> | Promise<Nullable<Book>>;
}

export abstract class IMutation {
    abstract createBook(input: CreateBookInput): Book | Promise<Book>;
}

type Nullable<T> = T | null;
