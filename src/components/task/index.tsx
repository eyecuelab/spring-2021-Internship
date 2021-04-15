import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #a3a3a3;
  padding: 10px;
  margin: 10px 0px;
`;

type TaskProps = {
  taskName: string;
};

const Task = ({ taskName }: TaskProps): JSX.Element => {
  return <Wrapper>{taskName}</Wrapper>;
};

export default Task;
