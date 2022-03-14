/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Dispatch } from 'redux';
import { signInRequest, signUpRequest } from '../../../api/auth';

import {
  AuthActions,
  AuthActionTypes,
} from '../types';

export const signUp = (
  name: string,
  email: string,
  password: string,
  dob: string,
  cb: () => void,
) => async (dispatch: Dispatch<AuthActions>) => {
  try {
    const body = {
      name,
      email,
      password,
      dob,
    };

    const data = await signUpRequest(body);
    localStorage.setItem('token', data.data.token);
    cb();
  } catch (e: any) {
    dispatch({
      type: AuthActionTypes.SIGNUP_FAIL,
      payload: e.response.data?.message,
    });
  }
};

export const signIn = (
  email: string,
  password: string,
  cb: () => void,
) => async (dispatch: Dispatch<AuthActions>) => {
  try {
    const body = {
      email,
      password,
    };

    const data = await signInRequest(body);
    localStorage.setItem('token', data.data.token);
    cb();
  } catch (e: any) {
    dispatch({
      type: AuthActionTypes.SIGNIN_FAIL,
      payload: e.response.data?.message,
    });
  }
};

export const changeInput = (name: string, value: string) => ({
  type: AuthActionTypes.CHANGE_INPUT,
  payload: { name, value },
});
