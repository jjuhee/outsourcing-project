import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { logIn } from '../redux/modules/authSlice';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async (event) => {
    event.preventDefault();

    try {
      const userCredintial = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredintial.user;
      dispatch(logIn({ uid: user.uid }));
      navigate('/');
    } catch (error) {
      let errorMessage = '에러가 발생했습니다.';

      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = '잘못된 이메일 형식입니다.';
          break;
        case 'auth/invalid-credential':
          errorMessage = '이메일 혹은 비밀번호가 일치하지 않습니다.';
          break;
        default:
          errorMessage = '로그인에 실패하였습니다.';
          break;
      }

      alert(errorMessage);
      console.log('error', error);
    }
  };

  return (
    <>
      <form>
        <p>로그인</p>
        <div>
          <LoginInput
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="아이디를 작성해주세요"
          />
          <LoginInput
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="암호를 작성해주세요"
          />
        </div>
        <div>
          <LoginButton onClick={signIn}>로그인</LoginButton>
          <LoginButton
            onClick={() => {
              navigate('/signup');
            }}
          >
            회원가입페이지
          </LoginButton>
        </div>
      </form>
    </>
  );
}

export default Login;

const LoginInput = styled.input`
  background-color: #ffe7cf;
  width: 100%;
  /* outline: none; */
  /* border: none;
  border-radius: 0.5rem; */
`;
const LoginButton = styled.button`
  /* background-color: gray; */
  width: 10vw;
  height: 5vh;
  border-radius: 2px;
`;
