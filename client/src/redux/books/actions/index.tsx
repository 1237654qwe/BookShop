import { Dispatch } from "redux"
import axios from "axios"

import {
  BooksActions,
  BooksActionTypes,
} from "../types"

export const loadBooks = (page: 1, limit = 10) => {
  return async (dispatch: Dispatch<BooksActions>) => {
    try {
      dispatch({
        type: BooksActionTypes.BOOKS_LOADING
      });

      const data = await axios.get(`http://localhost:3001/книжки, когда они будут`, {
        params: { _page: page, _limit: limit }
      });

      dispatch({
        type: BooksActionTypes.BOOKS_SUCCESS,
        payload: data.data
      });

    } catch (e) {
      dispatch({
        type: BooksActionTypes.BOOKS_FAILED,
        payload: "somthing wrong"
      });
    };
  };
};

export const setBooksPage = (page: number): BooksActions => {
  return {
    type: BooksActionTypes.SET_BOOKS_PAGE,
    payload: page
  };
};