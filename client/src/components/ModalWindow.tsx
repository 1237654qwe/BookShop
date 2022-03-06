/* eslint-disable no-use-before-define */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { connect } from 'react-redux';

import {
  CardMedia,
  Typography,
  Box,
  Tab,
  Rating,
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {
  Tabs,
  ModalContent,
  ModalImg,
  ModalTab,
} from '../style/Styled';
import { style } from '../style/Material-ui';

import {
  addRating,
} from '../redux/books/actions';
import { AppStateType } from '../redux/store';
import CommentForm from '../components/CommentForm';

const ModalWindow: React.FC<Props> = ({
  book,
  ratingBook,
}) => {
  const [tab, setTab] = React.useState('1');
  const [rating, setRating] = React.useState<number | null>(0);

  const handleTabListChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <div>
      <Box sx={style}>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={tab}>
            <Tabs>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleTabListChange} aria-label="lab API tabs example">
                  <Tab label="Книга" value="1" />
                  <Tab label="Описание" value="2" />
                  <Tab label="Комментарии" value="3" />
                </TabList>
              </Box>
            </Tabs>
            <ModalContent>
              <ModalImg>
                <CardMedia
                  component="img"
                  height="400"
                  image={`http://localhost:3001/static/${book.coverUrl}`}
                  alt="green iguana"
                />
              </ModalImg>
              <ModalTab>
                <TabPanel value="1">
                  <Typography variant="body2" color="text">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      {book.title}
                    </Typography>
                    <p>{book.author},</p>
                    <p>{book.genre}</p>
                  </Typography>
                </TabPanel>
                <TabPanel value="2">
                  <Typography variant="body2" color="text">
                    {book.description}
                  </Typography>
                  <Typography component="legend">Поставте оценку книге</Typography>
                  <Rating
                    name="simple-controlled"
                    value={rating}
                    onChange={(event, newValue) => {
                      setRating(newValue);
                      ratingBook(book.id, newValue);
                    }}
                  />
                </TabPanel>
                <TabPanel value="3">
                  <Typography variant="body2" color="text">
                    <CommentForm />
                  </Typography>
                </TabPanel>
              </ModalTab>
            </ModalContent>
          </TabContext>
        </Box>
      </Box>
    </div>
  );
};

const mapStateToProps = (state: AppStateType) => {
  const { booksReducer: { book } } = state;
  return { book };
};

const mapDispatchToProps = {
  ratingBook: addRating,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

interface OwnProps { }

type Props = StateProps & DispatchProps & OwnProps;

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(ModalWindow);
