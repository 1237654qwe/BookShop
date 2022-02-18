import {
  AuthInfo,
  AuthActions,
  AuthActionTypes,
} from "../types";

const initialState: AuthInfo = {
  email: "",
  pass: "",
  dob: "",
  name: "",
};

const authReducer = (state: AuthInfo = initialState, action: AuthActions): AuthInfo => {
  switch (action.type) {
    case AuthActionTypes.CHANGE_INPUT:
      return {
        ...state,
        [action.payload.name]: action.payload.value
      };
    default:
      return state
  };
};

export default authReducer;