import React from 'react';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';

type ListProps = {
  title: string;
  toggleModal: () => void;
  children?: JSX.Element;
  setDefaultForm: (taskStatus: string) => void;
};

const Box = styled.div`
  width: 340px;
  height: 750px;
  margin: 10px;
  padding: 15px;
  display: inline-block;
`;

const List = ({ title, toggleModal, children, setDefaultForm }: ListProps): JSX.Element => {
  const addTask = (): void => {
    toggleModal();
    setDefaultForm(title);
  };
  return (
    <>
      <Box>
        <FaPlus onClick={addTask} />
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
