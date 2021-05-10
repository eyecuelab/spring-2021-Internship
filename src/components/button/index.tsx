import React from 'react';
import styled from 'styled-components';
// margin: ${(props) => props.margin};
const ButtonWrapper = styled.div`
  z-index: 31;
  justify-content: center;
  position: absolute;
  margin-left: 892px;
  margin-top: 20px;
`;

const ButtonImg = styled.img`
  position: fixed;
  z-index: 100;
`;

const ButtonStyle = styled.button<{
  size: string;
  color: string;
}>`
  background: none;
  color: inherit;
  border: none;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  font-size: ${(props) => props.size};
  z-index: 200;
  position: fixed;
  padding: 20px;
  padding-left: 30px;
  font-family: ${(props) => props.theme.font};
  color: ${(props) => props.color};
`;

type ButtonProps = {
  buttonText: string;
  size: string;
  img: string;
  color: string;
  handleToggle: () => void;
};

const Button = ({ buttonText, size, img, color, handleToggle }: ButtonProps): JSX.Element => {
  return (
    <ButtonWrapper onClick={handleToggle}>
      <ButtonStyle size={size} color={color}>
        {buttonText}
      </ButtonStyle>
      <ButtonImg src={img} />
    </ButtonWrapper>
  );
};

export default Button;
