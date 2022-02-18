import { Dispatch } from "redux";
import axios from "axios";

import {
  UserActions,
  UserActionTypes,
} from "../types";

export const loadUser = () => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({
        type: UserActionTypes.USER_LOADING
      });

      const token = localStorage.getItem('token')

      const data = await axios({
        method: 'get',
        url: 'http://localhost:3001/api/user',
        headers: { Authorization: `Bearer ${token}` }
      });

      dispatch({
        type: UserActionTypes.USER_SUCCESS,
        payload: data.data
      });

    } catch (e) {
      dispatch({
        type: UserActionTypes.USER_FAIL,
        payload: "somthing wrong"
      });
    };
  };
};

export const updateUser = (name: string, email: string, dob: string) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      const body = {
        name,
        email,
        dob,
      };

      const token = localStorage.getItem('token')

      await axios({
        method: 'put',
        url: 'http://localhost:3001/api/user',
        data: body,
        headers: { Authorization: `Bearer ${token}` }
      });

    } catch (e) {
      console.log(e);
    }
  }
}

export const updateUserPass = (pass: string) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      const body = {
        pass,
      };

      const token = localStorage.getItem('token');

      await axios({
        method: 'put',
        url: 'http://localhost:3001/api/updatePass',
        data: body,
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (e) {
      console.log(e);
    };
  };
};

export const updateAvatar = (avatarUrl: any) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
     
      const token = localStorage.getItem('token');

      const formData = new FormData();
      formData.append('avatar', avatarUrl);

      await axios({
        method: 'post',
        url: 'http://localhost:3001/api/upload',
        data: formData,
        headers: { Authorization: `Bearer ${token}` }
      });

    } catch (e) {
      console.log(e);
    };
  };
};

export const changeUserInput = (name: string, value: string) => {
  return {
    type: UserActionTypes.CHANGE_USER_INPUT,
    payload: { name: name, value: value }
  };
};