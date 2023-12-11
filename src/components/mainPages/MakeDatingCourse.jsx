import React, { useState } from 'react';
import dayjs from 'dayjs';
import styled, { keyframes } from 'styled-components';
import { QueryClient, useMutation } from 'react-query';
import { addDatingCourse } from 'api/course';
import { useSelector } from 'react-redux';

function MakeDatingCourse({ selectedPlaces, setSelectedPlaces }) {
  const [courseTitle, setCourseTitle] = useState('');

  const { uid, nickname, avatar } = useSelector((state) => state.auth);

  const TODAY = dayjs().format('YY-MM-DD HH:mm:ss');

  const queryClient = new QueryClient();
  const mutation = useMutation(addDatingCourse, {
    onSuccess: () => {
      // Invalidate and refresh
      console.log('onSuccess');
      queryClient.invalidateQueries('course');
      console.log('코스가 등록되었습니다!');
    }
  });

  const onTitleChange = (e) => {
    setCourseTitle(e.target.value);
  };

  const clickDeleteCourseHandler = (id) => {
    console.log('jhh:', id, '11:', selectedPlaces);
    const newPlaces = selectedPlaces.filter((slectedPlace) => {
      return slectedPlace.id !== id;
    });
    console.log('new', newPlaces);
    setSelectedPlaces(newPlaces);
  };
  const onClickCourseSaveButtonHandler = async (e) => {
    e.preventDefault();

    if (courseTitle.trim() === '') {
      alert('제목을 입력해주세요!');
      return false;
    }
    mutation.mutate({
      userUid: uid,
      userNickname: nickname,
      userAvatar: avatar,
      courseTitle: courseTitle,
      places: selectedPlaces,
      createAt: TODAY,
    });

    setSelectedPlaces([]);
    setCourseTitle('');

    console.log('등록되었습니다');
  };

  return (
    <>
      <StyledDateCourseWrapper>
        <StyledDateTitle>데이트코스 등록 💟</StyledDateTitle>
        <div>
          {selectedPlaces.map((place) => {
            return (
              <StyledDatingListContainer key={place.id}>
                <span>{place.place_name}</span>
                <p>{place.category_name}</p>
                <p>{place.phone ? place.phone : ''}</p>
                <p>{place.place_url}</p>
                <button onClick={() => clickDeleteCourseHandler(place.id)}>
                  코스에서 삭제
                </button>
              </StyledDatingListContainer>
            );
          })}
        </div>

        <StyledDateForm onSubmit={onClickCourseSaveButtonHandler}>
          <label htmlFor="courseTitle"></label>
          <input
            type="text"
            id="courseTitle"
            value={courseTitle}
            onChange={onTitleChange}
            placeholder="코스 이름을 입력해주세요"
          />
          <StyledCourseSaveButton type="submit">저장</StyledCourseSaveButton>
        </StyledDateForm>
      </StyledDateCourseWrapper>
    </>
  );
}

export default MakeDatingCourse;

const StyledDateCourseWrapper = styled.div`
  background-image: url(/dateCourseContainer.png);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 460px;
  border: none;
  height: 700px;
`;

const shakeAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(5px);
  }
  75% {
    transform: translateX(-3px);
  }
  100% {
    transform: translateX(3px);
  }
`;

const jeilyAnimation = keyframes`
  25% {
    transform: scale(0.9, 1.1);
  }

  50% {
    transform: scale(1.1, 0.9);
  }

  75% {
    transform: scale(0.95, 1.05);
  }
  `;

const StyledDateTitle = styled.div`
  display: flex;
  justify-content: center;
  font-size: 30px;
  margin-top: 110px;
  color: var(--date-course-title);
  animation: ${shakeAnimation} 1.4s ease infinite;
`;

const StyledDatingListContainer = styled.div`
  margin-left: 35px;
  margin-top: 25px;
  margin-bottom: 70px;
  //파일첨부 구현되면 수정해야함
  height: 70px;
  border-radius: 10px;
  & span {
    font-size: 1.1rem;
    font-weight: 600;
  }
  & p {
    font-size: 1rem;
    margin-top: 10px;
  }
  button {
    margin-left: 240px;
    background-image: url(/addCourseButton.png);
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    width: 112px;
    height: 60px;
    color: var(--white);
    &:hover {
      animation: ${jeilyAnimation} 0.5s;
    }
  }
`;

const StyledDateForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  margin-left: 15px;
  margin-bottom: 20px;
  input {
    font-size: 23px;
    text-align: center;
    width: 300px;
    height: 35px;
    border: 1.5px solid black;
    border-radius: 50px;
    background-color: var(--search-input-background-color);
  }
`;

const StyledCourseSaveButton = styled.button`
  margin-right: 33px;
  font-size: 20px;
  background-image: url(/addCourseButton.png);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 115px;
  height: 70px;
  &:hover {
    animation: ${jeilyAnimation} 0.5s;
  }
`;