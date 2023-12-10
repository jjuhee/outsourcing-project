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
    uid: ''
  });

  const { email, password, nickname } = userInfo;

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

  const fileSelectHandler = (event) => {
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
    <StyledSignUp>
      <StyledImg>
        <p>Couple The Place</p>
      </StyledImg>
      <StyledForm>
        <p>Sign up</p>
        <div>
          <SignupInput
            type="email"
            id="email"
            name="email"
            value={userInfo.email}
            onChange={changeUserInfoHandler}
            placeholder="이메일을 작성해주세요"
          />
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
          <SignupProfileSpace>
            <SignupProfileImg htmlFor="profileImg">
              프로필 이미지 업로드
            </SignupProfileImg>
            {previewURL && (
              <ImagePreview src={previewURL} alt="프로필 이미지 미리보기" />
            )}
          </SignupProfileSpace>
          <ImgeInput
            type="file"
            accept="image/*"
            id="profileImg"
            onChange={fileSelectHandler}
          />
        </div>
        <ButtonContainer>
          <SignupButton onClick={onSignupHandler}>가입하기</SignupButton>
          <GotoLoginPage onClick={loginPageHandler}>
            로그인 페이지
          </GotoLoginPage>
        </ButtonContainer>
      </StyledForm>
    </StyledSignUp>
  );
}

export default Signup;

const StyledSignUp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--login-signup-background-color);
`;

const StyledImg = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url('/signupPage.jpg');
  background-size: cover;
  background-position: center bottom -60px;
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
    width: 100%;
    margin-left: 15px;
  }
`;

const SignupInput = styled.input`
  width: 80%;
  border: none;
  padding-bottom: 5px;
  border-bottom: 1px solid var(--login-signup-input-bottom);
  margin-top: 20px;
  margin-left: 15px;
  background-color: transparent;
`;

const SignupProfileSpace = styled.div`
  display: flex;
  align-items: center;
  margin-left: 15px;
  margin-right: 30px;
  height: 10vh;
`;

const SignupProfileImg = styled.label`
  margin: 5px 0 20px 0;
  font-weight: bold;
  font-size: 13px;
  color: var(--signup-profileimg-text);
  display: inline-block;
  cursor: pointer;
`;

const ImagePreview = styled.img`
  max-width: 80px;
  max-height: 80px;
  margin-left: 20px;
`;

const ImgeInput = styled.input`
  background-color: #ffe7cf;
  width: 100%;
  display: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignupButton = styled.button`
  width: 10vw;
  height: 4vh;
  border-radius: 50px;
  background-color: var(--login-signup-button);
  cursor: pointer;
  width: 170%;
  transition: background-color 0.3s;
  &:hover {
    background-color: var(--login-signup-button-transition);
  }
  border: 1px solid var(--login-signup-button-border);
`;

const GotoLoginPage = styled.button`
  background: none;
  border: none;
  margin-top: 20px;
  cursor: pointer;
  text-decoration: underline;
`;
