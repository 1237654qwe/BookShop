import { Dispatch } from "redux"
import axios from "axios"

import {
  BooksActions,
  BooksActionTypes,
} from "../types"

export const loadBooks = (
  page: number,
  limit: number,
  author: string,
  genre: string[],
  price: number[]
) => {
  return async (dispatch: Dispatch<BooksActions>) => {
    try {
      dispatch({
        type: BooksActionTypes.BOOKS_LOADING
      });

      const data = await axios({
        method: 'get',
        url: 'http://localhost:3001/api/books',
        params: {
          page: page,
          limit: limit,
          author: author,
          genre: genre,
          price: price
        }
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