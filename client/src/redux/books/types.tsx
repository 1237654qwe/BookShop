/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
export type BooksInfo = {
  id: number,
  title: string,
  author: string,
  description: string
  genre: string,
  price: number,
  rating: number,
  coverUrl: string,
  userRating: number,
};

export type BooksPayload = {
  books: BooksInfo[],
  count: number,
};

export type OneBookPayload = {
  book: BooksInfo,
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
  ONE_BOOK_LOADING = 'ONE_BOOK_LOADING',
  ONE_BOOK_FAILED = 'ONE_BOOK_FAILED',
  ONE_BOOK_SUCCESS = 'ONE_BOOK_SUCCESS',
  GET_USER_RATING = 'GET_USER_RATING',
  COMMENT_INPUT = 'COMMENT_INPUT'
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

interface IOneBookLoading {
  type: BooksActionTypes.ONE_BOOK_LOADING,
}

interface IOneBookFailed {
  type: BooksActionTypes.ONE_BOOK_FAILED,
  payload: string
}

interface IGetUserReting {
  type: BooksActionTypes.GET_USER_RATING,
  payload: number
}

interface IOneBookSuccess {
  type: BooksActionTypes.ONE_BOOK_SUCCESS,
  payload: OneBookPayload
}

export type BooksActions =
  IBooksLoading |
  IBooksFailed |
  IBooksSuccess |
  IBooksFiltersLoading |
  IBooksFiltersFailed |
  IBooksFiltersSuccess |
  IOneBookLoading |
  IOneBookFailed |
  IGetUserReting |
  IOneBookSuccess
