/* eslint-disable default-param-last */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import {
  CommentInfo,
  CommentActions,
  CommentActionTypes,
} from '../types';

export interface ICommentState {
  loading: boolean,
  comments: CommentInfo[],
  comment: string
  answer: string
}

const initialState: ICommentState = {
  loading: false,
  comments: [],
  comment: '',
  answer: '',
};

const commentsReducer = (
  state: ICommentState = initialState,
  action: CommentActions,
): ICommentState => {
  switch (action.type) {
    case CommentActionTypes.COMMENTS_FAILED:
      return {
        ...state,
        loading: false,
      };
    case CommentActionTypes.COMMENTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CommentActionTypes.COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: action.payload.comments,
      };
    case CommentActionTypes.CHANGE_COMMENT_INPUT:
      return {
        ...state,
        comment: action.payload.value,
      };
    case CommentActionTypes.CHANGE_ANSWER_INPUT:
      return {
        ...state,
        answer: action.payload.value,
      };
    default:
      return state;
  }
};

export default commentsReducer;
