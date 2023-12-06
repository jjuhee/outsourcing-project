import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';
import { app, db } from '../firebase';
// import { app } from 'firebase';
import { auth } from '../firebase';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('user', user);
    });
  }, []);

  const onChange = (event) => {
    const {
      target: { name, value }
    } = event;
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
  };

  const signUp = async (event) => {
    event.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('error with signUp', errorCode, errorMessage);
      // ..
    }
  };

  // 파이어베이스에 있는 로그인 정보와 동일하다면 "로그인이 되었습니다!!!" 그렇지 않다면
  // 아이디와 비밀번호를 다시 확인해주세요" 가 나온다.

  const signIn = async (event) => {
    event.preventDefault();
    if (email === '') {
      return alert('이메일을 입력해주세요');
    }
    if (password === '') {
      return alert('비밀번호를 입력해주세요');
    }
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log('user with signIn', userCredential.user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('error with signIn', errorCode, errorMessage);
      return alert('비밀번호 또는 이메일을 확인해주세요');
    }
    navigate('/profile');
  };

  return (
    <div className="App">
      <h2>로그인 페이지</h2>
      <form>
        <div>
          <label>이메일 : </label>
          <input
            type="email"
            value={email}
            name="email"
            onChange={onChange}
            required
          ></input>
        </div>
        <div>
          <label>비밀번호 : </label>
          <input
            type="password"
            value={password}
            name="password"
            onChange={onChange}
            required
          ></input>
        </div>
        <div>
          <label>닉네임 : </label>
          <input
            value={nickname}
            name="nickname"
            onChange={onChange}
            required
          ></input>
        </div>
        <button onClick={signUp}>회원가입</button>
        <button onClick={signIn}>로그인</button>
      </form>
    </div>
  );
};

export default Login;
