import { combineReducers } from "redux";
import userReducer from "./user/reducers/index";
import booksReducer from "./books/reducers/index";
import authReducer from "./auth/reducers/index";

export default () => combineReducers({
  userReducer: userReducer,
  booksReducer: booksReducer,
  authReducer: authReducer,
});