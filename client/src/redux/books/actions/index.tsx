/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Dispatch } from 'redux';
import axios from 'axios';
import {
  baseUrl, baseUrlforBook, getBooksLink, getBookFiltersLink, getOneBooksLink, updateRatingLink,
} from '../../../api/links';

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

export const loadBook = (id: number) => async (dispatch: Dispatch<BooksActions>) => {
  try {
    dispatch({
      type: BooksActionTypes.ONE_BOOK_LOADING,
    });

    const data = await axios({
      method: 'get',
      url: `${baseUrl}${getOneBooksLink}${id}`,
    });

    dispatch({
      type: BooksActionTypes.ONE_BOOK_SUCCESS,
      payload: {
        book: data.data,
      },
    });
  } catch (e) {
    dispatch({
      type: BooksActionTypes.ONE_BOOK_FAILED,
      payload: 'somthing wrong',
    });
  }
};

export const addRating = (
  bookId: number,
  rating: number | null,
) => async () => {
  try {
    const body = {
      rating,
    };

    const token = localStorage.getItem('token');

    await axios({
      method: 'post',
      url: `${baseUrlforBook}${bookId}${updateRatingLink}`,
      data: body,
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (e) {
    console.log(e);
  }
};
