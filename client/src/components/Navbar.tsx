/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from 'react';

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  CssBaseline,
  List,
  Divider,
} from '@mui/material';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LoginIcon from '@mui/icons-material/Login';
import FaceIcon from '@mui/icons-material/Face';

import { Links } from '../style/Styled';

const Navbar: React.FC = () => {
  const token = localStorage.getItem('token');
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar >
        <Toolbar>
          <Typography
            variant="h3"
            component="span"
            sx={{ flexGrow: 1 }}
          >
          <Links to="/" >BookShop</Links>
        </Typography>
        {token
          ? (
          <IconButton
            color="inherit"
          >
            <Links to="/user" > <FaceIcon fontSize='large' /></Links>
            </IconButton>
          ) : (
            <IconButton
              color="inherit"
            >
              <Links to="/sign-in" > <LoginIcon fontSize='large' /></Links>
            </IconButton>
          )
        }
        {token
          ? (<></>) : (
          <IconButton
            color="inherit"
          >
            <Links to="/sign-up" ><HowToRegIcon fontSize='large' /></Links>
          </IconButton>
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
