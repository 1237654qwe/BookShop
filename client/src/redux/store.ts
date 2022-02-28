/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';

const rootedReducer = rootReducer();

const configureStore = (initialState = {}) => import('redux-devtools-extension').then(({ composeWithDevTools }) => {
  const store = createStore(
    rootedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk)),
  );

  return store;
});

type rootReducerType = typeof rootedReducer;
export type AppStateType = ReturnType<rootReducerType>;

export default configureStore;
