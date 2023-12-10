import { getDatingCourses } from 'api/course';
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import profileImg from 'assets/happy-couple-facing-each-other-260nw-2122589009.webp';
import { useSelector } from 'react-redux';

function CompletedDatingCourse() {
  const { isLoading, isError, data } = useQuery(['course'], getDatingCourses);
  const userInfo = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const goToDetailButtonHandler = (uid) => {
    navigate(`/detail/${uid}`);
  };

  return (
    <StPlaceWrapper>
      <StRecommendTitle>데이트 추천 코스</StRecommendTitle>
      {data?.map((course) => {
        return (
          <StCourseWrapper
            key={course.courseUid}
            style={{ border: '2px solid black' }}
          >
            {isLoading && <p>로딩중입니다!</p>}
            {isError && <p>서버오류 발생!</p>}
            <StCourseTitle>코스명: {course.courseTitle}</StCourseTitle>
            <StWriteDay>작성날짜: {course.createAt}</StWriteDay>
            <StWriter>작성한사람: {userInfo.nickname}</StWriter>
            <StProfileImgContainer>
              <img src={`${userInfo.avatar || profileImg}`} alt="프로필 이미지" />
            </StProfileImgContainer>
            <StCourseDetailButton
              onClick={() => goToDetailButtonHandler(course.courseUid)}
            >
              상세보기
            </StCourseDetailButton>
            <StCourseContainer>
              {course.places.map((place) => {
                return (
                  <StCourseList key={place.id}>
                    <li>장소이름: {place.place_name}</li>
                    {course.imageUrls[0]}
                    <li>{place.imageUrls}</li>
                    <li>카테고리: {place.category_name}</li>
                    <li>주소: {place.address_name}</li>
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

const StWriter = styled.p``;

const StProfileImgContainer = styled.div`
  img {
    border-radius: 50%;
    height: 80px;
  }
`;

const StCourseContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StCourseDetailButton = styled.button``;

const StCourseList = styled.ul`
  border: 2px solid black;
  padding: 15px;

  li {
    font-size: 1rem;
  }
`;
