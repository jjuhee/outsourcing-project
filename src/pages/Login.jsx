import React from "react";
import styled from "styled-components";

import { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn as signInActionCreator } from "../redux/modules/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const Rest_api_key = "8f6f8d7af58f247447b8ce9f1dc4e03f"; //REST API KEY
  const redirect_uri = "http://localhost:3000/"; //Redirect URI

  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = () => {
    dispatch({ type: "LOGIN" });
  };

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  };

  // 파이어베이스에 있는 로그인 정보와 동일하다면 "로그인이 되었습니다!!!" 그렇지 않다면
  // 아이디와 비밀번호를 다시 확인해주세요" 가 나온다.
  const signIn = async (event) => {
    event.preventDefault();
    if (email === "") {
      return alert("이메일을 입력해주세요");
    }
    if (password === "") {
      return alert("비밀번호를 입력해주세요");
    }
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const signinAction = signInActionCreator(userCredential.user);
      dispatch(signinAction);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      // // return alert('비밀번호 또는 이메일을 확인해주세요');
    }
    navigate("/");
  };

  return (
    <div>
      <div>
        <div>
          <label>이메일</label>
          <input
            type="email"
            value={email}
            name="email"
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label>비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            name="password"
            onChange={onChange}
            required
          />
        </div>

        <button onClick={signIn} text="로그인" />
        <button text="회원가입" />
      </div>
    </div>
  );
}
