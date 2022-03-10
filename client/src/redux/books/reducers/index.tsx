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
  book: BooksInfo,
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
  book: {
    id: 0,
    title: '',
    author: '',
    description: '',
    genre: '',
    price: 0,
    rating: 0,
    coverUrl: '',
    userRating: 0,
  },
  count: 0,
  page: 1,
  limit: 9,
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
    case BooksActionTypes.ONE_BOOK_FAILED:
      return {
        ...state,
        loading: false,
      };
    case BooksActionTypes.ONE_BOOK_LOADING:
      return {
        ...state,
        loading: true,
      };
    case BooksActionTypes.ONE_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        book: action.payload.book,
      };
    case BooksActionTypes.GET_USER_RATING:
      return {
        ...state,
        book: {
          ...state.book,
          userRating: action.payload,
        },
      };
    default:
      return state;
  }
};

export default booksReducer;
