import { db } from '../../firebase/firebase.config';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function CompletedDatingCourse() {
  const navigate = useNavigate();
  const [isSearch, setIsSearch] = useState(false);
  const [courseList, setCourseList] = useState([]);

  const naverHandler = () => {
    navigate('/detail');
    // const naverMapURL = `https://map.naver.com/p`;
    // window.open(naverMapURL);
  };

  const getCourseSnapshot = async () => {
    // 배열안에 요소가 두번씩 출려돼서 빈배열로 초기화
    setCourseList([]);

    const courseSnapshot = await getDocs(
      query(collection(db, 'datingCourse'), orderBy('createAt', 'desc'))
    );
    courseSnapshot.forEach((place) => {
      setCourseList((prevPlace) => [...prevPlace, place]);
    });
  };

  useEffect(() => {
    getCourseSnapshot();
  }, []);

  return (
    <StyledPlace>
      <span>데이트 추천 코스</span>
      {courseList.map((place) => {
        return (
          <div style={{ border: '2px solid black' }}>
            <p>코스명: {place.data().courseTitle}</p>
            <p>작성날짜: {place.data().createAt}</p>
            <StCourseWrapper>
              {place.data().place.map((item) => {
                return (
                  <StUl key={item.id}>
                    <StLi>장소이름: {item.place_name}</StLi>
                    <StLi>카테고리: {item.category_name}</StLi>
                    <StLi>주소: {item.address_name}</StLi>
                  </StUl>
                );
              })}
              <button onClick={naverHandler}>상세보기</button>
            </StCourseWrapper>
          </div>
        );
      })}
    </StyledPlace>
  );
}

export default CompletedDatingCourse;

const StyledPlace = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & span {
    font-size: 40px;
  }
`;

const StCourseWrapper = styled.div``;

const StUl = styled.ul`
  border: 2px solid yellow;
`;

const StLi = styled.li``;
