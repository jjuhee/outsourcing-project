import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/firebase.config';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import {
  createStorageRef,
  getDownloadFileURL,
  getDefaultProfileImgURL
} from 'firebase/storage';
function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

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
        avator: selectedFile
      });

      console.log('User added to Firestore with ID: ', userDocRef.id);

      // 회원가입 성공 시 메인 페이지로 이동
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    // ref 함수를 이용해서 Storage 내부 저장할 위치를 지정하고, uploadBytes 함수를 이용해서 파일을 저장합니다.
    const imageRef = ref(
      storage,
      `${auth.currentUser.uid}/${selectedFile.name}`
    );
    await uploadBytes(imageRef, selectedFile);

    // 파일 URL 가져오기
    const downloadURL = await getDownloadURL(imageRef);
    console.log(downloadURL);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('user', user); // 사용자 인증 정보가 변경될 때마다 해당 이벤트를 받아 처리합니다.
    });
  }, []);

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
          <SignupInput
            onChange={(e) => {
              setNickname(e.target.value);
            }}
            placeholder="닉네임을 작성해주세요"
          />
          <signupProfileImg
            placeholder="닉네임을 작성해주세요"
            htmlFor="profileImg"
          />
          <ImgeInput
            Type="file"
            accept="image/"
            id="profileImg"
            onChange={handleFileSelect}
          />
          <button onClick={handleUpload}>업로드하기</button>
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
  /* display: none; */
`;

const signupProfileImg = styled.label`
  margin: 5px 0 20px 0;
  font-weight: bold;
  font-size: 13px;
  color: #0095f6;
  display: inline-block;
  cursor: pointer;
`;
