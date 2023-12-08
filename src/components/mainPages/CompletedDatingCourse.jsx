import { getDatingCourses } from 'api/course';
import { auth } from '../../firebase/firebase.config';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function CompletedDatingCourse() {
  const { isLoading, isError, data } = useQuery(['course'], getDatingCourses);

  return (
    <StyledPlace>
      <span>데이트 추천 코스</span>
      {data?.map((place) => {
        return (
          <div style={{ border: '2px solid black' }}>
            {isLoading && <p>로딩중입니다!</p>}
            {isError && <p>서버오류 발생!</p>}
            <p>코스명: {place.courseTitle}</p>
            <p>작성날짜: {place.createAt}</p>
            <StCourseWrapper>
              {place.place.map((item) => {
                return (
                  <StUl key={item.id}>
                    <StLi>장소이름: {item.place_name}</StLi>
                    <StLi>카테고리: {item.category_name}</StLi>
                    <StLi>주소: {item.address_name}</StLi>
                  </StUl>
                );
              })}
            </StCourseWrapper>
          </div>
        );
      })}
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

const StCourseWrapper = styled.div``;

const StUl = styled.ul`
  border: 2px solid yellow;
`;

const StLi = styled.li``;
