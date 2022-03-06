/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import axios from 'axios';
import { baseUrl, signInLink, signUpLink } from '../../../api/links';

import {
  AuthActionTypes,
} from '../types';

export const signUp = (
  name: string,
  email: string,
  password: string,
  dob: string,
) => async () => {
  try {
    const body = {
      name,
      email,
      password,
      dob,
    };

    const data = await axios({
      method: 'post',
      url: `${baseUrl}${signUpLink}`,
      data: body,
    });

    localStorage.setItem('token', data.data.token);
  } catch (e) {
    console.log(e);
  }
};

export const signIn = (
  email: string,
  password: string,
) => async () => {
  try {
    const body = {
      email,
      password,
    };

    const data = await axios({
      method: 'post',
      url: `${baseUrl}${signInLink}`,
      data: body,
    });

    localStorage.setItem('token', data.data.token);
  } catch (e) {
    console.log(e);
  }
};

export const changeInput = (name: string, value: string) => ({
  type: AuthActionTypes.CHANGE_INPUT,
  payload: { name, value },
});
