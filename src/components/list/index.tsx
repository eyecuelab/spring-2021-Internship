import React from 'react';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';

type ListProps = {
  title: string;
  toggleModal: () => void;
  children?: JSX.Element;
};

const Box = styled.div`
  background: pink;
  width: 20vw;
  height: 100vh;
  margin: 10px;
  padding: 5px;
  display: inline-block;

  @media screen and (max-width: 768px) {
    background: yellow;
  }
`;

const List = ({ title, toggleModal, children }: ListProps): JSX.Element => {
  return (
    <>
      <Box>
        <FaPlus onClick={toggleModal} />
        <h1>{title}</h1>
        {children}
      </Box>
    </>
  );
};

export default List;

List.defaultProps = {
  children: null,
};
