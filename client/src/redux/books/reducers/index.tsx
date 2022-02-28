/* eslint-disable default-param-last */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import {
  BooksInfo,
  BooksActionTypes,
  BooksActions,
} from '../types';

export interface IFilters {
  author: string[],
  genre: string[],
}

export interface IBooksState {
  loading: boolean,
  filters: IFilters,
  books: BooksInfo[],
  count: number,
  page: number,
  limit: number,
}

const initialState: IBooksState = {
  loading: false,
  filters: {
    author: [],
    genre: [],
  },
  books: [],
  count: 0,
  page: 1,
  limit: 10,
};

const booksReducer = (state: IBooksState = initialState, action: BooksActions): IBooksState => {
  switch (action.type) {
    case BooksActionTypes.BOOKS_FAILED:
      return {
        ...state,
        loading: false,
      };
    case BooksActionTypes.BOOKS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case BooksActionTypes.BOOKS_SUCCESS:
      return {
        ...state,
        loading: false,
        books: action.payload.books,
        count: action.payload.count,
      };
    case BooksActionTypes.BOOKS_FILTERS_FAILED:
      return {
        ...state,
        loading: false,
      };
    case BooksActionTypes.BOOKS_FILTERS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case BooksActionTypes.BOOKS_FILTERS_SUCCESS:
      return {
        ...state,
        loading: false,
        filters: {
          author: action.payload.filtredAuthor,
          genre: action.payload.filtredGenre,
        },
      };
    default:
      return state;
  }
};

export default booksReducer;
