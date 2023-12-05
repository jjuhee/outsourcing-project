import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

function SearchResult() {
  const navigate = useNavigate();
  const [isSearch, setIsSearch] = useState(false);
  const naverHandler = () => {
    const naverMapURL = `https://map.naver.com/p`;
    window.open(naverMapURL);
  };
  return (
    <StyledPlace>
      {isSearch === true ? (
        <span>전체 추천코스</span>
      ) : (
        <span>(검색결과 이름) 추천코스</span>
      )}
      <div>코스명</div>
      <div>코스1</div>
      <div>코스2</div>
      <div>코스3</div>
      <button onClick={naverHandler}>길찾기</button>
    </StyledPlace>
  );
}

export default SearchResult;

const StyledPlace = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & span {
    font-size: 40px;
  }
`;

// const StyledCard = styled.div`
//   display: flex;

// `;
