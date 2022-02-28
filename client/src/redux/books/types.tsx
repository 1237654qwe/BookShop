/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
export type BooksInfo = {
  id: number,
  title: string,
  coverUrl: string,
  author: string,
  price: number,
  genre: string,
};

export type BooksPayload = {
  books: BooksInfo[],
  count: number,
};

export type BooksFiltersPayload = {
  filtredAuthor: string[],
  filtredGenre: string[],
}

export enum BooksActionTypes {
  BOOKS_LOADING = 'BOOK_LOADING',
  BOOKS_FAILED = 'BOOK_FAILED',
  BOOKS_SUCCESS = 'BOOK_SUCCESS',
  BOOKS_FILTERS_LOADING = 'BOOKS_FILTERS_LOADING',
  BOOKS_FILTERS_FAILED = 'BOOKS_FILTERS_FAILED',
  BOOKS_FILTERS_SUCCESS = 'BOOKS_FILTERS_SUCCESS',
}

interface IBooksLoading {
  type: BooksActionTypes.BOOKS_LOADING,
}

interface IBooksFailed {
  type: BooksActionTypes.BOOKS_FAILED,
  payload: string
}

interface IBooksSuccess {
  type: BooksActionTypes.BOOKS_SUCCESS,
  payload: BooksPayload
}

interface IBooksFiltersLoading {
  type: BooksActionTypes.BOOKS_FILTERS_LOADING,
}

interface IBooksFiltersFailed {
  type: BooksActionTypes.BOOKS_FILTERS_FAILED,
  payload: string
}

interface IBooksFiltersSuccess {
  type: BooksActionTypes.BOOKS_FILTERS_SUCCESS,
  payload: BooksFiltersPayload
}

export type BooksActions =
  IBooksLoading |
  IBooksFailed |
  IBooksSuccess |
  IBooksFiltersLoading |
  IBooksFiltersFailed |
  IBooksFiltersSuccess
