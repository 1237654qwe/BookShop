import React from 'react';
import { Link } from 'react-router-dom';

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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import FaceIcon from '@mui/icons-material/Face';

const Navbar: React.FC = () => (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar >
        <Toolbar>
          <Typography
            variant="h5"
            component="span"
            sx={{ flexGrow: 1 }}
          >
            <Link to="/" >BookShop</Link>
          </Typography>
          <IconButton
            color="inherit"
          >
            <Link to="/user" ><FaceIcon /></Link>
          </IconButton>
          <IconButton
            color="inherit"
          >
            <Link to="/signIn" > <LoginIcon /></Link>
          </IconButton>
          <IconButton
            color="inherit"
          >
            <Link to="/signUp" ><HowToRegIcon /></Link>
          </IconButton>
          <IconButton
            color="inherit"
          >
            <Link to="/cart" ><ShoppingCartIcon /></Link>
          </IconButton>
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

export default Navbar;
