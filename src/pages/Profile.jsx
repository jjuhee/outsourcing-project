import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { redirect, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { db, storage } from '../firebase/firebase.config';
import Button from 'components/common/Button';
import Avatar from 'components/common/Avartar';
// import { collection, getDocs } from '../firebase/firebase.config';
import { signOut, getAuth, updateProfile } from 'firebase/auth';
import { doc, getDocs, collection, query, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
  logOut,
  setUserAvatar,
  setUserNickname
} from '../redux/modules/authSlice';
import { useQuery } from 'react-query';
import { getDatingCourses } from 'api/course';

function Profile() {
  const userInfo = useSelector((state) => state.auth);
  const [editingText, setEditingText] = useState(userInfo.nickname);
  const [isEditing, setIsEditing] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    isLoading,
    isError,
    data: courseData
  } = useQuery(['course'], getDatingCourses);
  
  const userCourse = courseData?.filter(
    (course) => course.userUid === userInfo.uid
  );

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  /** 버튼 클릭시 Localstorage에 있는 값이 삭제되며, 다시 로그인 페이지로 간다.*/
  const logOutHandler = async (event) => {
    await signOut(auth);
    navigate('/login');
    dispatch(logOut());
  };

  /** 데이터 가져오기  TODO  : 하나만 가져오기*/
  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'users'));
      const querySnapshot = await getDocs(q);
      const initialUsers = [];
      querySnapshot.forEach((doc) => {
        const data = {
          id: doc.id, //
          ...doc.data()
        };
        initialUsers.push(data);
      });

      setUsers(initialUsers);
      //const user = initialUsers.find((user) => user.uid === userInfo.uid);
      //dispatch(us)
    };
    fetchData();
  }, []);

  /** 입력받은 값 파이어베이스에 수정하기 */
  const onEditDoneHandler = async (event) => {
    if (editingText.trim() === '') {
      alert('닉네임을 입력해주세요!');
      return;
    }
    if (editingText.trim() === userInfo.nickname && !selectedFile) {
      alert('변경된 내용이 없습니다!');
      return;
    }

    const user = users.find((user) => user.uid === userInfo.uid);
    const userRef = doc(db, 'users', user.id); // user.id === doc id

    // 파일이 있으면 이미지를 Storage에 업로드
    if (selectedFile) {
      let downloadURL;
      const imageRef = ref(
        storage,
        `profileImages/${user.uid}/${selectedFile.name}`
      );
      await uploadBytes(imageRef, selectedFile);
      downloadURL = await getDownloadURL(imageRef);

      if (downloadURL) {
        // 사용자 정보에 프로필 이미지 URL 업데이트
        await updateProfile(auth.currentUser, {
          photoURL: downloadURL
        });

        // Firestore에 사용자 정보 업데이트
        await updateDoc(userRef, { ...user, avatar: downloadURL });

        // redux 업데이트
        dispatch(setUserAvatar(downloadURL));
        //초기화
        setSelectedFile(null);
      }
    } else {
      // 변경이 있으면 ? 사용자 정보에 닉네임 업데이트
      if (editingText.trim() !== userInfo.nickname) {
        await updateProfile(auth.currentUser, {
          displayName: editingText
        });

        await updateDoc(userRef, { ...user, nickname: editingText });
        dispatch(setUserNickname(editingText));
      }
    }

    // const editedNickname = users.map((user) => {
    //   if (user.uid === userInfo.uid) {
    //     return {
    //       ...user,
    //       nickname: editingText
    //     };
    //   } else {
    //     return user;
    //   }
    // });
    //setUsers(editedNickname);
    setIsEditing(false);
  };

  /** file 선택 */
  const fileSelectHandler = (event) => {
    const file = event.target.files[0];

    // 선택한 파일의 미리보기를 생성
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewURL(e.target.result);
      };
      reader.readAsDataURL(file);
    }

    setSelectedFile(file);
  };

  return (
    <Container>
      <ProfileWrapper>
        <h1>프로필</h1>

        {isEditing ? (
          <label>
            <Avatar src={previewURL || userInfo.avatar} size="large" />
            <input type="file" accept="image/*" onChange={fileSelectHandler} />
          </label>
        ) : (
          <Avatar src={userInfo.avatar} size="large" />
        )}
        
        <div>
          {isEditing ? (
            <input
              defaultValue={userInfo.nickname}
              autoFocus
              onChange={(event) => setEditingText(event.target.value)}
            />
          ) : (
            <Nickname>
              {userInfo.nickname}
              {/* {users
                .filter((item) => item.uid === userInfo.uid)
                .map((item) => {
                  return item.nickname;
                })} */}
            </Nickname>
          )}

          {isEditing ? (
            <div>
              <button onClick={() => setIsEditing(false)}> 취소 </button>
              <button onClick={onEditDoneHandler}>수정완료</button>
            </div>
          ) : (
            <NickNameEditButton onClick={() => setIsEditing(true)}>
              수정하기
            </NickNameEditButton>
          )}
        </div>

        <StCourseWrapper>
          <StCourseTitle>내가 만든 코스</StCourseTitle>
          <StCourseContainer>
            {userCourse?.map((course) => {
              return (
                <StCourseList key={course.courseUid}>
                  <li>{course.courseTitle}</li>
                  <li>{course.createAt}</li>
                  {course.places?.map((place) => {
                    return (
                      <StPlaceList key={place.id}>
                        <li>{place.place_name}</li>
                        <li>{place.category_group_name}</li>
                        <li>{place.address_name}</li>
                        <li>{place.phone}</li>
                      </StPlaceList>
                    );
                  })}
                </StCourseList>
              );
            })}
          </StCourseContainer>
        </StCourseWrapper>

        <BottomButtonsWrapper>
          <LogoutButton text="로그아웃" onClick={logOutHandler}>
            로그아웃
          </LogoutButton>
          <HomeButton text="홈으로" onClick={() => navigate('/')}>
            홈으로
          </HomeButton>
        </BottomButtonsWrapper>
      </ProfileWrapper>
    </Container>
  );
}

