import {
  BooksInfo,
  BooksActionTypes,
  BooksActions,
} from "../types";

export interface IBooksState {
  loading: boolean,
  books: BooksInfo[]
  page: number,
  limit: number,
};

const initialState: IBooksState = {
  loading: false,
  books: [],
  page: 1,
  limit: 10,
};

const booksReducer = (state: IBooksState = initialState, action: BooksActions): IBooksState => {
  switch (action.type) {
    case BooksActionTypes.BOOKS_FAILED:
      return {
        ...state,
        loading: false
      };
    case BooksActionTypes.BOOKS_LOADING:
      return {
        ...state,
        loading: true
      };
    case BooksActionTypes.BOOKS_SUCCESS:
      return {
        ...state,
        loading: false,
        books: action.payload
      };
    case BooksActionTypes.SET_BOOKS_PAGE:
      return {
        ...state,
        page: action.payload
      };
    default:
      return state
  };
};

export default booksReducer;