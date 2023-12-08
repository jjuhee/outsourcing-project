import React, { useState } from 'react';
import { auth } from '../../firebase/firebase.config';
import uuid4 from 'uuid4';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { QueryClient, useMutation } from 'react-query';
import { addDatingCourse } from 'api/course';

function MakeDatingCourse({ selectedPlaces }) {
  const [courseTitle, setCourseTitle] = useState('');
  const uuid = uuid4();
  const TODAY = dayjs().format('YY-MM-DD HH:mm:ss');
  const user = auth.currentUser;
  console.log(user);

  const queryClient = new QueryClient();
  const mutation = useMutation(addDatingCourse, {
    onSuccess: () => {
      // Invalidate and refresh
      queryClient.invalidateQueries('course');
    }
  });

  const onClickCourseSaveButtonHandler = async (e) => {
    e.preventDefault();
    if (courseTitle.trim() === '') {
      alert('제목을 입력해주세요!');
      return false;
    }
    mutation.mutate({
      // 현재 임시로 uuid 랜덤 생성 -> 유저 가입 uid로 바꿔놓기
      userUid: uuid,
      courseTitle: courseTitle,
      place: selectedPlaces,
      createAt: TODAY
    });

    if (mutation.isSuccess) alert('코스가 등록되었습니다!');
  };

  const onTitleChange = (e) => {
    setCourseTitle(e.target.value);
  };

  return (
    <div>
      <StTitle>데이트코스</StTitle>
      <StDateCourseBox>
        {selectedPlaces.map((place) => {
          return (
            <StUl key={place.id}>
              <li>
                <span>{place.place_name}</span>
              </li>
              <li>{place.category_name}</li>
              <li>{place.phone ? place.phone : ''}</li>
              <li>{place.place_url}</li>
            </StUl>
          );
        })}

        <StForm onSubmit={onClickCourseSaveButtonHandler}>
          <label htmlFor="courseTitle"></label>
          <input
            type="text"
            id="courseTitle"
            value={courseTitle}
            onChange={onTitleChange}
            placeholder="코스이름을 입력해주세요"
          />
          <button type="submit">저장</button>
        </StForm>
      </StDateCourseBox>
    </div>
  );
}

export default MakeDatingCourse;

const StTitle = styled.div`
  height: 25px;
`;
const StDateCourseBox = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 0.9rem;
  width: 250px;
  height: 400px;
  border: 1px solid black;
`;

const StUl = styled.ul`
  margin: 5px;
  padding: 5px;
  height: 100px;
  border: 1px solid black;
  border-radius: 10px;
  & span {
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 7px;
  }
  & li {
    font-size: 0.7rem;
  }
`;

const StForm = styled.form`
  margin-top: auto;
  margin-bottom: 20px;
`;
