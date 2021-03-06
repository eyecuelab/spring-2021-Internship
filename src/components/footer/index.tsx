import React from 'react';
import styled from 'styled-components';
import Curo from '../../assets/img/Curo.svg';

const Wrapper = styled.div`
  bottom: 0px;
  width: 100vw;
  min-width: 1120px;
  height: 51px;
  background: ${(props) => props.theme.colors.cloudyGreen};
  border-top: 2px ${(props) => props.theme.colors.white} dashed;
  text-align: center;
  margin-right: auto;
  margin-left: auto;
  z-index: 10;
`;

const Container = styled.div`
  margin-right: auto;
  margin-left: auto;
  margin-top: 12px;
  width: 1120px;
`;

const Footer = (): JSX.Element => {
  return (
    <>
      <Wrapper>
        <Container>
          <img src={Curo} alt="Curo logo" style={{ width: '78px', height: '28px' }} />
        </Container>
      </Wrapper>
    </>
  );
};

export default Footer;
