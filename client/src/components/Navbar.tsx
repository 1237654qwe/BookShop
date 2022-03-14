/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  CssBaseline,
  List,
  Divider,
  Tooltip,
} from '@mui/material';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LoginIcon from '@mui/icons-material/Login';
import FaceIcon from '@mui/icons-material/Face';
import history from '../history';

import { Links } from '../style/Styled';

const Navbar: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    setSearchParams({
      page: '',
      author: '',
      genre: '',
      price: '',
    });
  }, [navigate]);
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar >
        <Toolbar>
          <Tooltip title="Каталог">
            <Typography
              variant="h3"
              component="span"
              sx={{ flexGrow: 1 }}
            >
              <Links to="/" >BookShop</Links>
            </Typography>
          </Tooltip>
          {token
            ? (
              <Tooltip title="Страница пользователя">
                <IconButton
                  color="inherit"
                >
                  <Links to="/user" > <FaceIcon fontSize='large' /></Links>
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Авторизация">
                <IconButton
                  color="inherit"
                >
                  <Links to="/sign-in" > <LoginIcon fontSize='large' /></Links>
                </IconButton>
              </Tooltip>
            )
          }
          {token
            ? (<></>) : (
              <Tooltip title="Регистрация">
                <IconButton
                  color="inherit"
                >
                  <Links to="/sign-up" ><HowToRegIcon fontSize='large' /></Links>
                </IconButton>
              </Tooltip>
            )
          }
        </Toolbar>
      </AppBar>
      <Divider />
      <List>
        Книга по жанру
      </List>
      <Divider />
      <List>
        Книга издательству
      </List>
      <Divider />
      <List>
        Книга по цене
      </List>
    </ Box>
  );
};
export default Navbar;
