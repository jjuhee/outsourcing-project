import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function CompletedDatingCourse() {
  const navigate = useNavigate();
  const [isSearch, setIsSearch] = useState(false);
  const naverHandler = () => {
    navigate('/detail');
    // const naverMapURL = `https://map.naver.com/p`;
    // window.open(naverMapURL);
  };
  return (
    <StyledPlace>
      <span>데이트 추천 코스</span>
      <div>코스명</div>
      <div>코스1</div>
      <div>코스2</div>
      <div>코스3</div>
      <button onClick={naverHandler}>상세보기</button>
    </StyledPlace>
  );
}

export default CompletedDatingCourse;

const StyledPlace = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & span {
    font-size: 40px;
  }
`;
