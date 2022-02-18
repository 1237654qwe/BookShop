import { Dispatch } from "redux";
import axios from "axios";

import {
  BookActions,
  BookActionTypes,
} from "../types";

export const loadBooks = (page: 1, limit = 10) => {
  return async (dispatch: Dispatch<BookActions>) => {
    try {
      dispatch({
        type: BookActionTypes.BOOK_LOADING
      });

      const res = await axios.get(`http://localhost:3001/книжки, когда они будут`, {
        params: { _page: page, _limit: limit }
      });

      dispatch({
        type: BookActionTypes.BOOK_SUCCESS,
        payload: res.data
      });

    } catch (e) {
      dispatch({
        type: BookActionTypes.BOOK_FAILED,
        payload: "somthing wrong"
      });
    };
  };
};