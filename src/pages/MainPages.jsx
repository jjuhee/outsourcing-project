import CompletedDatingCourse from 'components/mainPages/CompletedDatingCourse';
import MapSearch from 'components/mainPages/MapSearch';
import SearchResult from 'components/mainPages/SearchResult';
import React from 'react';
import ShowMapWidthLine from 'components/mainPages/ShowMapsWithLine';
import styled from 'styled-components';

function MainPages() {
  return (
    <MainContainer>
      <GifBackground src="/background.gif" alt="animatedBackground" />
      {/* <Content> */}
      <MapSearch />
      <CompletedDatingCourse />
      <ShowMapWidthLine />
      {/* </Content> */}
    </MainContainer>
  );
}

const MainContainer = styled.div`
  position: relative;
  height: 100vh;
  overflow: hidden;
`;

const GifBackground = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const Content = styled.div`
  z-index: 1;
`;

export default MainPages;
