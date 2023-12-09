import React, { useState } from 'react';
import styled from 'styled-components';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { logIn } from '../redux/modules/authSlice';
import { Link } from 'react-router-dom';

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
      dispatch(logIn({ uid: user.uid, nickname: user.nickname }));
      alert('로그인 성공!');
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
    <StyledLogin>
      <StyledImg>
        <p>Couple The Place</p>
      </StyledImg>
      <StyledForm>
        <p>Log in</p>
        <div>
          <LoginInput
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
          />
          <LoginInput
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
          />
        </div>

        <LoginButton onClick={signIn}>로그인</LoginButton>
        <GotoPasswordPage to="/signup">회원가입페이지</GotoPasswordPage>
      </StyledForm>
    </StyledLogin>
  );
}

export default Login;

const StyledLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--login-signup-background-color);
`;

const StyledImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('/loginPage.jpg');
  background-size: cover;
  background-position: center bottom -20px;
  width: 500px;
  height: 500px;
  font-size: 45px;
  p {
    padding-top: 250px;
  }
`;

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  width: 500px;
  height: 500px;
  background-color: var(--login-signup-input-background-color);
  p {
    font-size: 40px;
    padding: 20px;
    width: 80%;
  }
`;

const LoginInput = styled.input`
  width: 80%;
  border: none;
  padding-bottom: 5px;
  border-bottom: 1px solid var(--login-signup-input-bottom);
  margin-top: 20px;
  background-color: transparent;
`;

const LoginButton = styled.button`
  width: 10vw;
  height: 4vh;
  border-radius: 50px;
  background-color: var(--login-signup-button);
  cursor: pointer;
  width: 40%;
  margin-top: 20px;
  align-self: center;
  transition: background-color 0.3s;
  &:hover {
    background-color: var(--login-signup-button-transition);
  }
  border: 1px solid var(--login-signup-button-border);
`;

const GotoPasswordPage = styled(Link)`
  background: none;
  border: none;
  margin-top: 20px;
  cursor: pointer;
  text-decoration: underline;
`;
