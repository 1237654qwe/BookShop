/* eslint-disable default-param-last */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import {
  AuthInfo,
  AuthActions,
  AuthActionTypes,
} from '../types';

const initialState: AuthInfo = {
  email: '',
  password: '',
  dob: '',
  name: '',
  signInError: '',
  signUpError: '',
};

const authReducer = (
  state: AuthInfo = initialState,
  action: AuthActions,
): AuthInfo => {
  switch (action.type) {
    case AuthActionTypes.CHANGE_INPUT:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case AuthActionTypes.SIGNIN_FAIL:
      return {
        ...state,
        signInError: action.payload,
      };
    case AuthActionTypes.SIGNUP_FAIL:
      return {
        ...state,
        signUpError: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
