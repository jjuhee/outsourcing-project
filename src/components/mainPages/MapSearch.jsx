import React, { useState } from 'react';
import styled from 'styled-components';
import MakeDatingCourse from './MakeDatingCourse';
import MyMap from './MyMap';

function MapSearch() {
  const [inputTitle, setInputTitle] = useState('');
  const [places, setPlaces] = useState([]);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [prevPlace, setPrevPlace] = useState({});
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState(null);
  const { kakao } = window;

  const searchPlaceHandler = async (e) => {
    e.preventDefault();
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(inputTitle, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        console.log(data);
        setPlaces(data); // TODO : firebase + react query 로 옮기기

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

  const clickAddCourseHandler = (place) => {
    setPrevPlace(place);

    if (selectedPlaces.length === 0) {
      setSelectedPlaces((prevselectedPlaces) => {
        return [...prevselectedPlaces, place];
      });
    } else if (selectedPlaces.length < 3) {
      if (prevPlace.id === place.id) {
        alert('중복되었습니다!');
      } else {
        setSelectedPlaces((prevselectedPlaces) => {
          return [...prevselectedPlaces, place];
        });
      }
    } else if (selectedPlaces.length >= 3) {
      alert('3개까지만 담을 수 있습니다!');
    }
  };

  const inputTitleHandler = (e) => {
    setInputTitle(e.target.value);
  };

  return (
    <StyledMapSearchCourseContainer>
      <StyledMapContainer>
        <StyledMap>
          <MyMap markers={markers} setMap={setMap} />
        </StyledMap>
        <StyledPlaceInputButton onSubmit={searchPlaceHandler}>
          <input
            type="text"
            placeholder="장소를 입력해주세요"
            value={inputTitle}
            onChange={inputTitleHandler}
          />
          <button type="submit">🔍</button>
        </StyledPlaceInputButton>
        <StyledSearchContainer>
          {places.map((place) => {
            return (
              <StyledDateCourseMaking key={place.id}>
                <StyledTitle>{place.place_name}</StyledTitle>
                <div>{place.road_address_name}</div>
                <div>{place.phone}</div>
                {/* <StUrl href={place.place_url}>{place.place_url}</StUrl> */}
                <button onClick={() => clickAddCourseHandler(place)}>
                  코스로 추가
                </button>
              </StyledDateCourseMaking>
            );
          })}
        </StyledSearchContainer>
      </StyledMapContainer>
      <ArrowImg />
      <MakeDatingCourse selectedPlaces={selectedPlaces} setSelectedPlaces={setSelectedPlaces} />
    </StyledMapSearchCourseContainer>
  );
}

export default MapSearch;

const StyledMapSearchCourseContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledMapContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  background-image: url('/map.jpg');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  height: 700px;
  width: 600px;
`;

const StyledMap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 60px;
  margin-right: 17.5px;
  margin-bottom: 116px;
`;

const StyledPlaceInputButton = styled.form`
  display: flex;
  align-items: center;
  margin-left: 139px;
  input {
    width: 250px;
    height: 25px;
    font-size: 20px;
    text-align: center;
    margin-right: 20px;
    border: 1.5px solid black;
    border-radius: 50px;
    background-color: var(--search-input-background-color);
  }
  button {
    width: 35px;
    height: 35px;
    font-size: 20px;
    background-color: var(--search-button);
    border-radius: 50%;
    text-align: center;
    padding-left: 3px;
    cursor: pointer;
  }
`;

const StyledSearchContainer = styled.div`
  height: 350px;
  width: 490px;
  max-height: 180px;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
`;

const StyledDateCourseMaking = styled.div`
  font-size: 18px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 330px;
  padding-bottom: 20px;
  margin-top: 10px;
  margin-left: 139px;
  line-height: 1.3;
  div {
    display: flex;
    margin-bottom: 4px;
  }
  button {
    margin-left: 190px;
  }
`;

const StyledTitle = styled.div`
  font-weight: bold;
`;

const ArrowImg = styled.img`
  background-image: url('/arrow.png');
  background-size: cover;
  background-position: center;
  width: 90px;
  height: 110px;
  border-radius: 50px;
  margin-right: 30px;
`;
