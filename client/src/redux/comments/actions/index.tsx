/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Dispatch } from 'react-redux';
import { getCommentsRequest, createCommentRequest, userErrorHendler } from '../../../api/axios';

import {
  CommentActions,
  CommentActionTypes,
} from '../types';

export const loadComments = (bookId: number) => async (dispatch: Dispatch<CommentActions>) => {
  try {
    dispatch({
      type: CommentActionTypes.COMMENTS_LOADING,
    });

    const data = await getCommentsRequest(bookId);
    dispatch({
      type: CommentActionTypes.COMMENTS_SUCCESS,
      payload: {
        comments: data.data,
      },
    });
  } catch (e) {
    dispatch({
      type: CommentActionTypes.COMMENTS_FAILED,
      payload: 'somthing wrong',
    });
  }
};

export const addComments = (
  bookId: number,
  text: string,
  parentId: number | null,
) => async (dispatch: Dispatch<CommentActions>) => {
  try {
    const body = {
      bookId,
      parentId,
      text,
    };

    const token = localStorage.getItem('token');
    await createCommentRequest(body, bookId, token);
    loadComments(bookId)(dispatch);
  } catch (e: any) {
    userErrorHendler(e);
  }
};

export const addAnswers = (
  bookId: number,
  text: string,
  parentId: number | null,
) => async (dispatch: Dispatch<CommentActions>) => {
  try {
    const body = {
      bookId,
      parentId,
      text,
    };

    const token = localStorage.getItem('token');
    await createCommentRequest(body, bookId, token);
    loadComments(bookId)(dispatch);
  } catch (e: any) {
    userErrorHendler(e);
  }
};

export const changeCommentInput = (value: string) => ({
  type: CommentActionTypes.CHANGE_COMMENT_INPUT,
  payload: { value },
});

export const changeAnswerInput = (value: string) => ({
  type: CommentActionTypes.CHANGE_ANSWER_INPUT,
  payload: { value },
});
