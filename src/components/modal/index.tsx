import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import TopBlue from '../../assets/img/ProjModalTopTear.svg';
import BottomBlue from '../../assets/img/ProjModalBottomTear.svg';
import TopOrange from '../../assets/img/TaskModalTopTear.svg';
import BottomOrange from '../../assets/img/TaskModalBottomTear.svg';

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

const TopTear = styled.div`
  position: fixed;
  margin-top: -50px;
  margin-left: -40px;
`;
const BottomTear = styled.div`
  position: fixed;
  margin-left: -40px;
  margin-top: 20px;
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
  toggleModal?: () => void;
};

export const Modal = ({ width, color, children }: ModalProps): JSX.Element => {
  return ReactDOM.createPortal(
    <Wrapper>
      <Card width={width} color={color}>
        <TopTear>
          {color === '#638E9D' ? (
            <img src={TopBlue} width={width} alt="torn paper edge" />
          ) : (
            <img src={TopOrange} width={width} alt="torn paper edge" />
          )}
        </TopTear>
        {children}
        <BottomTear>
          {color === '#638E9D' ? (
            <img src={BottomBlue} width={width} alt="torn paper edge" />
          ) : (
            <img src={BottomOrange} width={width} alt="torn paper edge" />
          )}
        </BottomTear>
      </Card>
    </Wrapper>,
    document.body
  );
};
export default Modal;
