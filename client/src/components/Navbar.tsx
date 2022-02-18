import React from "react";
import { Link } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Drawer,
  CssBaseline,
  List,
  Divider,
} from "@mui/material"
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import FaceIcon from '@mui/icons-material/Face';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { styled, useTheme } from '@mui/material/styles';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Navbar: React.FC = () => {

  const theme = useTheme();

  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>

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
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
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
      </Drawer>
    </ Box>
  );
};

export default Navbar;