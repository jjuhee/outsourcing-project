import Footer from 'components/Footer';
import Header from 'components/Header';
import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

function Layout() {
  return (
    <>
      <FixedPosition>
        <Header />
      </FixedPosition>

      <ContentWrapper>
        <Outlet />
        <Footer />
      </ContentWrapper>
    </>
  );
}

const FixedPosition = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
`;

const ContentWrapper = styled.div`
  margin-top: 120px;
`;
export default Layout;
