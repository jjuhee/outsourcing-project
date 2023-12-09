import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

function Header() {
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
        <span>커플 더플 (Couple The Place)</span>
        <div>
          <HomeButton onClick={mainPagesHandler} />
          <ProfileButton onClick={profileHandler} />
        </div>
      </StyledBtn>
    </>
  );
}

const StyledBtn = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--header-color);
  padding: 20px;
  span {
    font-size: 30px;
    margin-left: 300px;
  }
  div {
    display: flex;
    margin-right: 300px;
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 22px;
    width: 60px;
    height: 60px;
    border: 2px solid var(--header-button-border);
    border-radius: 50%;
    cursor: pointer;
    &:hover {
      color: var(--header-button-color);
    }
  }
`;

const HomeButton = styled.button`
  background-image: url(/homeIcon.jpg);
  background-size: cover;
`;

export default Header;

const ProfileButton = styled.button`
  background-image: url(/profileImage.png);
  background-size: cover;
`;
