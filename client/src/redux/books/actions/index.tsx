/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Dispatch } from 'redux';
import axios from 'axios';
import { baseUrl, getBooksLink, getBookFiltersLink } from '../../../api/links';

import {
  BooksActions,
  BooksActionTypes,
} from '../types';

export const loadBooks = (
  page: number,
  limit: number,
  author: string,
  genre: string[],
  price: number[],
) => async (dispatch: Dispatch<BooksActions>) => {
  try {
    dispatch({
      type: BooksActionTypes.BOOKS_LOADING,
    });

    const data = await axios({
      method: 'get',
      url: `${baseUrl}${getBooksLink}`,
      params: {
        page,
        limit,
        author,
        genre,
        price,
      },
    });

    dispatch({
      type: BooksActionTypes.BOOKS_SUCCESS,
      payload: data.data,
    });
  } catch (e) {
    dispatch({
      type: BooksActionTypes.BOOKS_FAILED,
      payload: 'somthing wrong',
    });
  }
};

export const loadFilters = () => async (dispatch: Dispatch<BooksActions>) => {
  try {
    dispatch({
      type: BooksActionTypes.BOOKS_FILTERS_LOADING,
    });

    const data = await axios({
      method: 'get',
      url: `${baseUrl}${getBookFiltersLink}`,
    });

    dispatch({
      type: BooksActionTypes.BOOKS_FILTERS_SUCCESS,
      payload: data.data,
    });
  } catch (e) {
    dispatch({
      type: BooksActionTypes.BOOKS_FILTERS_FAILED,
      payload: 'somthing wrong',
    });
  }
};
