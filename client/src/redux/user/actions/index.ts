/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Dispatch } from 'redux';
import {
  getOneUserRequest,
  updateUserRequest,
  uploadAvatarRequest,
  updateUserPassworRequest,
  userErrorHendler,
} from '../../../api/axios';

import {
  UserActions,
  UserActionTypes,
} from '../types';

export const loadUser = () => async (dispatch: Dispatch<UserActions>) => {
  try {
    dispatch({
      type: UserActionTypes.USER_LOADING,
    });

    const token = localStorage.getItem('token');
    const data = await getOneUserRequest(token);
    dispatch({
      type: UserActionTypes.USER_SUCCESS,
      payload: data.data,
    });
  } catch (e: any) {
    userErrorHendler(e);
  }
};

export const updateUser = (
  name: string,
  email: string,
  dob: string,
) => async () => {
  try {
    const body = {
      name,
      email,
      dob: dob.substring(0, 10),
    };

    const token = localStorage.getItem('token');
    await updateUserRequest(body, token);
  } catch (e: any) {
    userErrorHendler(e);
  }
};

export const updateUserPass = (password: string) => async () => {
  try {
    const body = {
      password,
    };

    const token = localStorage.getItem('token');

    await updateUserPassworRequest(body, token);
  } catch (e: any) {
    userErrorHendler(e);
  }
};

export const updateAvatar = (avatarUrl: any) => async (dispatch: Dispatch<UserActions>) => {
  try {
    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('avatar', avatarUrl);

    const data = await uploadAvatarRequest(formData, token);
    dispatch({
      type: UserActionTypes.UPDATE_AVATAR,
      payload: data.data,
    });
  } catch (e: any) {
    userErrorHendler(e);
  }
};

export const changeUserInput = (name: string, value: string) => ({
  type: UserActionTypes.CHANGE_USER_INPUT,
  payload: { name, value },
});

export const clearUserReducer = () => ({
  type: UserActionTypes.СLEAR_USER_REDUCER,
});
