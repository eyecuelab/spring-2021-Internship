import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { addTask, clearTasks } from '../../store/slices/projectSlice';
import NewTaskModal from '../../components/newTaskModal';
import List from '../../components/list';
import Task from '../../components/task';

const Project = (): JSX.Element => {
  const dispatch = useDispatch();
  const projectName = useSelector((state: RootState) => state.project.projectName);
  const [showModal, setModalView] = useState(false);

  const handleToggle = () => {
    setModalView(!showModal);
  };

  const handleClearingTasks = () => {
    dispatch(clearTasks());
  };

  const handleAddingTask = (taskName: string, taskStatus: string) => {
    dispatch(addTask({ taskName, taskStatus }));
    setModalView(!showModal);
  };

  // const array
  // const todoItems = array.map() =>
  // <li>{task}</li>

  // forEach task where task status are =
  // create an array of these Tasks

  return (
    <>
      <h1>{projectName}</h1>
      {showModal && <NewTaskModal addNewTask={handleAddingTask} />}
      <List title="To Do" toggleModal={handleToggle}>
        <Task />
      </List>
      <List title="Doing" toggleModal={handleToggle} />
      <List title="Done" toggleModal={handleToggle} />
      <button type="submit" onClick={handleClearingTasks}>
        Clear Tasks
      </button>
    </>
  );
};

export default Project;
