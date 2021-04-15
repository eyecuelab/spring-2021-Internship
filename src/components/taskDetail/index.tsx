import React from 'react';
import { Modal } from '../modal';
import { TaskItem } from '../../store/slices/projectSlice';

type TaskDetailProps = {
  toggleModal: () => void;
  task: TaskItem | null;
};

const TaskDetail = ({ toggleModal, task }: TaskDetailProps): JSX.Element => {
  return (
    <>
      console.log({task})
      <Modal width="350" toggleModal={toggleModal}>
        <p>Task Detail</p>
      </Modal>
    </>
  );
};

export default TaskDetail;
