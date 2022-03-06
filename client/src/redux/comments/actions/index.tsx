/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import axios from 'axios';
import { Dispatch } from 'react-redux';
import { baseUrlforBook, getCommentsLink, createCommentLink } from '../../../api/links';

import {
  CommentActions,
  CommentActionTypes,
} from '../types';

export const loadComments = (bookId: number) => async (dispatch: Dispatch<CommentActions>) => {
  try {
    dispatch({
      type: CommentActionTypes.COMMENTS_LOADING,
    });

    const data = await axios({
      method: 'get',
      url: `${baseUrlforBook}${bookId}${getCommentsLink}`,
    });
    console.log(data.data);
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

    await axios({
      method: 'post',
      url: `${baseUrlforBook}${bookId}${createCommentLink}`,
      data: body,
      headers: { Authorization: `Bearer ${token}` },
    });
    loadComments(bookId)(dispatch);
  } catch (e) {
    console.log(e);
  }
};

export const changeCommentInput = (value: string) => ({
  type: CommentActionTypes.CHANGE_COMMENT_INPUT,
  payload: { value },
});
