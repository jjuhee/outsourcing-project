import CompletedDatingCourse from 'components/mainPages/CompletedDatingCourse';
import MapSearch from 'components/mainPages/MapSearch';
import SearchResult from 'components/mainPages/SearchResult';
import React from 'react';

function MainPages() {
  return (
    <>
      <MapSearch />
      <SearchResult />
      <CompletedDatingCourse />
    </>
  );
}

export default MainPages;
