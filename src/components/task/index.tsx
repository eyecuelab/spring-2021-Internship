import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import * as selectors from '../../store/selectors';
import { TaskItem } from '../../store/slices/projectSlice';
import Texture from '../../assets/img/Affordance.svg';

const Wrapper = styled.div`
  height: 46px;
  background: ${(props) => props.theme.colors.burntOrange};
  border-radius: 3px;
  margin: 10px 0px;
`;

const Affordance = styled.img`
  position: absolute;
  margin-left: 6px;
  margin-top: 6.5px;
`;
const TaskText = styled.p`
  font-family: ${(props) => props.theme.font};
  font-size: ${(props) => props.theme.fontSizes.small};
  margin-left: 25px;
  padding-top: 15px;
  color: ${(props) => props.theme.colors.white};
  line-height: 17px;
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

  const clickAction = () => {
    toggleModal();
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
      <Wrapper onClick={clickAction}>
        <Affordance src={Texture} alt="Affordance graphic" />
        <TaskText>{taskName}</TaskText>
      </Wrapper>
    </>
  );
};

export default Task;
