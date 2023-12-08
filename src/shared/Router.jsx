import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPages from 'pages/MainPages';
import Login from 'pages/Login';
import Signup from '../pages/Signup';
import DetailPages from 'pages/DetailPages';
import Profile from 'pages/Profile';
import GlobalStyle from 'styles/GlobalStyle';
import GlobalColor from 'styles/GlobalColor';
import Layout from '../layouts/Layout';

function Router() {
  return (
    <>
      <GlobalStyle />
      <GlobalColor />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<MainPages />} />
            <Route path="/detail" element={<DetailPages />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Router;
