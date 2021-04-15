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
  // id: string;
  // selectTask: (task: TaskItem) => void;
  // toggleModal: () => void;
};

const Task = ({ taskName }: TaskProps): JSX.Element => {
  // const toDoList = useSelector(selectors.selectProjToDoTasks);

  // function thisTask(taskId: string) {
  //   const selectedTask = toDoList.filter((task) => task.id === taskId);
  //   console.log(selectedTask[0]);
  //   return selectedTask[0];
  // }
  // window.addEventListener('click', (event: MouseEvent) => {
  //   if (event.defaultPrevented) {
  //     return;
  //   }
  //   toggleModal();
  //   selectTask(thisTask(id));
  // });

  return (
    <>
      <Wrapper>
        <p>{taskName}</p>
      </Wrapper>
    </>
  );
};

export default Task;
