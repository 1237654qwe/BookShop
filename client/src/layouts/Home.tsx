/* eslint-disable no-use-before-define */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';

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
  Menu,
  MenuItem,
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
  FilterButtons,
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedPage, setSelectedPage] = React.useState<number>(page);
  const [author, setAuthor] = React.useState<string>('');
  const [genre, setGenre] = React.useState<string[]>([]);
  const [price, setPrice] = React.useState<string[]>(['0', '5000']);
  const [openModal, setOpenModal] = React.useState(false);
  const [anchorElAuthor, setAnchorElAuthor] = React.useState<null | HTMLElement>(null);
  const [anchorElGenre, setAnchorElGenre] = React.useState<null | HTMLElement>(null);
  const [anchorElPrice, setAnchorElPrice] = React.useState<null | HTMLElement>(null);
  const openAuthor = Boolean(anchorElAuthor);
  const openGenre = Boolean(anchorElGenre);
  const openPrice = Boolean(anchorElPrice);

  const countPage = Math.ceil(count / limit);

  const navigate = useNavigate();
  const location = useLocation();

  const handleClickAuthor = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElAuthor(event.currentTarget);
  };
  const handleCloseAuthor = () => {
    setAnchorElAuthor(null);
  };

  const handleClickGenre = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElGenre(event.currentTarget);
  };
  const handleCloseGenre = () => {
    setAnchorElGenre(null);
  };

  const handleGenreClear = () => {
    setGenre([]);
  };

  const handleClickPrice = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElPrice(event.currentTarget);
  };
  const handleClosePrice = () => {
    setAnchorElPrice(null);
  };

  useEffect(() => {
    filtersLoad();
  }, []);

  useEffect(() => {
    setSelectedPage(searchParams.get('page') ? Number(searchParams.get('page')) : page);
    setAuthor(searchParams.get('author') || '');
    setGenre(searchParams.get('genre') ? JSON.parse(searchParams.get('genre') as string) : []);
    setPrice(searchParams.get('price') ? JSON.parse(searchParams.get('price') as string) : ['0', '5000']);
  }, [location.search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      booksLoad(selectedPage, limit, author, genre, price.map(Number));
      setSearchParams({
        page: String(selectedPage),
        author,
        genre: JSON.stringify(genre),
        price: JSON.stringify(price),
      });
    }, 500);
    return () => clearTimeout(timer);
  }, [selectedPage, author, genre, price, navigate]);

  const handleChangeSlider = (e: Event, newPrice: any) => {
    setPrice(newPrice);
  };

  const handleInputChangeStartPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice([event.target.value, price[1]]);
  };

  const handleInputChangeLastPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice([price[0], event.target.value]);
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

  const handleOpenModal = (id: number) => {
    setOpenModal(true);
    bookLoad(id);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <HomeContainer>
      <HomeContent>
        <HomeFilter>
          <FilterButtons>
            <Button
              id="basic-button"
              aria-controls={openAuthor ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openAuthor ? 'true' : undefined}
              onClick={handleClickAuthor}
            >
              <Typography>Автор</Typography>
            </Button>
          </FilterButtons>
          <Menu
            id="basic-menu"
            anchorEl={anchorElAuthor}
            open={openAuthor}
            onClose={handleCloseAuthor}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {filters.author.map((item) => (
              <MenuItem >
                <Checkbox
                  name="author"
                  value={item}
                  onChange={handleChangeAuthor}
                  checked={author === `${item}`} />
                <label>{item}</label>
              </MenuItem>
            ))}
          </Menu>
          <FilterButtons>
            <Button
              id="basic-button"
              aria-controls={openGenre ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openGenre ? 'true' : undefined}
              onClick={handleClickGenre}
            >
              <Typography>Жанр</Typography>
            </Button>
          </FilterButtons>
          <Menu
            id="basic-menu"
            anchorEl={anchorElGenre}
            open={openGenre}
            onClose={handleCloseGenre}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {filters.genre.map((item) => (
              <MenuItem >
                <Checkbox
                  name="gener"
                  value={item}
                  onChange={handleChangeGenre}
                  checked={genre.includes(item)}
                />
                <label>{item}</label>
              </MenuItem>
            ))}
            <MenuItem onClick={handleGenreClear}>
              <Typography >Отчистить фильрацию</Typography>
            </MenuItem>
          </Menu>
          <FilterButtons>
            <Button
              id="basic-button"
              aria-controls={openPrice ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openPrice ? 'true' : undefined}
              onClick={handleClickPrice}
            >
              <Typography>Цена</Typography>
            </Button>
          </FilterButtons>
          <Menu
            id="basic-menu"
            anchorEl={anchorElPrice}
            open={openPrice}
            onClose={handleClosePrice}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem>
              <Box sx={{ width: 300 }}>
                <p>От <Input value={price[0]} onChange={handleInputChangeStartPrice} />
                  до <Input value={price[1]} onChange={handleInputChangeLastPrice} /></p>
                <Slider
                  getAriaLabel={() => 'Temperature range'}
                  value={price.map(Number)}
                  onChange={handleChangeSlider}
                  valueLabelDisplay="auto"
                  max={5000}
                />
              </Box>
            </MenuItem>
          </Menu>
        </HomeFilter>
        <HomeBooks>
          {books.map((item) => (
            <CardBox>
              <Card key={item.id}>
                <CardActionArea onClick={() => {
                  handleOpenModal(item.id);
                }}>
                  {item.coverUrl === null ? (
                    <CardMedia
                      component="img"
                      height="400"
                      image={'https://orthospecialtyclinic.com/wp-content/uploads/2018/08/book-cover-placeholder.jpg'}
                      alt="green iguana"
                    />
                  ) : (
                    <CardMedia
                      component="img"
                      height="400"
                      image={`http://localhost:3001/static/${item.coverUrl}`}
                      alt="green iguana"
                    />
                  )}
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
                      <p>{item.author}</p>
                      <p>{item.price} руб</p>
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
              open={openModal}
              onClose={handleCloseModal}
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
          count={countPage || 1}
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
