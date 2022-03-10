/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import axios from 'axios';

import history from '../history';

export const baseUrl = 'http://localhost:3001/api';
export const baseUrlforBook = 'http://localhost:3001/api/book/';

export const signInLink = '/sign-in';
export const signUpLink = '/sign-up';

export const getBooksLink = '/books';
export const getBookFiltersLink = '/book-filters';
export const getOneBooksLink = '/book/';
export const getCommentsLink = '/comments';
export const createCommentLink = '/new-comment';
export const updateRatingLink = '/update-rating';
export const getUserRatingLink = '/user-rating';

export const getOneUserLink = '/user';
export const updateUserLink = '/user';
export const updateUserPasswordLink = '/update-password';
export const uploadAvatarLink = '/upload';

export const signInRequest = async (body: {email: string, password: string}) => {
  const data = await axios({
    method: 'post',
    url: `${baseUrl}${signInLink}`,
    data: body,
  });
  return data;
};

export const signUpRequest = async (body: {
  name: string,
  email: string,
  password: string,
  dob: string
}) => {
  const data = await axios({
    method: 'post',
    url: `${baseUrl}${signUpLink}`,
    data: body,
  });
  return data;
};

export const getBooksRequest = async (
  page: number,
  limit: number,
  author: string,
  genre: string[],
  price: number[],
) => {
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
  return data;
};

export const getBookFiltersRequest = async () => {
  const data = await axios({
    method: 'get',
    url: `${baseUrl}${getBookFiltersLink}`,
  });
  return data;
};

export const getOneBooksRequest = async (id: number) => {
  const data = await axios({
    method: 'get',
    url: `${baseUrl}${getOneBooksLink}${id}`,
  });
  return data;
};

export const updateRatingRequest = async (
  body: {rating: number | null},
  bookId: number,
  token: string | null,
) => {
  await axios({
    method: 'post',
    url: `${baseUrlforBook}${bookId}${updateRatingLink}`,
    data: body,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getCommentsRequest = async (bookId: number) => {
  const data = await axios({
    method: 'get',
    url: `${baseUrlforBook}${bookId}${getCommentsLink}`,
  });
  return data;
};

export const createCommentRequest = async (
  body: {
    bookId: number,
    text: string,
    parentId: number | null,
  },
  bookId: number,
  token: string | null,
) => {
  await axios({
    method: 'post',
    url: `${baseUrlforBook}${bookId}${createCommentLink}`,
    data: body,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getOneUserRequest = async (token: string | null) => {
  const data = await axios({
    method: 'get',
    url: `${baseUrl}${getOneUserLink}`,
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const updateUserRequest = async (
  body: {
    name: string,
    email: string,
    dob: string,
  },
  token: string | null,
) => {
  await axios({
    method: 'put',
    url: `${baseUrl}${updateUserLink}`,
    data: body,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateUserPassworRequest = async (
  body: {
    password: string
  },
  token: string | null,
) => {
  await axios({
    method: 'put',
    url: `${baseUrl}${updateUserPasswordLink}`,
    data: body,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const uploadAvatarRequest = async (
  formData: any,
  token: string | null,
) => {
  const data = await axios({
    method: 'post',
    url: `${baseUrl}${uploadAvatarLink}`,
    data: formData,
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const getUserRatingRequest = async (bookId: number) => {
  const token = localStorage.getItem('token');
  const data = await axios({
    method: 'get',
    url: `${baseUrlforBook}${bookId}${getUserRatingLink}`,
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const userErrorHendler = async (e: any) => {
  if (e.response.status === 403) {
    localStorage.removeItem('token');
    history.push('/sign-in');
  }
};
