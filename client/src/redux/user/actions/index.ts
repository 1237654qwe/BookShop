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
} from '../../../api/user';

import {
  UserActions,
  UserActionTypes,
} from '../types';

export const loadUser = (id: number) => async (dispatch: Dispatch<UserActions>) => {
  try {
    dispatch({
      type: UserActionTypes.USER_LOADING,
    });

    const data = await getOneUserRequest(id);
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
  id: number,
) => async () => {
  try {
    const body = {
      name,
      email,
      dob: dob.substring(0, 10),
    };

    await updateUserRequest(body, id);
  } catch (e: any) {
    userErrorHendler(e);
  }
};

export const updateUserPass = (password: string, id: number) => async () => {
  try {
    const body = {
      password,
    };

    await updateUserPassworRequest(body, id);
  } catch (e: any) {
    userErrorHendler(e);
  }
};

export const updateAvatar = (
  avatarUrl: any,
  id: number,
) => async (dispatch: Dispatch<UserActions>) => {
  try {
    const formData = new FormData();
    formData.append('avatar', avatarUrl);

    const data = await uploadAvatarRequest(formData, id);
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
