/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { api } from './axios';
import history from '../history';

const getOneUserLink = '/user/';
const updateUserLink = '/user/';
const updateUserPasswordLink = '/update-password/';
const uploadAvatarLink = '/upload/';

export const getOneUserRequest = async (id: number) => {
  const response = await api.get(`${getOneUserLink}${id}`);
  return response;
};

export const updateUserRequest = async (
  body: {
    name: string,
    email: string,
    dob: string,
  },
  id: number,
) => {
  const response = await api.put(
    `${updateUserLink}${id}`,
    body,
  );
  return response;
};

export const updateUserPassworRequest = async (
  body: {
    password: string
  },
  id: number,
) => {
  const response = await api.put(
    `${updateUserPasswordLink}${id}`,
    body,
  );
  return response;
};

export const uploadAvatarRequest = async (
  formData: any,
  id: number,
) => {
  const response = await api.post(
    `${uploadAvatarLink}${id}`,
    formData,

  );
  return response;
};

export const userErrorHendler = async (e: any) => {
  if (e.response.status === 403) {
    localStorage.removeItem('token');
    history.push('/sign-in');
  }
};
