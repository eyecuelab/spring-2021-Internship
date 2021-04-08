import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Flex = styled.div`
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  z-index: 998;
  background: rgba(0, 0, 0, 0.1);
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  border-radius: 8px;
  margin: auto;
  margin-top: auto;
  height: auto;
  z-index: 100000;
  padding: 20px 0 20px 0;
  background-color: red;
  justify-content: center;
  text-align: center;
`;

type ModalProps = {
  children: JSX.Element;
  width: any;
  toggleModal: () => void;
};

export const Modal = ({ width, children, toggleModal }: ModalProps) => {
  return ReactDOM.createPortal(
    <Flex onClick={toggleModal}>
      <Card onClick={(e) => e.stopPropagation()} style={{ width: `${width}` }}>
        {children}
      </Card>
    </Flex>,
    document.body
  );
};
export default Modal;
