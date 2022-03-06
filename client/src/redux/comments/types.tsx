/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
export type CommentInfo = {
  id: number,
  userId: number,
  parantId: number,
  bookId: number,
  text: string,
  user: {
    id: number,
    name: number,
  }
  comments: CommentInfo[],
};

export type CommentsPayload = {
  comments: CommentInfo[],
  comment: string
};

export enum CommentActionTypes {
  COMMENTS_LOADING = 'COMMENTS_LOADING',
  COMMENTS_FAILED = 'COMMENTS_FAILED',
  COMMENTS_SUCCESS = 'COMMENTS_SUCCESS',
  ADD_COMMENT = 'ADD_COMMENT',
  CHANGE_COMMENT_INPUT = 'CHANGE_COMMENT_INPUT',
}

interface ICommentsLoading {
  type: CommentActionTypes.COMMENTS_LOADING,
}

interface ICommentsFailed {
  type: CommentActionTypes.COMMENTS_FAILED,
  payload: string
}

interface ICommentsSuccess {
  type: CommentActionTypes.COMMENTS_SUCCESS,
  payload: CommentsPayload
}

interface IAddComment {
  type: CommentActionTypes.ADD_COMMENT,
}

interface IChangeCommentInput {
  type: CommentActionTypes.CHANGE_COMMENT_INPUT,
  payload: {value: string}
}

export type CommentActions =
ICommentsLoading |
ICommentsFailed |
ICommentsSuccess |
IAddComment|
IChangeCommentInput;
