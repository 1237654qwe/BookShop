import React from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';

import Home from './layouts/Home';
import SignIn from './layouts/SignIn';
import SignUp from './layouts/SignUp';
import User from './layouts/User';
import Cart from './layouts/Cart';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RequireAuth from './api/RequireAuth';

const App: React.FC = () => {
  return (
    <>
      <div className="app">
        <div className="app-header">
          <Navbar />
        </div>
        <div className='app-content'>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/signIn" element={<SignIn />}></Route>
              <Route path="/signUp" element={<SignUp />}></Route>
              <Route element={<RequireAuth />}>
                <Route path="/user" element={<User />}></Route>
                <Route path="/cart" element={<Cart />}></Route>
              </Route>
            </Routes>
        </div>
        <div className="app-footer">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default App;
