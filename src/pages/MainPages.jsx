import MakeDatingCourse from 'components/mainPages/MakeDatingCourse';
import CompletedDatingCourse from 'components/mainPages/CompletedDatingCourse';
import MapSearch from 'components/mainPages/MapSearch';
import SearchResult from 'components/mainPages/SearchResult';
import React from 'react';
import Map from 'components/mainPages/Map';

function MainPages() {
  return (
    <>
      <Map />
      <MapSearch />
      <MakeDatingCourse />
      <SearchResult />
      <CompletedDatingCourse />
    </>
  );
}

export default MainPages;
