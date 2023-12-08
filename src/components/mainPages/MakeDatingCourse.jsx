import React, { useState } from 'react';
import { auth, storage } from '../../firebase/firebase.config';
import uuid4 from 'uuid4';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { QueryClient, useMutation } from 'react-query';
import { addDatingCourse } from 'api/course';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function MakeDatingCourse({ selectedPlaces }) {
  // 사진 업로드 상태
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFileNames, setSelectedFileNames] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif'];
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

  // 이미지 파일 선택
  const handleFileSelect = (event) => {
    const files = event.target.files;
    const fileArray = [];
    const fileNameArray = [];
    const previewUrlArray = [];

    for (let i = 0; i < files.length && i < 3; i++) {
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
        <p>장소: {selectedFileNames[index]}</p>
        {previewUrl && <StImagePreview src={previewUrl} alt="File Preview" />}
      </StSelectedFileWrapper>
    ));
  };

  const onClickCourseSaveButtonHandler = async (e) => {
    e.preventDefault();

    const uploadImageAndGetURL = async () => {
      if (selectedFiles) {
        const storageRef = ref(storage, 'placeImages/' + selectedFiles.name);
        await uploadBytes(storageRef, selectedFiles); // 파일 업로드
        const url = await getDownloadURL(storageRef); // 파일 url 가져오기
        setImageUrl(url);
        return url;
      } else {
        return '';
      }
    };

    if (courseTitle.trim() === '') {
      alert('제목을 입력해주세요!');
      return false;
    }

    let imageUrl = '';
    if (selectedFiles) {
      imageUrl = await uploadImageAndGetURL();
    }

    mutation.mutate({
      // 현재 임시로 uuid 랜덤 생성 -> 유저 가입 uid로 바꿔놓기
      userUid: uuid,
      courseTitle: courseTitle,
      place: selectedPlaces,
      createAt: TODAY,
      imgUrl: imageUrl
    });

    if (mutation.isSuccess) alert('코스가 등록되었습니다!');
  };

  const onTitleChange = (e) => {
    setCourseTitle(e.target.value);
  };

  return (
    <>
      <StDateTitle>데이트코스</StDateTitle>
      <StDateCourseWrapper>
        {selectedPlaces.map((place) => {
          return (
            <StDatingListContainer key={place.id}>
              <li>
                <span>{place.place_name}</span>
              </li>
              <li>{place.category_name}</li>
              <li>{place.phone ? place.phone : ''}</li>
              <li>{place.place_url}</li>
            </StDatingListContainer>
          );
        })}

        <StFileWrapper>
          <label htmlFor="file-upload" className="custom-file-upload">
            장소1: 파일 첨부
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
            multiple
          />
          {selectedFileNames && (
            <StSelectedFileWrapper>
              {/* <p>선택한 파일: {selectedFileNames}</p> */}
              {previewUrls.length > 0 && renderSelectedFilePreviews()}
            </StSelectedFileWrapper>
          )}
        </StFileWrapper>

        <StDateForm onSubmit={onClickCourseSaveButtonHandler}>
          <label htmlFor="courseTitle"></label>
          <input
            type="text"
            id="courseTitle"
            value={courseTitle}
            onChange={onTitleChange}
            placeholder="코스이름을 입력해주세요"
          />
          <StCourseSaveButton type="submit">저장</StCourseSaveButton>
        </StDateForm>
      </StDateCourseWrapper>
    </>
  );
}

export default MakeDatingCourse;

const StDateTitle = styled.div`
  height: 25px;
`;
const StDateCourseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 0.9rem;
  width: 250px;
  height: 400px;
  border: 1px solid black;
`;

const StDatingListContainer = styled.ul`
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

const StDateForm = styled.form`
  margin-top: auto;
  margin-bottom: 20px;
`;

const StCourseSaveButton = styled.button``;

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

const StFileWrapper = styled.div`
  margin-left: 2.5vh;
  margin-top: 1vh;
  text-align: start;
  .custom-file-upload {
    background-color: var(--mainOrange);
    border: 2px solid var(--mainOrange);
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
    border-radius: 0.5vh;
    transition: background-color 0.3s ease;
  }
  .custom-file-upload:hover {
    background-color: transparent;
  }
`;
