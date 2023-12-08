import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

function Map() {
  // const mapElement = useRef(null);
  // const [polyline, setPolyline] = useState(null);
  // const { naver } = window;

  // useEffect(() => {
  //   if (!mapElement.current || !naver) return;

    //로케이션표시 map에서 원하는 장소 찾은 후 주변검색 누르면 좌표를 찾을 수 있다
    // const location = new naver.maps.LatLng(37.5663, 126.9779);

    //네이버 지도 옵션 선택
  //   const mapOptions = {
  //     center: location,
  //     zoom: 16,
  //     zoomControl: true,
  //     zoomControlOptions: {
  //       position: naver.maps.Position.TOP_RIGHT
  //     }
  //   };
  //   const map = new naver.maps.Map(mapElement.current, mapOptions);

  //   //초기 경로는 빈 배열로 시작
  //   const initialPath = [];
  //   const initialPolyline = new naver.maps.Polyline({
  //     map,
  //     path: initialPath,
  //     strokeColor: '#5347AA',
  //     strokeWeight: 2
  //   });

  //   setPolyline(initialPolyline);

  //   //지도상에 핀 표시 할 부분
  //   new naver.maps.Marker({
  //     position: location,
  //     map
  //   });

  //   // 클릭 이벤트 핸들러
  //   naver.maps.Event.addListener(map, 'click', function (e) {
  //     const point = e.coord;

  //     // 경로 정보 업데이트
  //     const path = initialPolyline.getPath();
  //     path.push(point);

  //     // 새로운 마커 추가
  //     new naver.maps.Marker({
  //       position: point,
  //       map
  //     });
  //   });
  // }, [naver]);

  return (
    <>
      {/* <StyledMap ref={mapElement} style={{ width: 400, height: 400 }} /> */}
    </>
  );
}

export default Map;

const StyledMap = styled.div`
  width: 400px;
  height: 400px;
`;
