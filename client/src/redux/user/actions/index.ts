/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Dispatch } from 'redux';
import {
  getOneUserRequest,
  updateUserLinkRequest,
  uploadAvatarRequest,
  updateUserPassworRequest,
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
  } catch (e) {
    dispatch({
      type: UserActionTypes.USER_FAIL,
      payload: 'somthing wrong',
    });
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
      dob,
    };

    const token = localStorage.getItem('token');
    await updateUserLinkRequest(body, token);
  } catch (e: any) {
    if (e.response.status === 403) {
      localStorage.removeItem('token');
    }
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
    if (e.response.status === 403) {
      localStorage.removeItem('token');
    }
  }
};

export const updateAvatar = (avatarUrl: any) => async () => {
  try {
    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('avatar', avatarUrl);

    await uploadAvatarRequest(formData, token);
  } catch (e: any) {
    if (e.response.status === 403) {
      localStorage.removeItem('token');
    }
  }
};

export const changeUserInput = (name: string, value: string) => ({
  type: UserActionTypes.CHANGE_USER_INPUT,
  payload: { name, value },
});
