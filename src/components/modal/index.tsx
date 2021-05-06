import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  z-index: 998;
  background: rgba(98, 141, 157, 0.5);
  align-items: center;
`;

const Card = styled.div<{ width: string; color: string }>`
  margin: auto;
  max-height: 500px;
  z-index: 100000;
  padding: 20px 40px 20px 40px;
  // justify-content: center;
  // text-align: center;
  width: ${(props) => props.width};
  background-color: ${(props) => props.color};
  position: relative;
  top: 50%;
  transform: translateY(-50%);
`;

type ModalProps = {
  children: JSX.Element;
  width: string;
  color: string;
};

export const Modal = ({ width, color, children }: ModalProps): JSX.Element => {
  return ReactDOM.createPortal(
    <Wrapper>
      <Card width={width} color={color}>
        {children}
      </Card>
    </Wrapper>,
    document.body
  );
};
export default Modal;
