import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
function Login() {
  const [loginID, setLoginID] = useState('');
  const [loginPw, setLoginPw] = useState('');
  const navigate = useNavigate();
  return (
    <>
      <form>
        <div>
          <LoginInput
            type="email"
            // value={email}
            onChange={(e) => {
              setLoginID(e.target.value);
            }}
            placeholder="아이디를 작성해주세요"
          />
          <LoginInput
            type="password"
            // value={password}
            onChange={(e) => {
              setLoginPw(e.target.value);
            }}
            placeholder="암호를 작성해주세요"
          />
        </div>
        <div>
          <LoginButton
            onClick={() => {
              //파이어베이스연동 로그인
            }}
          >
            로그인
          </LoginButton>
          <LoginButton
            onClick={() => {
              navigate('/signup');
            }}
          >
            회원가입
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
