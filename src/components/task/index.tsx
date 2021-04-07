import React from 'react';

type TaskProps = {
  taskName: string;
};

const Task = ({ taskName }: TaskProps): JSX.Element => {
  return (
    <>
      <h1>{taskName}</h1>
    </>
  );
};

export default Task;
