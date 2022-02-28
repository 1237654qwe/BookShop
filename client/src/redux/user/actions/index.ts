/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Dispatch } from 'redux';
import axios from 'axios';
import {
  baseUrl,
  getOneUserLink,
  updateUserLink,
  uploadAvatarLink,
  updateUserPasswordLink,
} from '../../../api/links';

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

    const data = await axios({
      method: 'get',
      url: `${baseUrl} + ${getOneUserLink}`,
      headers: { Authorization: `Bearer ${token}` },
    });

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

    await axios({
      method: 'put',
      url: `${baseUrl} + ${updateUserLink}`,
      data: body,
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (e) {
    console.log(e);
  }
};

export const updateUserPass = (password: string) => async () => {
  try {
    const body = {
      password,
    };

    const token = localStorage.getItem('token');

    await axios({
      method: 'put',
      url: `${baseUrl} + ${uploadAvatarLink}`,
      data: body,
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (e) {
    console.log(e);
  }
};

export const updateAvatar = (avatarUrl: any) => async () => {
  try {
    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('avatar', avatarUrl);

    await axios({
      method: 'post',
      url: `${baseUrl} + ${updateUserPasswordLink}`,
      data: formData,
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (e) {
    console.log(e);
  }
};

export const changeUserInput = (name: string, value: string) => ({
  type: UserActionTypes.CHANGE_USER_INPUT,
  payload: { name, value },
});
