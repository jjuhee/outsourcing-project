import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { db, storage } from '../firebase/firebase.config';
import Button from 'components/common/Button';
import Avatar from 'components/common/Avartar';
// import { collection, getDocs } from '../firebase/firebase.config';
import { signOut, getAuth, updateProfile } from 'firebase/auth';
import { doc, getDocs, collection, query, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { logOut, setUser, setUserAvatar, setUserNickname } from '../redux/modules/authSlice';

function Profile() {
  const userInfo = useSelector((state) => state.auth);
  const [editingText, setEditingText] = useState(userInfo.nickname);
  const [isEditing, setIsEditing] = useState(false);
  const [users, setUsers] = useState([]);
  const auth = getAuth();
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      alert('닉네임을 입력해주세요!')
      return;
    }
    if (editingText.trim() === userInfo.nickname && !selectedFile) {
      alert('변경된 내용이 없습니다!')
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
        {isEditing ?
          <label>
            <Avatar src={previewURL || userInfo.avatar} size="large" />
            <input type="file" accept="image/*" onChange={fileSelectHandler} />
          </label>
          :
          <Avatar src={userInfo.avatar} size="large" />
        }
        <div>
          {isEditing ? (
            <input defaultValue={userInfo.nickname}
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
            <button onClick={() => setIsEditing(true)}>수정하기</button>
          )}
        </div>
        {/* <h1>내가 만든 코스</h1>
        <div>
          <div>???</div>
          <div>???</div>
          <div>???</div>
        </div> */}

        <div>
          <Button text="로그아웃" onClick={logOutHandler}>
            로그아웃
          </Button>
          <Button text="홈으로" onClick={() => navigate('/')}>
            홈으로
          </Button>
        </div>
      </ProfileWrapper>
    </Container>
  );
}

export default Profile;

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileWrapper = styled.section`
  width: 700px;
  border-radius: 12px;
  background-color: lightgoldenrodyellow;
  padding: 80px;
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

const Nickname = styled.span`
  font-size: 24px;
  font-weight: 700;
`;

const UserId = styled.span`
  font-size: 16px;
  color: gray;
`;
