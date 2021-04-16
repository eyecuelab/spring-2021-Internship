import React from 'react';
import dayjs from 'dayjs';
import { Modal } from '../modal';
import { TaskItem } from '../../store/slices/projectSlice';

type TaskDetailProps = {
  toggleModal: () => void;
  task: TaskItem;
};

const TaskDetail = ({ toggleModal, task }: TaskDetailProps): JSX.Element => {
  const ActivityItems: JSX.Element[] = task.activity.map((e) => {
    const date = dayjs(e.dateTime).format('ddd MM/DD/YYYY h:mm a');
    return (
      <>
        <div style={{ background: 'grey', margin: '5px' }}>
          <p>{e.description}</p>
          <p>{date}</p>
        </div>
      </>
    );
  });
  return (
    <>
      <Modal width="350px" toggleModal={toggleModal}>
        <>
          <h2>Task Detail</h2>
          <h3>{task?.taskName}</h3>
          <h4>Status: {task?.taskStatus}</h4>
          <div>
            <h4>Activity:</h4>
            {ActivityItems}
          </div>
        </>
      </Modal>
    </>
  );
};

export default TaskDetail;
