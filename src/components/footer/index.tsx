import React from 'react';
import styled from 'styled-components';

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
  width: 1120px;
`;

const Footer = (): JSX.Element => {
  return (
    <>
      <Wrapper>
        <Container>
          <h1 style={{ color: 'white' }}>CURO</h1>
        </Container>
      </Wrapper>
    </>
  );
};

export default Footer;
