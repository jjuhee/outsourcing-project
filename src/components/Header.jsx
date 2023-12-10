import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import styled, { css } from 'styled-components';

function Header() {
  const profileImg = useSelector((state) => state.auth.avatar)
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
        <StyledTitle>
          <StyledImg />
          <span>커플 더플 (Couple The Place)</span>
        </StyledTitle>

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
  justify-content: space-evenly;
  align-items: center;
  background-color: var(--header-color);
  div {
    display: flex;
    margin-right: 300px;
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 30px;
    width: 65px;
    height: 65px;
    border: 2px solid var(--header-button-border);
    border-radius: 50%;
    cursor: pointer;
    &:hover {
      color: var(--header-button-color);
    }
  }
`;

const StyledTitle = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  margin-left: 300px;
  color: var(--header-font-color);
`;

const StyledImg = styled.img`
  background-image: url(/titleLogo.png);
  background-size: cover;
  width: 130px;
  height: 130px;
  border: 0px;
  border-radius: 50%;
`;

const HomeButton = styled.button`
  background-image: url(/homeIcon.jpg);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

const ProfileButton = styled.button`
 
  background-image: url(/profileImage.png);
  background-size: cover;
`;

export default Header;
