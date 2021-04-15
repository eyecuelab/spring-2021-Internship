import React from 'react';
import styled from 'styled-components';

type TaskProps = {
  taskName: string;
};

const Task = ({ taskName }: TaskProps): JSX.Element => {
  return <>{taskName}</>;
};

export default Task;
