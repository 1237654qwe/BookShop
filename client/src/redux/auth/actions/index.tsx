import { Dispatch } from "redux";
import axios from "axios";

import {
  AuthActions,
  AuthActionTypes,
} from "../types";

export const signUp = (name: string, email: string, pass: string, dob: string) => {
  return async (dispatch: Dispatch<AuthActions>) => {
    try {
      const body = {
        name,
        email,
        pass,
        dob
      };

      const data = await axios({
        method: 'post',
        url: 'http://localhost:3001/api/signUp',
        data: body
      });

      localStorage.setItem('token', data.data.token)
    } catch (e) {
      console.log(e)
    };
  };
};

export const signIn = (email: string, pass: string) => {
  return async (dispatch: Dispatch<AuthActions>) => {
    try {
      const body = {
        email,
        pass,
      };

      const data = await axios({
        method: 'post',
        url: 'http://localhost:3001/api/signIn',
        data: body
      });

      localStorage.setItem('token', data.data.token)
    } catch (e) {
      console.log(e)
    };
  };
};

export const changeInput = (name: string, value: string) => {
  return {
    type: AuthActionTypes.CHANGE_INPUT,
    payload: { name: name, value: value }
  };
};