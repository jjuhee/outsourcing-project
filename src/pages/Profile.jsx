import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Stwrapper>
      <div> id : </div>
      <div>내가 만든 코스</div>
      <div>이미지</div>
      <div>이미지</div>
      <div>이미지</div>
      <button>로그아웃</button>
      <button onClick={() => navigate("/")}>홈으로</button>
    </Stwrapper>
  );
}

export default Profile;
