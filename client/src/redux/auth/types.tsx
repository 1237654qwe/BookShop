/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
export type AuthInfo = {
  email: string,
  password: string
  dob: string
  name: string
};

export enum AuthActionTypes {
  SIGNUP_USER = 'SIGNUP_USER',
  SIGNIN_USER = 'SIGNIN_USER',
  CHANGE_INPUT = 'CHANGE_INPUT'
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

export type AuthActions = ISignInUser | ISignUpUser | IChangeInput;
