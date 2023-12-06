import { signOut } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { auth } from '../firebase';
import { getAuth } from 'firebase/auth';
import Button from 'components/common/Button';
import Avatar from 'components/common/Avartar';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

function Profile() {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user !== null) {
    // The user object has basic properties such as display name, email, etc.
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;
    console.log(email);

    // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
    const uid = user.uid;
  }

  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOut = async (event) => {
    event.preventDefault();
    await signOut(auth);
    navigate('/login');
  };
  useEffect(async () => {
    const query = await getDocs(collection(db, 'users'));
    query.forEach((doc) => {
      console.log(doc.id, doc.data());
    });
  }, []);

  return (
    <Container>
      <ProfileWrapper>
        <h1>프로필</h1>
        <label>
          <Avatar size="large" />
          <input type="file" accept="image/jpg, image/png" />
        </label>
        <div>
          <Nickname> 닉네임 : user.nickname</Nickname>
          <button onClick={() => {}}>수정</button>
        </div>
        <h1>내가 만든 코스</h1>
        <div>
          <div>???</div>
          <div>???</div>
          <div>???</div>
        </div>

        <div>
          <Button text="로그아웃" onClick={logOut}>
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
