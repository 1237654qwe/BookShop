/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
export type AuthInfo = {
  email: string
  password: string
  dob: string
  name: string
  signInError: string
  signUpError: string
};

export enum AuthActionTypes {
  SIGNUP_USER = 'SIGNUP_USER',
  SIGNIN_USER = 'SIGNIN_USER',
  CHANGE_INPUT = 'CHANGE_INPUT',
  SIGNIN_FAIL = 'SIGNIN_FAIL',
  SIGNUP_FAIL = 'SIGNUP_FAIL'
}

interface ISignInUser {
  type: AuthActionTypes.SIGNUP_USER,
  payload: { name: string, value: string }
}

interface ISignUpUser {
  type: AuthActionTypes.SIGNIN_USER,
  payload: { name: string, value: string }
}

interface IChangeInput {
  type: AuthActionTypes.CHANGE_INPUT,
  payload: { name: string, value: string }
}

interface ISignInFail {
  type: AuthActionTypes.SIGNIN_FAIL,
  payload: string
}

interface ISignUpFail {
  type: AuthActionTypes.SIGNUP_FAIL,
  payload: string
}

export type AuthActions =
  ISignInUser |
  ISignUpUser |
  IChangeInput |
  ISignInFail |
  ISignUpFail;
