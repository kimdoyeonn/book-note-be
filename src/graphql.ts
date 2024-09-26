
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface Book {
    id: string;
    isbn: string;
    title: string;
    summary: string;
    shared?: Nullable<boolean>;
    author: string;
    thumbnailUrl: string;
    publisher: string;
}

export interface IQuery {
    books(): Book[] | Promise<Book[]>;
    book(id: string): Nullable<Book> | Promise<Nullable<Book>>;
}

type Nullable<T> = T | null;
