import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function DetailPages() {
  //myLocation 상태 변동되게 useState로 관리
  const [myLocation, setMyLocation] = useState('');
  //지도를 나타내는 DOM요소에 대한 참조
  const mapRef = useRef(null);
  //naver window에서 가져옴
  const { naver } = window;

  useEffect(() => {
    //mapRef와 naver가 존
    if (!mapRef.current || !naver) return;

    const mapOptions = {
      center: new naver.maps.LatLng(37.3595704, 127.105399),
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT
      }
    };

    const map = new naver.maps.Map('map', {
      ...mapOptions
    });

    const markerPosition = new naver.maps.LatLng(37.3595704, 127.105399);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }

    new naver.maps.Marker({
      position: markerPosition,
      title: 'hi',
      map
    });

    // 위치추적에 성공했을때 위치 값을 넣어줍니다.
    function success(position) {
      setMyLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    }

    // 위치 추적에 실패 했을때 초기값을 넣어줍니다.
    function error() {
      setMyLocation({ latitude: 37.4979517, longitude: 127.0276188 });
    }
  }, []);

  const markerRef = useRef(null);

  return (
    <div>
      <form>
        <div>
          <Link to="">리스트 목록</Link>
        </div>
        <div ref={mapRef} id="map" style={{ width: 400, height: 400 }} />
        <label htmlFor=""></label>
        <input type="text" id="" placeholder="제목을 입력해주세요" />
        <button>등록하기</button>
      </form>
    </div>
  );
}

export default DetailPages;
