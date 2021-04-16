import React from 'react';
import { Modal } from '../modal';
import { TaskItem } from '../../store/slices/projectSlice';

type TaskDetailProps = {
  toggleModal: () => void;
  task: TaskItem | null;
};

const TaskDetail = ({ toggleModal, task }: TaskDetailProps): JSX.Element => {
  console.log({ task });
  return (
    <>
      <Modal width="350px" toggleModal={toggleModal}>
        <>
          <h2>Task Detail</h2>
          <h3>{task?.taskName}</h3>
          <h4>Status: {task?.taskStatus}</h4>
          <div>
            <h4>Activity:</h4>
            <div>{task?.activity}</div>
          </div>
        </>
      </Modal>
    </>
  );
};

export default TaskDetail;
