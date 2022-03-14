/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';

import Home from './layouts/Home';
import SignIn from './layouts/SignIn';
import SignUp from './layouts/SignUp';
import User from './layouts/User';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RequireAuth from './api/RequireAuth';

import { FooterStyle } from './style/Styled';

const routes = [
  {
    path: '/',
    Component: Home,
    isAuth: false,
  },
  {
    path: '/sign-in',
    Component: SignIn,
    isAuth: false,
  },
  {
    path: '/sign-up',
    Component: SignUp,
    isAuth: false,
  },
  {
    path: '/user',
    Component: User,
    isAuth: true,
  },
];

const App: React.FC = () => (
  <Routes>
    {routes.map(({ path, Component, isAuth }) => {
      if (isAuth) {
        return <Route element={<RequireAuth />}>
          <Route key={path}
            path={path}
            element={
              <div className="app">
                <div className="app-header">
                  <Navbar />
                </div>
                <div className='app-content'>
                  <Component />
                </div>
                <FooterStyle>
                  <Footer />
                </FooterStyle>
              </div>
            } />;
        </Route>;
      }
      return <Route key={path}
        path={path}
        element={
          <div className="app">
            <div className="app-header">
              <Navbar />
            </div>
            <div className='app-content'>
              <Component />
            </div>
            <FooterStyle>
              <Footer />
            </FooterStyle>
          </div>
        } />;
    })}
  </Routes>
);

export default App;
