import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.div<{ margin: string }>`
  position: absolute;
  margin: ${(props) => props.margin};
`;

const ButtonImg = styled.img`
  position: absolute;
  filter: drop-shadow(10px 10px 0.75rem rgba(53, 43, 39, 0.2));
`;

const ButtonStyle = styled.button<{
  size: string;
  color: string;
}>`
  margin-top: 3px;
  width: 140px;
  position: absolute;
  background: none;
  border: none;
  cursor: pointer;
  font-size: ${(props) => props.size};
  z-index: 2;
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
  onClick: () => void;
};

const SmallButton = ({
  buttonText,
  size,
  margin,
  img,
  color,
  onClick,
}: ButtonProps): JSX.Element => {
  return (
    <ButtonWrapper margin={margin}>
      <ButtonStyle onClick={onClick} size={size} color={color}>
        {buttonText}
      </ButtonStyle>
      <ButtonImg src={img} />
    </ButtonWrapper>
  );
};

export default SmallButton;
