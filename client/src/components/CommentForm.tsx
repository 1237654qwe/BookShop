/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import {
  TextField,
  Button,
  Typography,
  Table,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material';

import {
  loadComments,
  changeCommentInput,
  addComments,
} from '../redux/comments/actions';
import { AppStateType } from '../redux/store';
import { Comments, CommentsForm, ChildComments } from '../style/Styled';

const CommentForm: React.FC<Props> = ({
  comments,
  comment,
  book,
  commentsLoad,
  commentInputChange,
  commentAdd,
}) => {
  const [parentId, setParentId] = useState<number | null>(null);
  useEffect(() => {
    commentsLoad(book.id);
  }, [book]);

  const onSubmit = (e: any) => {
    commentAdd(book.id, comment, parentId);
    commentInputChange('');
    setParentId(null);
    e.preventDefault();
  };

  return (
    <div>
      <Paper sx={{ width: '450px' }}>
        <TableContainer sx={{ maxHeight: 260 }}>
          <Table >
            <TableBody>
              <TableRow>
                {comments.map((item) => (
                  <div>
                    <Comments>
                    <TableCell
                      key={item.id}
                    >
                      <Typography variant="body2" color="text">
                        <Typography id="modal-modal-title" variant="h6" component="h6">
                          {item.user.name}
                        </Typography>
                        <p>{item.text}</p>
                        {parentId === item.id
                          ? <form onSubmit={onSubmit}>
                            <CommentsForm>
                              <TextField
                                label="Прокомментируйте"
                                sx={{ width: '450px' }}
                                multiline
                                rows={2}
                                value={comment}
                                onChange={(e: { target: { value: string } }) => {
                                  commentInputChange(e.target.value);
                                }}
                              />
                              <Button size="small" color="primary" type="submit">
                                Прокомментировать
                              </Button>
                            </CommentsForm>
                          </form> : <Button size="small" color="primary" onClick={
                            () => { setParentId(item.id); }
                          }>
                            Ответить
                          </Button>
                        }
                      </Typography>
                    </TableCell>
                  </Comments>
                  {item.comments.map((childComment) => (
                    <ChildComments>
                      <TableCell
                        key={childComment.id}
                      >
                        <Typography variant="body2" color="text">
                          <Typography id="modal-modal-title" variant="h6" component="h6">
                            {childComment.user.name}
                          </Typography>
                          <p>{childComment.text}</p>
                        </Typography>
                      </TableCell>
                    </ChildComments>
                  ))}
                  </div>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
        <form onSubmit={onSubmit}>
        <CommentsForm>
          <TextField
            label="Прокомментируйте"
            sx={{ width: '450px' }}
            multiline
            rows={2}
            value={comment}
            onChange={(e: { target: { value: string } }) => {
              commentInputChange(e.target.value);
            }}
          />
          <Button size="small" color="primary" type="submit">
            Прокомментировать
          </Button>
          </CommentsForm>
        </form>
    </div>
  );
};

const mapStateToProps = (state: AppStateType) => {
  const {
    commentsReducer: {
      comments,
      comment,
    },
    booksReducer: {
      book,
    },
  } = state;
  return {
    comments,
    comment,
    book,
  };
};

const mapDispatchToProps = {
  commentsLoad: loadComments,
  commentInputChange: changeCommentInput,
  commentAdd: addComments,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

interface OwnProps { }

type Props = StateProps & DispatchProps & OwnProps;

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(CommentForm);
