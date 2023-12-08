import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

function Header() {
  //로그인 전역관리
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    console.log('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  const navigate = useNavigate();
  const mainPagesHandler = () => {
    navigate('/');
  };

  const profileHandler = () => {
    navigate('/profile');
  };
  return (
    <>
      <StyledBtn>
        <button onClick={mainPagesHandler}>홈으로</button>
        <span>커플 더플 (Couple The Place)</span>
        <div>
          <button onClick={profileHandler}>프로필</button>
        </div>
      </StyledBtn>
    </>
  );
}

export default Header;

const StyledBtn = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1000px;
  margin: auto;
  background-color: var(--header-color);
  padding: 20px;
  & span {
    font-size: 30px;
  }
  & button {
    margin-left: 10px;
    cursor: pointer;
    &:hover {
      color: var(--header-button-color);
    }
  }
`;
