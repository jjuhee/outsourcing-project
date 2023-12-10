import { getDatingCourses } from 'api/course';
import MyMap from 'components/mainPages/MyMap';
import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import profileImg from 'assets/happy-couple-facing-each-other-260nw-2122589009.webp';

function ShowMapWidthLine() {
  const { id } = useParams();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState(null);
  const { kakao } = window;

  // 1. 아니면
  const queryClient = useQueryClient();
  const courseData = queryClient.getQueryData(['course'], getDatingCourses);

  const courseCurrentData = courseData.filter(
    (course) => course.courseUid === id
  );

  // 2. 유즈쿼리
  // const { isLoading, isError, refetch } = useQuery(
  //   ['course', { local: inputTitle }],
  //   getCourse,
  //   { enabled: false, select: (local) => local.items }
  // );
  // const { isLoading, isError, courseData } = useQuery(
  //   ['course'],
  //   getDatingCourseDetail
  // );

  //임시 데이터
  // let courseData = [
  //   {
  //     address_name: '서울 마포구 상수동 72-1',
  //     category_group_code: 'SC4',
  //     category_group_name: '학교',
  //     category_name: '교육,학문 > 학교 > 대학교',
  //     distance: '',
  //     id: '8663561',
  //     phone: '02-320-1114',
  //     place_name: '홍익대학교 서울캠퍼스',
  //     place_url: 'http://place.map.kakao.com/8663561',
  //     road_address_name: '서울 마포구 와우산로 94',
  //     x: '126.925554591431',
  //     y: '37.550874837441'
  //   },
  //   {
  //     address_name: '서울 마포구 상수동 72-1',
  //     category_group_code: 'SC4',
  //     category_group_name: '학교',
  //     category_name: '교육,학문 > 학교 > 대학교',
  //     distance: '',
  //     id: '8663561',
  //     phone: '02-320-1114',
  //     place_name: '홍익대학교 다른곳',
  //     place_url: 'http://place.map.kakao.com/8663561',
  //     road_address_name: '서울 마포구 와우산로 94',
  //     x: '126.92150590347114',
  //     y: '37.55264537945837'
  //   },
  //   {
  //     address_name: '서울 마포구 상수동 72-1',
  //     category_group_code: 'SC4',
  //     category_group_name: '학교',
  //     category_name: '교육,학문 > 학교 > 대학교',
  //     distance: '',
  //     id: '8663561',
  //     phone: '02-320-1114',
  //     place_name: '홍대입구역 공항철도',
  //     place_url: 'http://place.map.kakao.com/8663561',
  //     road_address_name: '서울 마포구 와우산로 94',
  //     x: '126.927010430346',
  //     y: '37.5573052656667'
  //   }
  // ];

  // 코스를 누르면 courseClickHandler
  // 코스 (key 값으로?) data 가져오기 (useQuery)
  // 가져온 data로 마커 만들기
  // 마커의 포지션으로 선 그려줌
  const courseClickHandler = (uid) => {
    // 마커 추가
    const bounds = new kakao.maps.LatLngBounds();
    let markers = [];
    let currentCourse = courseData.find(
      (place) => place.courseUid === uid
    ).places;

    // let currentCourse;
    // courseData.map((place) => {
    //   if (place.courseUid === uid) {
    //     currentCourse = place.places;
    //   }
    // });

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
    <>
      <MyMap markers={markers} setMap={setMap} enableDrawing />

      {courseCurrentData?.map((course) => {
        return (
          <StCourse key={course.courseUid}>
            <h3>{course.courseTitle}</h3>
            <p>{course.createAt}</p>
            <p>작성날짜: {course.createAt}</p>
            <p>작성한사람: {course.userNickname}</p>
            <StProfileImgContainer>
              <img src={`${course.userAvatar || profileImg}`} alt="프로필 이미지" />
            </StProfileImgContainer>
            <button onClick={() => courseClickHandler(course.courseUid)}>
              코스보기
            </button>
            {course.places.map((place) => {
              return (
                <StCourseList key={place.id}>
                  <li>장소이름: {place.place_name}</li>
                  <li>{place.imageUrls}</li>
                  <li>카테고리: {place.category_name}</li>
                  <li>주소: {place.address_name}</li>
                </StCourseList>
              );
            })}
          </StCourse>
        );
      })}
    </>
  );
}

export default ShowMapWidthLine;

const StCourse = styled.div`
  width: 550px;
  height: 400px;
  border: 1px solid green;

  button {
    cursor: pointer;
  }
`;

const StProfileImgContainer = styled.div`
  img {
    border-radius: 50%;
    height: 80px;
  }
`;

const StCourseList = styled.div``;
