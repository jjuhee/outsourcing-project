import React from 'react';
import styled from 'styled-components';

function LodingLayer() {
  return (
    <Container>
      <img src="/Loading.gif" />
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 999;
`;

export default LodingLayer;
