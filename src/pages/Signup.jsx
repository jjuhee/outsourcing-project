import React, { useState } from 'react';
import styled from 'styled-components';

function Signup() {
  const [signupID, setSignupID] = useState('');
  const [signupPw, setSingupPw] = useState('');
  return (
    <>
      <form>
        <div>
          <SignupInput
            onChange={(e) => {
              setSignupID(e.target.value);
            }}
            placeholder="아이디를 작성해주세요"
          />
          <SignupInput
            onChange={(e) => {
              setSingupPw(e.target.value);
            }}
            placeholder="암호를 작성해주세요"
          />
        </div>
        <div>
          <SignupButton>가입하기</SignupButton>
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
