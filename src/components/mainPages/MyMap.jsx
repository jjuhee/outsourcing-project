import React from 'react';
import { Map, MapMarker, Polyline } from 'react-kakao-maps-sdk';

function MyMap({ markers, setMap, enableDrawing = false, page = "main" }) {

  return (
    <div>
      <Map // 로드뷰를 표시할 Container
        center={{
          lat: 37.566826,
          lng: 126.9786567
        }}
        style={
          (page === 'main') ?
            {
              width: '332px',
              height: '232.2px'
            } : {
              width: '470px',
              height: '300px',
              marginLeft: '55px'
            }}
        level={3}
        onCreate={setMap}
      >
        {markers.map((marker) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
            image={{
              src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png', // 마커이미지의 주소입니다
              size: {
                width: 24,
                height: 35
              } // 마커이미지의 크기입니다
            }}
            title={marker.content} // 마커에 마우스를 올리면 보여줌
          ></MapMarker>
        ))}
        {enableDrawing && (
          <Polyline
            path={[markers.map((marker) => marker.position)]}
            strokeWeight={5} // 선의 두께 입니다
            strokeColor={'#FFAE00'} // 선의 색깔입니다
            strokeOpacity={0.7} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle={'solid'} // 선의 스타일입니다
          />
        )}
      </Map>
    </div >
  );
}

export default MyMap;
