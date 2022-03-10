/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
export type UserInfo = {
  id: number
  name: string
  email: string
  password: string
  dob: string
  avatarUrl: string
};

export enum UserActionTypes {
  UPDATE_USER = 'UPDATE_USER',
  UPDATE_USER_PASS = 'UPDATE_USER_PASS',
  UPDATE_AVATAR = 'UPDATE_AVATAR',
  USER_LOADING = 'USER_LOADING',
  USER_FAIL = 'USER_FAIL',
  USER_SUCCESS = 'USER_SUCCESS',
  CHANGE_USER_INPUT = 'CHANGE_USER_INPUT',
  СLEAR_USER_REDUCER = 'СLEAR_USER_REDUCER',
}

interface IUpdateUser {
  type: UserActionTypes.UPDATE_USER
}

interface IUpdateUserPass {
  type: UserActionTypes.UPDATE_USER_PASS
}

interface IUpdateAvatar {
  type: UserActionTypes.UPDATE_AVATAR
  payload: string
}

interface IUserLoading {
  type: UserActionTypes.USER_LOADING
}

interface IUserFail {
  type: UserActionTypes.USER_FAIL,
  payload: string
}

interface IUserSuccess {
  type: UserActionTypes.USER_SUCCESS
  payload: UserInfo
}

interface IChangeUserInput {
  type: UserActionTypes.CHANGE_USER_INPUT,
  payload: { name: string, value: string }
}

interface IClearUserReducer {
  type: UserActionTypes.СLEAR_USER_REDUCER
}

export type UserActions =
  IUpdateUser |
  IUpdateUserPass |
  IUpdateAvatar |
  IUserLoading |
  IUserFail |
  IUserSuccess |
  IChangeUserInput |
  IClearUserReducer
