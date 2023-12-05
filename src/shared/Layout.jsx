import Footer from 'comments/Footer';
import Header from 'comments/Header';
import React from 'react';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
