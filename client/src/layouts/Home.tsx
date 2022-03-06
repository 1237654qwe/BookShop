/* eslint-disable no-use-before-define */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  Card,
  CardContent,
  CardMedia,
  Button,
  CardActionArea,
  CardActions,
  Pagination,
  Typography,
  Box,
  Slider,
  Checkbox,
  Modal,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

import {
  HomeContainer,
  HomeContent,
  HomeFilter,
  HomeBooks,
  PaginationContainer,
  CardBox,
  TitleArea,
  StarArea,
} from '../style/Styled';
import { Input } from '../style/Material-ui';

import {
  loadBooks,
  loadFilters,
  loadBook,
  addRating,
} from '../redux/books/actions';
import { AppStateType } from '../redux/store';
import ModalWindow from '../components/ModalWindow';

const Home: React.FC<Props> = ({
  books = [],
  count,
  filters,
  limit,
  page,
  booksLoad,
  filtersLoad,
  bookLoad,
}) => {
  const [selectedPage, setSelectedPage] = React.useState<number>(page);
  const [author, setAuthor] = React.useState<string>('');
  const [genre, setGenre] = React.useState<string[]>([]);
  const [price, setPrice] = React.useState<number[]>([0, 5000]);
  const [open, setOpen] = React.useState(false);

  const countPage = Math.ceil(count / limit);
  const navigate = useNavigate();

  useEffect(() => {
    filtersLoad();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      booksLoad(selectedPage, limit, author, genre, price);
      if (author || genre) {
        navigate({
          pathname: '/',
          search: `?page=${selectedPage}&author=${author}&genre[]=${genre}&price[]=${price[0]}&price[]=${price[1]}`,
        });
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [selectedPage, author, genre, price, navigate]);

  const handleChangeSlider = (e: Event, newPrice: number | number[]) => {
    setPrice(newPrice as number[]);
  };

  const handleInputChangeStartPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice([Number(event.target.value), price[1]]);
  };

  const handleInputChangeLastPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice([price[0], Number(event.target.value)]);
  };

  const handleChangePage = (e: React.ChangeEvent<unknown>, value: number) => {
    setSelectedPage(value);
  };

  const handleChangeAuthor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setAuthor(e.target.value);
    } else {
      setAuthor('');
    }
  };

  const handleChangeGenre = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setGenre([...genre, e.target.value]);
    } else {
      setGenre(genre.filter((item) => item !== e.target.value));
    }
  };

  const handleOpen = (id: number) => {
    setOpen(true);
    bookLoad(id);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <HomeContainer>
      <HomeContent>
        <HomeFilter>
          <div>
            <Typography variant="h6">Автор</Typography>
          </div>
          {filters.author.map((item) => (
            <div>
            <Checkbox
              name="author"
              value={item}
              onChange={handleChangeAuthor}
              checked={author === `${item}`} />
            <label>{item}</label>
          </div>
          ))}
          <div>
            <Typography variant="h6">Жанр</Typography>
          </div>
          {filters.genre.map((item) => (
            <div>
            <Checkbox
              name="gener"
              value={item}
              onChange={handleChangeGenre} />
            <label>{item}</label>
          </div>
          ))}
          <div>
            <Typography variant="h6">Цена</Typography>
          </div>
          <Box sx={{ width: 300 }}>
            <p>От <Input value={price[0]} onChange={handleInputChangeStartPrice}/>
            до <Input value={price[1]} onChange={handleInputChangeLastPrice}/></p>
            <Slider
              getAriaLabel={() => 'Temperature range'}
              value={price}
              onChange={handleChangeSlider}
              valueLabelDisplay="auto"
              max={5000}
            />
          </Box>
        </HomeFilter>
        <HomeBooks>
          {books.map((item) => (
            <CardBox>
              <Card key={item.id}>
                <CardActionArea onClick={() => {
                  handleOpen(item.id);
                }}>
                  <CardMedia
                    component="img"
                    height="400"
                    image={`http://localhost:3001/static/${item.coverUrl}`}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      <TitleArea>
                        {item.title}
                        <StarArea>
                          {item.rating === null ? 0 : item.rating}<StarIcon />
                        </StarArea>
                      </TitleArea>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.author}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Купить
                  </Button>
                </CardActions>
              </Card>
            </CardBox>
          ))}
          <div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <ModalWindow />
            </Modal>
          </div>
        </HomeBooks>
      </HomeContent>
      <PaginationContainer>
        <Pagination
          count={countPage}
          page={selectedPage}
          onChange={handleChangePage}
          color="primary"
        />
      </PaginationContainer>
    </HomeContainer>
  );
};

const mapStateToProps = (state: AppStateType) => {
  const {
    booksReducer: {
      books,
      page,
      limit,
      count,
      filters,
      book,
    },
  } = state;
  return {
    books,
    page,
    limit,
    count,
    filters,
    book,
  };
};

const mapDispatchToProps = {
  booksLoad: loadBooks,
  filtersLoad: loadFilters,
  bookLoad: loadBook,
  ratingBook: addRating,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

interface OwnProps { }

type Props = StateProps & DispatchProps & OwnProps;

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
