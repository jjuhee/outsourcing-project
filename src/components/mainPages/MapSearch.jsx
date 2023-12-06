import React, { useState } from 'react';
import styled from 'styled-components';
import MakeDatingCourse from './MakeDatingCourse';

function MapSearch() {
  const [inputTitle, setInputTitle] = useState('');
  const searchPlaceHandler = (e) => {
    e.preventDefault();
  };
  const inputTitleHandler = (e) => {
    setInputTitle(e.target.value);
  };
  return (
    <StyledMap>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt-ovmocWvVYCo1g2IIo1fqKxQtAByXUzxkA&usqp=CAU"></img>
      <form onSubmit={searchPlaceHandler}>
        <input
          type="text"
          placeholder="장소를 입력해주세요"
          value={inputTitle}
          onChange={inputTitleHandler}
        />
        <button type="submit">검색</button>
      </form>
      <MakeDatingCourse />
    </StyledMap>
  );
}

export default MapSearch;

const StyledMap = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  margin: auto;
  padding: 30px;
  text-align: center;
  & input {
  }
  & img {
    width: 400px;
  }
  & button {
    border-radius: 10px;
    margin: 10px auto;
  }
`;
