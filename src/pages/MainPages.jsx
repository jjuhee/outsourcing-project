import CompletedDatingCourse from 'components/mainPages/CompletedDatingCourse';
import MapSearch from 'components/mainPages/MapSearch';
import SearchResult from 'components/mainPages/SearchResult';
import React from 'react';
import ShowMapWidthLine from 'components/mainPages/ShowMapsWithLine';
// import Map from 'components/mainPages/MyMap';

function MainPages() {
  return (
    <>
      <MapSearch />
      <SearchResult />
      <CompletedDatingCourse />
      <ShowMapWidthLine />
    </>
  );
}

export default MainPages;
