/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { api } from './axios';

export const signInLink = '/sign-in';
export const signUpLink = '/sign-up';

export const signInRequest = async (
  body: {
    email: string,
    password: string
  },
) => {
  const response = await api.post(
    `${signInLink}`,
    body,
  );
  return response;
};

export const signUpRequest = async (
  body: {
    name: string,
    email: string,
    password: string,
    dob: string
  },
) => {
  const response = await api.post(
    `${signUpLink}`,
    body,
  );
  return response;
};
