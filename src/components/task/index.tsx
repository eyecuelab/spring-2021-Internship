import React from 'react';

type TaskProps = {
  taskName: string;
  // taskStatus: string;
  id: string;
  updateTask: (taskName: string, taskStatus: string, id: string) => void;
};

const Task = ({ taskName, id, updateTask }: TaskProps): JSX.Element => {
  return (
    <>
      <h2>{taskName}</h2>
      <button onClick={() => updateTask(taskName, 'To Do', id)} type="button">
        Mark To Do
      </button>
      <button onClick={() => updateTask(taskName, 'Doing', id)} type="button">
        Mark Doing
      </button>
      <button onClick={() => updateTask(taskName, 'Done', id)} type="button">
        Mark Done
      </button>
    </>
  );
};

export default Task;

// const dispatch = useDispatch();
// function markDone() {
//   dispatch(updateTaskStatus({ taskName, taskStatus: 'Done', id }));
// }
