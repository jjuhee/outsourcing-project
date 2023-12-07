import MyMap from 'components/mainPages/MyMap';
import React, { useState } from 'react';
import styled from 'styled-components';

function ShowMapWidthLine() {
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState(null);
  const { kakao } = window;

  // 1. 아니면
  // const queryClient = useQueryClient();
  // const courseData = queryClient.getQueryData(["course"]);

  //2. 유즈쿼리

  // const { isLoading, isError, refetch, data } = useQuery(
  //   ['course', { local: inputTitle }],
  //   getCourse,
  //   { enabled: false, select: (local) => local.items }
  // );

  //임시 데이터
  let data = [
    {
      address_name: '서울 마포구 상수동 72-1',
      category_group_code: 'SC4',
      category_group_name: '학교',
      category_name: '교육,학문 > 학교 > 대학교',
      distance: '',
      id: '8663561',
      phone: '02-320-1114',
      place_name: '홍익대학교 서울캠퍼스',
      place_url: 'http://place.map.kakao.com/8663561',
      road_address_name: '서울 마포구 와우산로 94',
      x: '126.925554591431',
      y: '37.550874837441'
    },
    {
      address_name: '서울 마포구 상수동 72-1',
      category_group_code: 'SC4',
      category_group_name: '학교',
      category_name: '교육,학문 > 학교 > 대학교',
      distance: '',
      id: '8663561',
      phone: '02-320-1114',
      place_name: '홍익대학교 다른곳',
      place_url: 'http://place.map.kakao.com/8663561',
      road_address_name: '서울 마포구 와우산로 94',
      x: '126.92150590347114',
      y: '37.55264537945837'
    },
    {
      address_name: '서울 마포구 상수동 72-1',
      category_group_code: 'SC4',
      category_group_name: '학교',
      category_name: '교육,학문 > 학교 > 대학교',
      distance: '',
      id: '8663561',
      phone: '02-320-1114',
      place_name: '홍대입구역 공항철도',
      place_url: 'http://place.map.kakao.com/8663561',
      road_address_name: '서울 마포구 와우산로 94',
      x: '126.927010430346',
      y: '37.5573052656667'
    }
  ];

  // 코스를 누르면 courseClickHandler
  // 코스 (key 값으로?) data 가져오기 (useQuery)
  // 가져온 data로 마커 만들기
  // 마커의 포지션으로 선 그려줌
  const courseClickHandler = () => {
    // 마커 추가
    const bounds = new kakao.maps.LatLngBounds();
    let markers = [];
    for (var i = 0; i < data.length; i++) {
      // @ts-ignore
      markers.push({
        position: {
          lat: data[i].y,
          lng: data[i].x
        },
        content: data[i].place_name
      });

      // @ts-ignore
      bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
    }
    setMarkers(markers);

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds);
  };

  return (
    <>
      <MyMap markers={markers} setMap={setMap} enableDrawing />
      <StCourse onClick={courseClickHandler}> 코스 div </StCourse>
    </>
  );
}

export default ShowMapWidthLine;

const StCourse = styled.div`
  width: 60px;
  hegiht: 30px;
  border: 1px solid green;
`;