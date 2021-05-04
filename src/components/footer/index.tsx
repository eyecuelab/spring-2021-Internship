import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 1120px;
  height: 51px;
  left: 0px;
  top: 2424px;
  background: ${(props) => props.theme.colors.cloudyGreen};
  border-top: 2px ${(props) => props.theme.colors.white} dashed;
  text-align: center;
`;

const Footer = (): JSX.Element => {
  return (
    <>
      <Wrapper>
        <h1 style={{ color: 'white' }}>CURO</h1>
      </Wrapper>
    </>
  );
};

export default Footer;