export default Profile;

//전체 배경색
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: var(--login-signup-background-color);
`;
//프로필란 배경색
const ProfileWrapper = styled.section`
  width: 50vw;
  height: 80vh;
  border-radius: 12px;
  background-color: var(--login-signup-input-background-color);
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  & > label > input {
    display: none;
  }

  & input {
    height: 24px;
    outline: none;
    padding: 6px 12px;
  }

  & h1 {
    font-size: 36px;
    font-weight: 700;
    margin: 20px;
  }

  & div {
    display: flex;
    gap: 24px;
  }
`;
//닉네임수정하기 버튼
const NickNameEditButton = styled.button`
  width: 15vw;
  height: 3vh;
  border-radius: 50px;
  background-color: var(--login-signup-button);
  cursor: pointer;
  width: 6vw;
  align-self: center;
  transition: background-color 0.3s;
  &:hover {
    background-color: var(--login-signup-button-transition);
  }
  border: 1px solid var(--login-signup-button-border);
`;
const Nickname = styled.span`
  font-size: 24px;
  font-weight: 700;
`;
const UserId = styled.span`
  font-size: 16px;
  color: gray;
`;
const StCourseWrapper = styled.div``;
const StCourseTitle = styled.h3``;
const StCourseContainer = styled.div``;
const StCourseList = styled.ul``;
const StPlaceList = styled.ul``;
//로그아웃 버튼
const LogoutButton = styled.button`
  margin-right: 20%;
  height: 4vh;
  border-radius: 50px;
  background-color: var(--login-signup-button);
  cursor: pointer;
  width: 15vw;
  margin-top: 20px;
  align-self: center;
  transition: background-color 0.3s;
  &:hover {
    background-color: var(--login-signup-button-transition);
  }
  border: 1px solid var(--login-signup-button-border);
`;
//홈으로버튼
const HomeButton = styled.button`
  margin-right: 0%;
  height: 4vh;
  border-radius: 50px;
  background-color: var(--login-signup-button);
  cursor: pointer;
  width: 15vw;
  margin-top: 20px;
  align-self: center;
  transition: background-color 0.3s;
  &:hover {
    background-color: var(--login-signup-button-transition);
  }
  border: 1px solid var(--login-signup-button-border);
`;
const BottomButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 18%;
`;