import React from "react";
import styled from "styled-components";

function Signup() {
  return (
    <>
      <form>
        <div>
          <LoginInput placeholder="아이디를 작성해주세요" />
          <LoginInput placeholder="암호를 작성해주세요" />
        </div>
        <div>
          <LoginButton>회원가입</LoginButton>
        </div>
      </form>
    </>
  );
}

export default Signup;

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
