import { getDatingCourses } from 'api/course';
import MyMap from 'components/mainPages/MyMap';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import profileImg from 'assets/happy-couple-facing-each-other-260nw-2122589009.webp';
import backgroundImg from 'assets/dateCourseContainer.png';
import buttonImg from 'assets/addCourseButton.png';

function ShowMapWidthLine() {
  const { id } = useParams();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState(null);
  const { kakao } = window;

  const {
    isLoading,
    isError,
    data: courseData
  } = useQuery(['course'], getDatingCourses);
  const courseCurrentData = courseData?.filter(
    (course) => course.courseUid === id
  );

  /**코스를 누르면 가져온 data로 마커 만들기
   * 마커의 포지션으로 선 그려줌 */
  const courseClickHandler = (uid) => {
    // 마커 추가
    const bounds = new kakao.maps.LatLngBounds();
    let markers = [];
    let currentCourse = courseData.find(
      (place) => place.courseUid === uid
    ).places;

    for (var i = 0; i < currentCourse.length; i++) {
      // @ts-ignore
      markers.push({
        position: {
          lat: currentCourse[i].y,
          lng: currentCourse[i].x
        },
        content: currentCourse[i].place_name
      });
      // @ts-ignore
      bounds.extend(
        new kakao.maps.LatLng(currentCourse[i].y, currentCourse[i].x)
      );
    }
    setMarkers(markers);
    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds);
  };

  return (
    <StBody>
      <StCourseWrapper>
        <StCourseTitle>💟 코스 상세보기 💟</StCourseTitle>
        <MyMap markers={markers} setMap={setMap} enableDrawing page="detail" />

        {courseCurrentData?.map((course) => {
          return (
            <StCourse key={course.courseUid}>
              <h3>코스명 {course.courseTitle}</h3>
              <p>
                <span>작성날짜</span> {course.createAt}
              </p>
              <p>
                <span>작성한사람</span> {course.userNickname}
              </p>
              <StProfileImgContainer>
                <img
                  src={`${course.userAvatar || profileImg}`}
                  alt="프로필 이미지"
                />
              </StProfileImgContainer>
              <button onClick={() => courseClickHandler(course.courseUid)}>
                코스보기
              </button>
              {course.places.map((place, index) => {
                return (
                  <StCourseList key={place.id}>
                    <li className="placeName">
                      {index + 1} <span>장소이름</span> {place.place_name}
                    </li>
                    <li>{place.imageUrls}</li>
                    <li>
                      <span>카테고리</span> {place.category_name}
                    </li>
                    <li>
                      <span>주소</span> {place.address_name}
                    </li>
                  </StCourseList>
                );
              })}
            </StCourse>
          );
        })}
      </StCourseWrapper>
    </StBody>
  );
}

export default ShowMapWidthLine;

const StBody = styled.body`
  background-color: var(--login-signup-background-color);
  padding: 100px;
`;

const StCourseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: url(${backgroundImg});
  background-repeat: no-repeat;
  width: 650px;
  height: 1000px;
  margin: 0 auto;
`;

const shakeAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(5px);
  }
  75% {
    transform: translateX(-3px);
  }
  100% {
    transform: translateX(3px);
  }
`;

const jeilyAnimation = keyframes`
  25% {
    transform: scale(0.9, 1.1);
  }

  50% {
    transform: scale(1.1, 0.9);
  }

  75% {
    transform: scale(0.95, 1.05);
  }
`;

const StCourseTitle = styled.h3`
  padding: 20px 0 30px 0;
  margin-left: 110px;
  font-size: 2.5rem;
  color: var(--date-course-title);
  animation: ${shakeAnimation} 1.4s ease infinite;
`;

const StCourse = styled.div`
  width: 500px;
  height: 400px;
  padding: 30px;
  overflow: auto;
  overflow-x: hidden;
  word-break: break-all;
  word-wrap: break-word;
  margin-left: 25px;

  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    border-radius: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--search-button);
  }
  &::-webkit-scrollbar-track {
    background-color: var(--search-input-background-color);
  }
  h3 {
    font-size: 1.8rem;
    padding-bottom: 10px;
    color: var(--search-button);
    text-align: center;
  }
  p {
    font-size: 1.5rem;
  }
  span {
    color: var(--login-signup-input-bottom);
  }
  button {
    background-image: url(${buttonImg});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 100% 50%;
    width: 200px;
    height: 50px;
    margin-top: 10px;
    font-size: 1.5rem;
    color: var(--white);
    &:hover {
      animation: ${jeilyAnimation} 0.5s;
    }
  }
`;

const StProfileImgContainer = styled.div`
  img {
    border-radius: 50%;
    height: 80px;
  }
`;

const StCourseList = styled.ul`
  font-size: 1.5rem;
  padding-bottom: 20px;
  border: 5px solid var(--search-input-background-color);
  border-radius: 5px;
  margin: 15px 0 15px 0;

  .placeName {
    color: var(--date-course-title);
  }

  span {
    color: var(--login-signup-input-bottom);
  }

  li {
    padding: 5px;
    color: var();
  }
`;
