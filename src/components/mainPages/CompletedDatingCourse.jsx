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
      <StyledDaterecommendList>
        {data?.map((course) => {
          return (
            <StyledCourseWrapper
              key={course.courseUid}
              onSubmit={() => goToDetailButtonHandler(course.courseUid)}
            >
              {isLoading && <LodingLayer>로딩중입니다!</LodingLayer>}
              {isError && <p>서버오류 발생!</p>}
              <StyledAvatarNicknameDayContainer>
                <StyledAvatarNickname>
                  <img src={`${profileImg}`} alt="프로필 이미지" />
                  <div>{course.nickname}님</div>
                </StyledAvatarNickname>
                <StyledWriteDay>작성날짜: {course.createAt}</StyledWriteDay>
              </StyledAvatarNicknameDayContainer>

              <StyledCourseContainer>
                <StCourseTitle>코스명: {course.courseTitle}</StCourseTitle>
                <Test>
                  {course.places.map((place) => {
                    return (
                      <StyledCourseList key={place.id}>
                        <div>장소이름: {place.place_name}</div>
                        {course.imageUrls[0]}
                        <div>{place.imageUrls}</div>
                        <div>카테고리: {place.category_name}</div>
                        <div>주소: {place.address_name}</div>
                      </StyledCourseList>
                    );
                  })}
                </Test>
              </StyledCourseContainer>
            </StyledCourseWrapper>
          );
        })}
      </StyledDaterecommendList>
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
`;

const StyledRecommendTitle = styled.h2`
  font-size: 2.2rem;
  display: flex;
  justify-content: center;
  margin-top: 150px;
`;

const StyledDaterecommendList = styled.div`
  background-color: red;
  width: 800px;
  display: flex;
  flex-direction: column;
  margin: auto;
`;

const StyledAvatarNicknameDayContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #b2b2ff;
  padding: 10px;
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
  background-color: yellow;
  margin: auto;
  cursor: pointer;
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

const Test = styled.div`
  display: flex;
`;

const StyledCourseList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  font-size: 1rem;
  line-height: 26px;
`;

const StCourseTitle = styled.p`
  font-size: 1.3rem;
`;

const StWriter = styled.p``;

const StProfileImgContainer = styled.div`
  img {
    border-radius: 50%;
    height: 80px;
  }
`;

const StCourseDetailButton = styled.button``;
