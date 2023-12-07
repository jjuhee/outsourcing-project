import React, { useState } from 'react';
import styled from 'styled-components';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/firebase.config';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [avator, setAvator] = useState(null);
  const navigate = useNavigate();

  const signUp = async (event) => {
    event.preventDefault();

    try {
      // Firebase Authentication에 회원가입
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Firebase Firestore에 사용자 정보 추가
      const user = userCredential.user;
      const userDocRef = await addDoc(collection(db, 'users'), {
        uid: user.uid,
        email: user.email,
        nickname,
        avator: avator
      });

      console.log('User added to Firestore with ID: ', userDocRef.id);

      // 회원가입 성공 시 메인 페이지로 이동
      localStorage.setItem('email', email);
      navigate('/profile');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form>
        <div>
          <SignupInput
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="아이디를 작성해주세요"
          />
          <SignupInput
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="암호를 작성해주세요(최소6자)"
          />
          <ImgeInput
            onChange={(e) => {
              setNickname(e.target.value);
            }}
            placeholder="닉네임을 작성해주세요"
          />
        </div>
        <div>
          <SignupButton onClick={signUp}>가입하기</SignupButton>
        </div>
      </form>
    </>
  );
}

export default Signup;

const SignupInput = styled.input`
  background-color: #ffe7cf;
  width: 100%;
  /* outline: none; */
  /* border: none;
  border-radius: 0.5rem; */
`;
const SignupButton = styled.button`
  /* background-color: gray; */
  width: 10vw;
  height: 5vh;
  border-radius: 2px;
`;
const ImgeInput = styled.input`
  background-color: #ffe7cf;
  width: 100%;
`;
