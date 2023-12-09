import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { auth, db } from '../firebase/firebase.config';
import Button from 'components/common/Button';
import Avatar from 'components/common/Avartar';
// import { collection, getDocs } from '../firebase/firebase.config';
import { signOut, getAuth } from 'firebase/auth';
import { doc, getDocs, collection, query, updateDoc } from 'firebase/firestore';
import { logOut } from '../redux/modules/authSlice';

function Profile() {
  const [editingText, setEditingText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [users, setUsers] = useState([]);
  //const auth = getAuth();
  const navigate = useNavigate();
  const localUid = localStorage.getItem('uid');
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.auth);

  /** 버튼 클릭시 Localstorage에 있는 값이 삭제되며, 다시 로그인 페이지로 간다.*/
  const logOutHandler = async (event) => {
    //await signOut(auth); // TODO : 해야되는지 확인
    navigate('/login');
    dispatch(logOut());
  };

  /** 데이터 가져오기  TODO =>  get Query Client*/
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
    };
    fetchData();
  }, []);

  // 입력받은 값 파이어베이스에 수정하기
  const onEditDoneHandler = async (event) => {
    const user = users.find((user) => user.uid === userInfo.uid);
    const userRef = doc(db, 'users', user.id);
    await updateDoc(userRef, { ...user, nickname: editingText });

    const editedNickname = users.map((user) => {
      if (user.uid === userInfo.uid) {
        return {
          ...user,
          nickname: editingText
        };
      } else {
        return user;
      }
    });
    setUsers(editedNickname);
    setIsEditing(false);
  };

  return (
    <Container>
      <ProfileWrapper>
        <h1>프로필</h1>
        <label>
          <Avatar size="large" />
          <input type="file" accept="image/jpg, image/png" />
        </label>
        <div>
          {isEditing ? (
            <input
              autoFocus
              onChange={(event) => setEditingText(event.target.value)}
            />
          ) : (
            <Nickname>
              {users
                .filter((item) => item.uid === userInfo.uid)
                .map((item) => {
                  return item.nickname;
                })}
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
        <h1>내가 만든 코스</h1>
        <div>
          <div>???</div>
          <div>???</div>
          <div>???</div>
        </div>

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
