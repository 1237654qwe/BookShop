/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Dispatch } from 'redux';
import {
  getBooksRequest,
  getBookFiltersRequest,
  getOneBooksRequest,
  updateRatingRequest,
  getUserRatingRequest,
  userErrorHendler,
} from '../../../api/axios';

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

    const data = await getBooksRequest(
      page,
      limit,
      author,
      genre,
      price,
    );

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

export const getUserRating = (
  bookId: number,
) => async (dispatch: Dispatch<BooksActions>) => {
  try {
    const data = await getUserRatingRequest(bookId);

    dispatch({
      type: BooksActionTypes.GET_USER_RATING,
      payload: data?.data?.rating || 0,
    });
  } catch (e: any) {
    userErrorHendler(e);
  }
};

export const loadFilters = () => async (dispatch: Dispatch<BooksActions>) => {
  try {
    dispatch({
      type: BooksActionTypes.BOOKS_FILTERS_LOADING,
    });

    const data = await getBookFiltersRequest();

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

    const data = await getOneBooksRequest(id);

    dispatch({
      type: BooksActionTypes.ONE_BOOK_SUCCESS,
      payload: {
        book: data.data,
      },
    });
    const token = localStorage.getItem('token');
    if (token) {
      await getUserRating(id)(dispatch);
    }
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

    updateRatingRequest(body, bookId, token);
  } catch (e: any) {
    userErrorHendler(e);
  }
};
