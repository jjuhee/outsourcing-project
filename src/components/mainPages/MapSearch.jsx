import React, { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import styled from 'styled-components';

function MapSearch() {
  const [inputTitle, setInputTitle] = useState('');
  const [localList, setLocalList] = useState(null);

  const [info, setInfo] = useState('');
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState(null);
  const { kakao } = window;

  const searchPlaceHandler = async (e) => {
    e.preventDefault();
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(inputTitle, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        console.log(data);
        setLocalList(data); // TODO : firebase + react query 로 옮기기

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
      }
    });
  };

  const inputTitleHandler = (e) => {
    setInputTitle(e.target.value);
  };

  return (
    <StMapSearch>
      <Map // 로드뷰를 표시할 Container
        center={{
          lat: 37.566826,
          lng: 126.9786567
        }}
        style={{
          width: '440px',
          height: '440px'
        }}
        level={3}
        onCreate={setMap}
      >
        {markers.map((marker) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
            onClick={() => setInfo(marker)}
          >
            {info && info.content === marker.content && (
              <div style={{ color: '#000' }}>{marker.content}</div>
            )}
          </MapMarker>
        ))}
      </Map>

      <StSearchBox>
        <form onSubmit={searchPlaceHandler}>
          <input
            type="text"
            placeholder="장소를 입력해주세요"
            value={inputTitle}
            onChange={inputTitleHandler}
          />
          <button type="submit">검색</button>
        </form>

        <StListArea>
          {localList ? (
            localList.map((item, index) => {
              return (
                <StArea key={index}>
                  <StTitle>{item.place_name}</StTitle>
                  <StP>{item.road_address_name}</StP>
                  <StP>{item.phone}</StP>
                  <StUrl>{item.place_url}</StUrl>
                </StArea>
              );
            })
          ) : (
            <p>검색을 해주세요</p>
          )}
        </StListArea>
      </StSearchBox>
    </StMapSearch>
  );
}

export default MapSearch;

const StMapSearch = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

const StSearchBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  & input {
  }
  & button {
    border-radius: 10px;
    margin: 10px auto;
  }
`;

const StListArea = styled.div`
  overflow-y: scroll;
  font-size: 0.9rem;
  width: 250px;
  height: 400px;
  border: 1px solid black;
`;

const StArea = styled.div`
  padding: 5px;
  height: 67px;
  border-bottom: 1px solid black;
  & p {
    margin-bottom: 2px;
  }
`;

const StTitle = styled.div`
  font-weight: 600;
  margin-bottom: 7px;
`;

const StP = styled.p`
  font-size: 0.7rem;
`;

const StUrl = styled.p`
  font-size: 0.6rem;
  color: gray;
`;
