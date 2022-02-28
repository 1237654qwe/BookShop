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
  Checkbox
} from '@mui/material';
import {
  HomeContainer,
  HomeContent,
  HomeFilter,
  HomeBooks,
  PaginationContainer,
  CardBox
} from '../api/Styled';
import MuiInput from '@mui/material/Input';
import { styled } from '@mui/material/styles';

import {
  loadBooks,
  setBooksPage
} from '../redux/books/actions';
import { AppStateType } from '../redux/store';

const Input = styled(MuiInput)`
  width: 42px;
`;

const Home: React.FC<Props> = ({
  books = [], page, limit, count, booksLoad, booksPageSet
}) => {

  const [selectedPage, setSelectedPage] = React.useState<number>(1);
  const [author, setAuthor] = React.useState<string>('');
  const [genre, setGenre] = React.useState<string[]>([]);
  const [price, setPrice] = React.useState<number[]>([0, 5000]);


  const countPage = Math.ceil(count / 9)

  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      booksLoad(selectedPage, 9, author, genre, price)
      if (author || genre) {
        navigate({
          pathname: '/',
          search: `?page=${selectedPage}&author=${author}&genre[]=${genre}&price[]=${price[0]}&price[]=${price[1]}`
        })
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [selectedPage, author, genre, price]);

  const handleChangeSlider = (e: Event, newPrice: number | number[]) => {
    setPrice(newPrice as number[]);
  };

  const handleChangePage = (e: React.ChangeEvent<unknown>, value: number) => {
    setSelectedPage(value);
  };

  const handleChangeAuthor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked
    if (isChecked) {
      setAuthor(e.target.value)
    } else {
      setAuthor("")
    }
  }

  const handleChangeGenre = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked
    if (isChecked) {
      setGenre([...genre, e.target.value])
    } else {
      setGenre(genre.filter((item) => item != e.target.value))
    }
  }

  return (
    <HomeContainer>
      <HomeContent>
        <HomeFilter>
          <div>
            <Typography variant="h6">Автор</Typography>
          </div>
          <div>
            <Checkbox
              name="author"
              value="Хоррор Хоррорович"
              onChange={handleChangeAuthor}
              checked={author === "Хоррор Хоррорович"} />
            <label>Хоррор Хоррорович</label>
          </div>
          <div>
            <Checkbox
              name="author"
              value="Адвенчур Адвенчурович"
              onChange={handleChangeAuthor}
              checked={author === "Адвенчур Адвенчурович"} />
            <label>Адвенчур Адвенчурович</label>
          </div>
          <div>
            <Checkbox
              name="author"
              value="Романова Романовна"
              onChange={handleChangeAuthor}
              checked={author === "Романова Романовна"} />
            <label>Романова Романовна</label>
          </div>
          <div>
            <Checkbox
              name="author"
              value="Роберт Маккаммон"
              onChange={handleChangeAuthor}
              checked={author === "Роберт Маккаммон"} />
            <label>Роберт Маккаммон</label>
          </div>
          <div>
            <Checkbox
              name="author"
              value="О Головина"
              onChange={handleChangeAuthor}
              checked={author === "О Головина"} />
            <label>О. Головина</label>
          </div>
          <div>
            <Checkbox
              name="author"
              value="Ульяна Соболева"
              onChange={handleChangeAuthor}
              checked={author === "Ульяна Соболева"} />
            <label>Ульяна Соболева</label>
          </div>
          <div>
            <Checkbox
              name="author"
              value="Джей Крауновер"
              onChange={handleChangeAuthor}
              checked={author === "Джей Крауновер"} />
            <label>Джей Крауновер</label>
          </div>
          <div>
            <Checkbox
              name="author"
              value="Б Ходж"
              onChange={handleChangeAuthor}
              checked={author === "Б Ходж"} />
            <label>Б. Ходж</label>
          </div>
          <div>
            <Checkbox
              name="author"
              value="Э Джорж"
              onChange={handleChangeAuthor}
              checked={author === "Э Джорж"} />
            <label>Э. Джорж</label>
          </div>
          <div>
            <Checkbox
              name="author"
              value="Марк Твен"
              onChange={handleChangeAuthor}
              checked={author === "Марк Твен"} />
            <label>Марк Твен</label>
          </div>
          <div>
            <Checkbox
              name="author"
              value="Стивен Кинг"
              onChange={handleChangeAuthor}
              checked={author === "Стивен Кинг"} />
            <label>Стивен Кинг</label>
          </div>
          <div>
            <Typography variant="h6">Жанр</Typography>
          </div>
          <div>
            <Checkbox
              name="gener"
              value="Ужасы"
              onChange={handleChangeGenre} />
            <label>Ужасы</label>
          </div>
          <div>
            <Checkbox
              name="gener"
              value="Приключения"
              onChange={handleChangeGenre} />
            <label>Приключения</label>
          </div>
          <div>
            <Checkbox
              name="gener"
              value="Романы"
              onChange={handleChangeGenre} />
            <label>Романы</label>
          </div>
          <div>
            <Typography variant="h6">Цена</Typography>
          </div>
          <Box sx={{ width: 300 }}>
            <p>От <Input value={price[0]} /> до <Input value={price[1]} /></p>
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
  const { booksReducer: { books, page, limit, count } } = state;
  return { books, page, limit, count };
};

const mapDispatchToProps = {
  booksLoad: loadBooks,
  booksPageSet: setBooksPage
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

interface OwnProps { };

type Props = StateProps & DispatchProps & OwnProps;

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(Home);