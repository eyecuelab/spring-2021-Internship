import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import * as selectors from '../../store/selectors';
import { TaskItem } from '../../store/slices/projectSlice';

const Wrapper = styled.div`
  background-color: #a3a3a3;
  padding: 10px;
  margin: 10px 0px;
`;

type TaskProps = {
  taskName: string;
  id: string;
  status: string;
  selectTask: (task: TaskItem) => void;
  toggleModal: () => void;
};

const Task = ({ taskName, toggleModal, id, status, selectTask }: TaskProps): JSX.Element => {
  const toDoList = useSelector(selectors.selectProjToDoTasks);
  const doingList = useSelector(selectors.selectProjDoingTasks);
  const doneList = useSelector(selectors.selectProjDoneTasks);
  const filterForToDoTask = (taskId: string): TaskItem => {
    const taskSelected = toDoList.filter((task) => task.id === taskId);
    return taskSelected[0];
  };
  const filterForDoingTask = (taskId: string): TaskItem => {
    const taskSelected = doingList.filter((task) => task.id === taskId);
    return taskSelected[0];
  };

  const filterForDoneTask = (taskId: string): TaskItem => {
    const taskSelected = doneList.filter((task) => task.id === taskId);
    return taskSelected[0];
  };

  const clickAction = (taskStatus: string) => {
    toggleModal();
    console.log(taskStatus);
    if (status === 'todo') {
      selectTask(filterForToDoTask(id));
    } else if (status === 'doing') {
      selectTask(filterForDoingTask(id));
    } else if (status === 'done') {
      selectTask(filterForDoneTask(id));
    }
  };

  return (
    <>
      <Wrapper onClick={() => clickAction(status)}>{taskName}</Wrapper>
    </>
  );
};

export default Task;
