import React, { useState } from 'react';
import styled from 'styled-components';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../firebase/firebase.config';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function Signup() {
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    nickname: '',
    uid: '',
    avatar: ''
  });

  const { email, password, nickname, avatar } = userInfo;

  const changeUserInfoHandler = (event) => {
    const { name, value } = event.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const onSignupHandler = async (event) => {
    event.preventDefault();

    //이메일 형식 @ or . 같은거 정규식으로 표현
    const emailRegEx =
      /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    const isEmailValid = emailRegEx.test(email);

    if (!isEmailValid) {
      //이메일이 유효하지 않은 경우
      alert('유효하지 않은 이메일 형식입니다.');
      return;
    }

    //비밀번호 글씨 길이 제한 유효성검사
    const isPasswordValid = password.length >= 6 && password.length <= 15;

    if (!isPasswordValid) {
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
    const emailQuery = query(
      collection(db, 'users'),
      where('email', '==', email)
    );
    const emailSnapshot = await getDocs(emailQuery);

    if (!emailSnapshot.empty) {
      alert('이미 사용 중인 이메일입니다.');
      return;
    }

    //닉네임 중복 확인
    const nicknameQuery = query(
      collection(db, 'users'),
      where('nickname', '==', nickname)
    );

    const nicknameSnapshot = await getDocs(nicknameQuery);

    if (!nicknameSnapshot.empty) {
      alert('이미 사용 중인 닉네임입니다.');
      return;
    }

    try {
      const { email, password, nickname, avatar } = userInfo;

      // Firebase Authentication에 회원가입
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Firebase Firestore에 사용자 정보 추가
      const user = userCredential.user;

      let downloadURL;

      // 이미지를 Storage에 업로드
      if (selectedFile) {
        const imageRef = ref(
          storage,
          `profileImages/${user.uid}/${selectedFile.name}`
        );

        await uploadBytes(imageRef, selectedFile);
        downloadURL = await getDownloadURL(imageRef);

        // 사용자 정보에 프로필 이미지 URL 추가
        await updateProfile(user, {
          photoURL: downloadURL
        });
      }

      // Firestore에 사용자 정보 추가
      const userDocRef = await addDoc(collection(db, 'users'), {
        uid: user.uid,
        email: user.email,
        nickname,
        avatar: downloadURL
      });

      console.log('User added to Firestore with ID: ', userDocRef.id);

      // 회원가입 성공 시 메인 페이지로 이동
      alert('회원가입을 성공하셨습니다');
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileSelect = (event) => {
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

  const loginPageHandler = () => {
    navigate('/login');
  };

  return (
    <>
      <form>
        <p>회원가입</p>
        <div>
          <label htmlFor="email">Email</label>
          <SignupInput
            type="email"
            id="email"
            name="email"
            value={userInfo.email}
            onChange={changeUserInfoHandler}
            placeholder="이메일을 작성해주세요"
          />
          <label htmlFor="password">Password</label>
          <SignupInput
            type="password"
            id="password"
            name="password"
            value={userInfo.password}
            onChange={changeUserInfoHandler}
            placeholder="암호를 작성해주세요 (6~15글자)"
            minLength={6}
            maxLength={15}
          />
          <label htmlFor="nickname">Nickname</label>
          <SignupInput
            type="text"
            id="nickname"
            name="nickname"
            value={userInfo.nickname}
            onChange={changeUserInfoHandler}
            placeholder="닉네임을 작성해주세요 (1~10글자)"
            minLength={1}
            maxLength={10}
          />
          <SignupProfileImg htmlFor="profileImg">
            프로필 이미지 업로드
          </SignupProfileImg>
          {previewURL && (
            <ImagePreview src={previewURL} alt="프로필 이미지 미리보기" />
          )}
          <ImgeInput
            type="file"
            accept="image/*"
            id="profileImg"
            onChange={handleFileSelect}
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
`;

const SignupButton = styled.button`
  width: 10vw;
  height: 5vh;
  border-radius: 2px;
`;

const ImgeInput = styled.input`
  background-color: #ffe7cf;
  width: 100%;
  display: none;
`;

const SignupProfileImg = styled.label`
  margin: 5px 0 20px 0;
  font-weight: bold;
  font-size: 13px;
  color: #0095f6;
  display: inline-block;
  cursor: pointer;
`;

const ImagePreview = styled.img`
  width: 100%;
  max-height: 200px;
`;
