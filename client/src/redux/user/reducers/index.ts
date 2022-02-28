/* eslint-disable default-param-last */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import {
  UserActions,
  UserInfo,
  UserActionTypes,
} from '../types';

export interface IUserState {
  loading: boolean,
  user: UserInfo
}

const initialState: IUserState = {
  loading: false,
  user: {
    id: 0,
    name: '',
    email: '',
    password: '',
    dob: '',
    avatarUrl: '',
  },
};

const userReducer = (state: IUserState = initialState, action: UserActions): IUserState => {
  switch (action.type) {
    case UserActionTypes.USER_FAIL:
      return {
        ...state,
        loading: false,
      };
    case UserActionTypes.USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case UserActionTypes.USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case UserActionTypes.CHANGE_USER_INPUT:
      return {
        ...state,
        user: {
          ...state.user,
          [action.payload.name]: action.payload.value,
        },
      };
    default:
      return state;
  }
};

export default userReducer;
