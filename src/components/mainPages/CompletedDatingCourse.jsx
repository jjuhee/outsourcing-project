import { getDatingCourses } from 'api/course';
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import profileImg from 'assets/happy-couple-facing-each-other-260nw-2122589009.webp';
import { useSelector } from 'react-redux';
import LodingLayer from 'pages/LodingLayer';

function CompletedDatingCourse() {
  const { isLoading, isError, data } = useQuery(['course'], getDatingCourses);
  const userInfo = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const goToDetailButtonHandler = (uid) => {
    navigate(`/detail/${uid}`);
  };

  return (
    <StyledPlaceWrapper>
      <StyledRecommendTitle>데이트 추천 코스</StyledRecommendTitle>
      {/* <StyledDaterecommendList> */}
      {data?.map((course) => {
        return (
          <StyledCourseWrapper
            key={course.courseUid}
            onClick={() => goToDetailButtonHandler(course.courseUid)}
          >
            {isLoading && <LodingLayer>로딩중입니다!</LodingLayer>}
            {isError && <p>서버오류 발생!</p>}
            <StyledAvatarNicknameDayContainer>
              <StyledAvatarNickname>
                <img
                  src={`${course.userAvatar || profileImg}`}
                  alt="프로필 이미지"
                />
                <div>{course.userNickname}님</div>
              </StyledAvatarNickname>
              <StyledWriteDay>작성날짜: {course.createAt}</StyledWriteDay>
            </StyledAvatarNicknameDayContainer>

            <StyledCourseContainer>
              <StyledCourseTitle>
                코스명: {course.courseTitle}
              </StyledCourseTitle>

              <StyledCourseList>
                {course.places.map((place) => {
                  return (
                    <StyledEachCourseList key={place.id}>
                      <div>장소이름: {place.place_name}</div>
                      {course.imageUrls[0]}
                      <div>{place.imageUrls}</div>
                      <div>카테고리: {place.category_name}</div>
                      <div>주소: {place.address_name}</div>
                    </StyledEachCourseList>
                  );
                })}
              </StyledCourseList>
            </StyledCourseContainer>
          </StyledCourseWrapper>
        );
      })}
      {/* </StyledDaterecommendList> */}
    </StyledPlaceWrapper>
  );
}

export default CompletedDatingCourse;

const StyledPlaceWrapper = styled.div`
  margin: auto;
  background-image: url(/createDateCourseImg.jpg);
  background-size: cover;
  background-position: center;
  width: 1200px;
  height: 1700px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  &::-webkit-scrollbar {
    width: 20px;
    height: 10px;
    border-radius: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--recommend-date-title);
  }
  &::-webkit-scrollbar-track {
    background-color: var(--search-input-background-color);
  }
  margin-bottom: 50px;
  border-radius: 20px;
`;

const StyledRecommendTitle = styled.h2`
  font-size: 2.2rem;
  display: flex;
  justify-content: center;
  margin: 180px 0 50px 0;
  color: var(--date-course-title);
`;

// const StyledDaterecommendList = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   overflow-y: auto;
//   margin: 50px 0 0 10px;
// `;

const StyledAvatarNicknameDayContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--recommend-date-title);
  width: 730px;
`;

const StyledAvatarNickname = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 15px;
  font-size: 1.1rem;
  img {
    border-radius: 50%;
    width: 60px;
    height: 60px;
    margin-right: 25px;
  }
`;

const StyledCourseWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  /* background-color: #ffeef7; */
  margin-top: 20px;
  margin-bottom: 10px;
  width: 100%;
`;

const StyledWriteDay = styled.p`
  font-size: 0.8rem;
`;

const StyledCourseContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
`;

const StyledCourseTitle = styled.p`
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: var(--date-course-title);
`;

const StyledCourseList = styled.div`
  padding: 10px;
  font-size: 1rem;
  line-height: 35px;
`;

const StyledEachCourseList = styled.div`
  border: 1.5px solid #ff22e9;
  border-radius: 15px;
  padding: 10px;
  margin-bottom: 20px;
  width: 700px;
  background: linear-gradient(to right, #ffb3c0 50%, transparent 50%);
  background-size: 200% 100%;
  background-position: right bottom;
  transition: background-position 0.3s ease;
  &:hover {
    background-position: left bottom;
  }
`;
