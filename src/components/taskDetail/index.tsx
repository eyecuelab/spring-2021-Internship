import React from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { Modal } from '../modal';
import { TaskItem } from '../../store/slices/projectSlice';

const LogWrapper = styled.div`
  margin: auto;
  width: 325px;
  max-height: 200px;
  overflow: scroll;
  display: flex;
  flex-direction: column-reverse;
  overflow-x: hidden;
`;

type TaskDetailProps = {
  toggleModal: () => void;
  task: TaskItem;
  deleteTask: (taskStatus: string, id: string) => void;
};

const TaskDetail = ({ toggleModal, task, deleteTask }: TaskDetailProps): JSX.Element => {
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
          <h4>Activity:</h4>
          <button type="button" onClick={() => deleteTask(task?.taskStatus, task?.id)}>
            Delete Task
          </button>
          <LogWrapper>{ActivityItems}</LogWrapper>
        </>
      </Modal>
    </>
  );
};

export default TaskDetail;
