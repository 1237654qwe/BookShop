/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { api } from './axios';

const getBooksLink = '/books';
const getBookFiltersLink = '/book-filters';
const getOneBooksLink = '/book/';
const getCommentsLink = '/comments';
const createCommentLink = '/new-comment';
const updateRatingLink = '/update-rating';
const getUserRatingLink = '/user-rating';

export const getBooksRequest = async (
  page: number,
  limit: number,
  author: string,
  genre: string[],
  price: number[],
) => {
  const response = await api.get(`${getBooksLink}`, {
    params: {
      page,
      limit,
      author,
      genre,
      price,
    },
  });
  return response;
};

export const getBookFiltersRequest = async () => {
  const response = await api.get(`${getBookFiltersLink}`);
  return response;
};

export const getOneBooksRequest = async (bookId: number) => {
  const response = await api.get(`${getOneBooksLink}${bookId}`);
  return response;
};

export const updateRatingRequest = async (
  body: { rating: number | null },
  bookId: number,
) => {
  const response = await api.post(
    `/book/${bookId}${updateRatingLink}`,
    body,
  );
  return response;
};

export const getCommentsRequest = async (bookId: number) => {
  const response = await api.get(`/book/${bookId}${getCommentsLink}`);
  return response;
};

export const createCommentRequest = async (
  body: {
    bookId: number,
    text: string,
    parentId: number | null,
  },
  bookId: number,
) => {
  const response = await api.post(
    `/book/${bookId}${createCommentLink}`,
    body,
  );
  return response;
};

export const getUserRatingRequest = async (bookId: number) => {
  const response = await api.get(`/book/${bookId}${getUserRatingLink}`);
  return response;
};
