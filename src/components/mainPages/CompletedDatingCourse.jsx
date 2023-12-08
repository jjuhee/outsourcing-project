import { getDatingCourses } from 'api/course';
import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

function CompletedDatingCourse() {
  const { isLoading, isError, data } = useQuery(['course'], getDatingCourses);

  return (
    <StPlaceWrapper>
      <StRecommendTitle>데이트 추천 코스</StRecommendTitle>
      {data?.map((place) => {
        return (
          <StCourseWrapper style={{ border: '2px solid black' }}>
            {isLoading && <p>로딩중입니다!</p>}
            {isError && <p>서버오류 발생!</p>}
            <StCourseTitle>코스명: {place.courseTitle}</StCourseTitle>
            <StWriteDay>작성날짜: {place.createAt}</StWriteDay>
            <StCourseContainer>
              {place.place.map((item) => {
                return (
                  <StCourseList key={item.id}>
                    <li>장소이름: {item.place_name}</li>
                    <li>카테고리: {item.category_name}</li>
                    <li>주소: {item.address_name}</li>
                  </StCourseList>
                );
              })}
            </StCourseContainer>
          </StCourseWrapper>
        );
      })}
    </StPlaceWrapper>
  );
}

export default CompletedDatingCourse;

const StPlaceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & span {
    font-size: 40px;
  }
  margin-top: 40px;
`;

const StRecommendTitle = styled.h2`
  font-size: 1.5rem;
`;

const StCourseWrapper = styled.div``;

const StCourseTitle = styled.p`
  font-size: 1.3rem;
`;

const StWriteDay = styled.p``;

const StCourseContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StCourseList = styled.ul`
  border: 2px solid black;
  padding: 15px;

  li {
    font-size: 1rem;
  }
`;
