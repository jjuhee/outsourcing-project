import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainPages from 'pages/MainPages';
import Login from 'pages/Login';
import Signup from '../pages/Signup';
import DetailPages from 'pages/DetailPages';
import Profile from 'pages/Profile';
import GlobalStyle from 'styles/GlobalStyle';
import GlobalColor from 'styles/GlobalColor';
import Layout from '../layouts/Layout';
import { useSelector } from 'react-redux';

function Router() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <>
      <GlobalStyle />
      <GlobalColor />
      <BrowserRouter>
        <Routes>
          {isLoggedIn ? (
            <>
              <Route element={<Layout />}>
                <Route path="/" element={<MainPages />} />
                <Route path="/detail/:id" element={<DetailPages />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<Navigate replace to="/" />} />
              </Route>
            </>
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<Navigate replace to="login" />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Router;
