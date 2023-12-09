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
    <>
      <MyMap markers={markers} setMap={setMap} />
      <StyledMapContainer>
        <StyledMap></StyledMap>
        <StyledSearchBox onSubmit={searchPlaceHandler}>
          <StyledPlaceInputButton>
            <input
              type="text"
              placeholder="장소를 입력해주세요"
              value={inputTitle}
              onChange={inputTitleHandler}
            />
            <button type="submit">🔍</button>
          </StyledPlaceInputButton>
          {places ? (
            places.map((place) => {
              return (
                <div key={place.id}>
                  <div>{place.place_name}</div>
                  <div>{place.road_address_name}</div>
                  <div>{place.phone}</div>
                  <StUrl href={place.place_url}>{place.place_url}</StUrl>
                  <button onClick={() => clickAddCourseHandler(place)}>
                    코스로 추가
                  </button>
                </div>
              );
            })
          ) : (
            <p>검색을 해주세요</p>
          )}
        </StyledSearchBox>
      </StyledMapContainer>
      <MakeDatingCourse selectedPlaces={selectedPlaces} />
    </>
  );
}

export default MapSearch;

const StyledMapContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px auto;
  background-image: url('/map.jpg');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  height: 1330px;
`;

const StyledMap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 115px;
  margin-right: 40px;
  margin-left: 200px;
  width: 300px;
  height: 300px;
  z-index: 10;
`;

const StyledSearchBox = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 50px;
  font-size: 20px;
  & input {
    height: 25px;
    padding: 5px;
    font-size: 0.9rem;
  }
  & form > button {
    border-radius: 10px;
    height: 25px;
  }
`;

const StyledPlaceInputButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 170px;
  input {
    width: 450px;
    height: 40px;
    font-size: 30px;
    text-align: center;
    margin-right: 20px;
    border: 1.5px solid black;
    border-radius: 50px;
    background-color: var(--search-input-background-color);
  }
  button {
    width: 45px;
    height: 45px;
    font-size: 20px;
    background-color: var(--search-button);
    border: none;
    border-radius: 50%;
    cursor: pointer;
  }
`;

// const StArea = styled.div`
//   margin: 5px;
//   padding: 5px;
//   height: 100px;
//   border: 1px solid black;
//   border-radius: 10px;
//   & p {
//     margin-bottom: 2px;
//   }
// `;

// const StTitle = styled.div`
//   font-weight: 600;
//   margin-bottom: 7px;
// `;

// const StP = styled.p`
//   font-size: 0.7rem;
// `;

const StUrl = styled.a`
  font-size: 0.6rem;
  color: #2eaee3;
  margin-bottom: 7px;
`;

const StButton = styled.button``;
