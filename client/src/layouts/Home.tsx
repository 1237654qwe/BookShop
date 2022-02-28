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
} from '@mui/material';
import MuiInput from '@mui/material/Input';
import { styled } from '@mui/material/styles';
import {
  HomeContainer,
  HomeContent,
  HomeFilter,
  HomeBooks,
  PaginationContainer,
  CardBox,
} from '../style/Styled';

import {
  loadBooks,
  loadFilters,
} from '../redux/books/actions';
import { AppStateType } from '../redux/store';

const Input = styled(MuiInput)`
  width: 42px;
`;

const Home: React.FC<Props> = ({
  books = [], count, filters, booksLoad, filtersLoad,
}) => {
  const [selectedPage, setSelectedPage] = React.useState<number>(1);
  const [author, setAuthor] = React.useState<string>('');
  const [genre, setGenre] = React.useState<string[]>([]);
  const [price, setPrice] = React.useState<number[]>([0, 5000]);

  const countPage = Math.ceil(count / 9);
  const navigate = useNavigate();

  useEffect(() => {
    filtersLoad();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      booksLoad(selectedPage, 9, author, genre, price);
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
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="400"
                    image={`http://localhost:3001/static/${item.coverUrl}`}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.title}
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
    },
  } = state;
  return {
    books, page, limit, count, filters,
  };
};

const mapDispatchToProps = {
  booksLoad: loadBooks,
  filtersLoad: loadFilters,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

interface OwnProps { }

type Props = StateProps & DispatchProps & OwnProps;

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
