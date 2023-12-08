import React, { useState } from 'react';
import styled from 'styled-components';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../firebase/firebase.config';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

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
      let downloadURL;
      // 이미지를 Storage에 업로드
      if (selectedFile) {
        const imageRef = ref(
          storage,
          `profileImages/${user.uid}/${selectedFile.name}`
        );
        console.log(imageRef);
        await uploadBytes(imageRef, selectedFile);
        downloadURL = await getDownloadURL(imageRef);
        console.log({ downloadURL });
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
        avator: downloadURL
      });

      console.log('User added to Firestore with ID: ', userDocRef.id);

      // 회원가입 성공 시 메인 페이지로 이동
      navigate('/');
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

  return (
    <>
      <form>
        <div>
          <SignupInput
            onChange={(e) => setEmail(e.target.value)}
            placeholder="아이디를 작성해주세요"
          />
          <SignupInput
            onChange={(e) => setPassword(e.target.value)}
            placeholder="암호를 작성해주세요(최소6자)"
          />
          <SignupInput
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임을 작성해주세요"
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
