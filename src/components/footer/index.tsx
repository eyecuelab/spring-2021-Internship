import React from 'react';
import styled from 'styled-components';
import Curo from '../../assets/img/Curo.svg';

const Wrapper = styled.div`
  height: 51px;
  left: 0px;
  top: 2424px;
  background: ${(props) => props.theme.colors.cloudyGreen};
  border-top: 2px ${(props) => props.theme.colors.white} dashed;
  text-align: center;
  padding: 0.25rem 9999rem;
  margin-right: -9999rem;
  margin-left: -9999rem;
`;

const Container = styled.div`
  margin-top: 4px;
  width: 1120px;
`;

const Footer = (): JSX.Element => {
  return (
    <>
      <Wrapper>
        <Container>
          <img src={Curo} alt="Curo logo" />
        </Container>
      </Wrapper>
    </>
  );
};

export default Footer;
