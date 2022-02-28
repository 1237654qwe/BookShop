export type BooksInfo = {
  id: number,
  title: string,
  coverUrl: string,
  author: string,
  price: number,
};

export type BooksPayload = {
  books: BooksInfo[],
  count: number
};

export enum BooksActionTypes {
  BOOKS_LOADING = "BOOK_LOADING",
  BOOKS_FAILED = "BOOK_FAILED",
  BOOKS_SUCCESS = "BOOK_SUCCESS",
  SET_BOOKS_PAGE = "SET_BOOKS_PAGE"
};

interface IBooksLoading {
  type: BooksActionTypes.BOOKS_LOADING
};

interface IBooksFailed {
  type: BooksActionTypes.BOOKS_FAILED,
  payload: string
};

interface IBooksSuccess {
  type: BooksActionTypes.BOOKS_SUCCESS,
  payload: BooksPayload
};

interface ISetBooksPage {
  type: BooksActionTypes.SET_BOOKS_PAGE,
  payload: number
};

export type BooksActions =
  IBooksLoading |
  IBooksFailed |
  IBooksSuccess |
  ISetBooksPage