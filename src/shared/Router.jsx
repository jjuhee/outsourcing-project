import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPages from 'pages/MainPages';
import Login from 'pages/Login';
import DetailPages from 'pages/DetailPages';
import Profile from 'pages/Profile';
import GlobalStyle from 'styles/GlobalStyle';
import GlobalColor from 'styles/GlobalColor';

function Router() {
  return (
    <>
      <GlobalStyle />
      <GlobalColor />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPages />} />
          <Route path="/login" element={<Login />} />
          <Route path="/detail" element={<DetailPages />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Router;
