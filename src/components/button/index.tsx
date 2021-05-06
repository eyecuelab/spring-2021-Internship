import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.div<{ margin: string }>`
  margin: ${(props) => props.margin};
  z-index: 15;
  justify-content: center;
  display: float;
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
  font-family: ${(props) => props.theme.font};
  color: ${(props) => props.color};
`;

type ButtonProps = {
  buttonText: string;
  size: string;
  margin: string;
  img: string;
  color: string;
  handleToggle: () => void;
};

const Button = ({
  buttonText,
  size,
  margin,
  img,
  color,
  handleToggle,
}: ButtonProps): JSX.Element => {
  return (
    <ButtonWrapper margin={margin} onClick={handleToggle}>
      <ButtonStyle size={size} color={color}>
        {buttonText}
      </ButtonStyle>
      <ButtonImg src={img} />
    </ButtonWrapper>
  );
};

export default Button;
