import React from 'react';

type TaskProps = {
  taskName: string;
};

const Task = ({ taskName }: TaskProps): JSX.Element => {
  return (
    <>
      <h2>{taskName}</h2>
    </>
  );
};

export default Task;
