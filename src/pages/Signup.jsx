import React, { useState } from 'react';
import styled from 'styled-components';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/firebase.config';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, getDoc, getDocs, query, where } from 'firebase/firestore';

function Signup() {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    email:'',
    password:'',
    nickname:'',
    avator:'',
  })
  const {email, password, nickname, avator} = userInfo;


  const changeUserInfoHandler = (event) => {
    const { name, value } = event.target;
    setUserInfo(prev=>({...prev, [name]:value}));
  }
  
  const onSignupHandler = async (event)=> {
    event.preventDefault();

    //이메일 형식 @ or . 같은거 정규식으로 표현
    const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    const isEmailValid = emailRegEx.test(email);
  
    if(!isEmailValid) {
      //이메일이 유효하지 않은 경우
      alert('유효하지 않은 이메일 형식입니다.');
      return;
    }
    
    //비밀번호 글씨 길이 제한 유효성검사
    const isPasswordValid = password.length >= 6 && password.length <= 15;
  
    if(!isPasswordValid) {
      alert('비밀번호는 6자 이상, 15자 이하로 설정해야 합니다.');
      return;
    }
  
    //닉네임 글씨 제한 유효성검사
    const isNicknameValid = nickname.length >= 1 && nickname.length <= 10;
  
    if (!isNicknameValid) {
      alert('닉네임은 1자 이상, 10자 이하로 설정해야 합니다');
      return;
    }

    //이메일 중복 확인
    const emailQuery = query(collection(db, 'users'), where('email', '==', email));
    const emailSnapshot = await getDocs(emailQuery);

    if (!emailSnapshot.empty) {
      alert('이미 사용 중인 이메일입니다.');
      return;
    }

    //닉네임 중복 확인
    const nicknameQuery = query(collection(db,'users'), where('nickname','==',nickname));
    const nicknameSnapshot = await getDocs(nicknameQuery)

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

      console.log('User added to Firestore with ID: ', userDocRef.id);

      // 회원가입 성공 시 메인 페이지로 이동
      alert('회원가입을 성공하셨습니다')
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  }

  const loginPageHandler = () => {
    navigate('/login')
  }

  return (
    <>
      <form>
        <p>회원가입</p>
        <div>
          <label htmlFor='email'>Email</label>
          <SignupInput type='email' id='email' name='email' value={userInfo.email}
            onChange={changeUserInfoHandler}
            placeholder="이메일을 작성해주세요"
          />
          <label htmlFor='password'>Password</label>
          <SignupInput type='password' id='password' name='password' value={userInfo.password}
            onChange={changeUserInfoHandler}
            placeholder="암호를 작성해주세요 (6~15글자)" minLength={6} maxLength={15}
          />
          <label htmlFor='nickname'>Nickname</label>
          <ImgeInput type='text' id='nickname' name='nickname'
            onChange={changeUserInfoHandler}
            placeholder="닉네임을 작성해주세요 (1~10글자)" minLength={1} maxLength={10}
          />
        </div>
        <div>
          <SignupButton onClick={onSignupHandler}>가입하기</SignupButton>
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
