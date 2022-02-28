import {
  BookInfo,
  BookActionTypes,
  BookActions,
} from "../types";

export interface IBookState {
  loading: boolean,
  books: BookInfo[]
  page: number,
  limit: number,
};

const initialState: IBookState = {
  loading: false,
  books: [],
  page: 1,
  limit: 10,
};

const bookReducer = (state: IBookState = initialState, action: BookActions): IBookState => {
  switch (action.type) {
    case BookActionTypes.BOOK_FAILED:
      return {
        ...state,
        loading: false
      };
    case BookActionTypes.BOOK_LOADING:
      return {
        ...state,
        loading: true
      };
    case BookActionTypes.BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    default:
      return state
  };
};

export default bookReducer;