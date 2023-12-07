import React, { useState } from 'react';
import styled from 'styled-components';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/firebase.config';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import axios from 'axios';
function Signup() {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    email:'',
    password:'',
    nickname:'',
    avator:'',
  })
  
  const inputEmailHandler = (e) => {
    setUserInfo((prev) => ({...prev, email:e.target.value}))
  }

  const inputPasswordHandler = (e) => {
    setUserInfo((prev) => ({...prev, password:e.target.value}))
  }

  const inputNicknameHandler = (e) => {
    setUserInfo((prev) => ({...prev, nickname:e.target.value}))
  }

  const loginPageHandler = () => {
    navigate('/login')
  }

  const signUp = async (e) => {
    e.preventDefault();

    try {
      const {email, password, nickname, avator } = userInfo
      // Firebase Authentication에 회원가입
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Firebase Firestore에 사용자 정보 추가
      const user = userCredential.user;

      const userDocRef = await addDoc(collection(db, 'users'), {
        email: user.email,
        nickname,
        avator,
      });

      //사용할 일이 있나????
      localStorage.setItem('accessToken', user.accessToken)
      const accessToken = localStorage.getItem('accessToken')

      console.log('User added to Firestore with ID: ', userDocRef.id);

      // 회원가입 성공 시 메인 페이지로 이동
      navigate('/');
    } catch (error) {
      console.error(error);
    }

    // try {
    //   await axios.post('https://moneyfulpublicpolicy.co.kr/register', {
    //     id,
    //     nickname,
    //     avator,
    //     accessToken
    //   })
    // }
  };

  return (
    <>
      <form>
        <p>회원가입</p>
        <div>
          <label htmlFor='email'>Email</label>
          <SignupInput id='email' type='email' value={userInfo.email}
            onChange={inputEmailHandler}
            placeholder="이메일을 작성해주세요"
          />
          <label htmlFor='password'>Password</label>
          <SignupInput id='password' value={userInfo.password}
            onChange={inputPasswordHandler}
            placeholder="암호를 작성해주세요(최소6자)"
          />
          <label htmlFor='nickname'>Nickname</label>
          <ImgeInput id='nickname'
            onChange={inputNicknameHandler}
            placeholder="닉네임을 작성해주세요"
          />
        </div>
        <div>
          <SignupButton onClick={signUp}>가입하기</SignupButton>
          <SignupButton onClick={loginPageHandler}>로그인</SignupButton>
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
