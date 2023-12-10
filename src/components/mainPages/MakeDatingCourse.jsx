import React, { useState } from 'react';
import { storage } from '../../firebase/firebase.config';
import uuid4 from 'uuid4';
import dayjs from 'dayjs';
import styled, { keyframes } from 'styled-components';
import { QueryClient, useMutation } from 'react-query';
import { addDatingCourse } from 'api/course';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useSelector } from 'react-redux';

function MakeDatingCourse({ selectedPlaces, setSelectedPlaces }) {
  // 사진 업로드 상태
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFileNames, setSelectedFileNames] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif'];
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

  // 이미지 파일 선택
  const handleFileSelect = (event) => {
    const files = event.target.files;
    const fileArray = [];
    const fileNameArray = [];
    const previewUrlArray = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (allowedFileTypes.includes(file.type)) {
        fileArray.push(file);
        fileNameArray.push(file.name);

        const reader = new FileReader();
        reader.onload = () => {
          previewUrlArray.push(reader.result);
          if (previewUrlArray.length === files.length) {
            setPreviewUrls([...previewUrls, ...previewUrlArray]);
          }
        };
        reader.readAsDataURL(file);
      } else {
        alert(
          '이 파일 형식은 허용되지 않습니다. JPG, PNG, GIF 파일을 선택해주세요.'
        );
        event.target.value = null;
      }
    }

    setSelectedFiles([...selectedFiles, ...fileArray]);
    setSelectedFileNames([...selectedFileNames, ...fileNameArray]);
  };

  const renderSelectedFilePreviews = () => {
    return previewUrls.map((previewUrl, index) => (
      <StSelectedFileWrapper key={index}>
        <p>
          장소{index + 1}: {selectedFileNames[index]}
        </p>
        {previewUrl && <StImagePreview src={previewUrl} alt="File Preview" />}
      </StSelectedFileWrapper>
    ));
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
    const uploadImagesAndGetURLs = async () => {
      if (selectedFiles) {
        const urls = [];
        for (let i = 0; i < selectedFiles.length; i++) {
          const storageRef = ref(
            storage,
            'placeImages/' + selectedFiles[i].name
          );

          await uploadBytes(storageRef, selectedFiles[i]); // 파일 업로드
          const url = await getDownloadURL(storageRef); // 파일 url 가져오기
          urls.push(url);
        }
        return urls;
      } else {
        return [];
      }
    };

    let imageUrls = [];
    if (selectedFiles) {
      imageUrls = await uploadImagesAndGetURLs();
    }
    mutation.mutate({
      userUid: uid,
      userNickname: nickname,
      userAvatar: avatar,
      courseTitle: courseTitle,
      places: selectedPlaces,
      createAt: TODAY,
      imageUrls
    });

    //if (mutation.isSuccess) alert('코스가 등록되었습니다!');
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

        {/* <StyledFileWrapper> */}
        {/* <label htmlFor="file-upload" className="custom-file-upload">
            장소: 파일 첨부
          </label> */}
        <StyledInput
          id="file-upload"
          type="file"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
          multiple
        />
        {selectedFileNames && (
          <StSelectedFileWrapper>
            {previewUrls.length > 0 && renderSelectedFilePreviews()}
          </StSelectedFileWrapper>
        )}
        {/* </StyledFileWrapper> */}

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

// const StyledFileWrapper = styled.form`
//   input {
//     margin-left: 50px;
//   }
//   .custom-file-upload {
//     background-color: var(--mainOrange);
//     border: 2px solid var(--mainOrange);
//     display: inline-block;
//     padding: 6px 12px;
//     cursor: pointer;
//     border-radius: 0.5vh;
//     transition: background-color 0.3s ease;
//   }
//   .custom-file-upload:hover {
//     background-color: transparent;
//   }
// `;

const StyledInput = styled.input`
  margin-left: 20px;
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

const StSelectedFileWrapper = styled.div`
  margin-top: 1vh;
  text-align: start;
  p {
    font-size: 14px;
    color: #333;
  }
`;

const StImagePreview = styled.img`
  width: auto;
  height: auto;
  margin-top: 10px;
  max-width: 100%;
  max-height: 100%;
`;
