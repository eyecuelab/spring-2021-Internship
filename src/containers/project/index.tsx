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
  const taskList = useSelector((state: RootState) => state.project.tasks);
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

  const toDoArray = taskList.filter((e) => e.taskStatus === 'To Do');
  const doingArray = taskList.filter((e) => e.taskStatus === 'Doing');
  const doneArray = taskList.filter((e) => e.taskStatus === 'Done');

  const toDoItems = toDoArray.map((e) => {
    return <Task taskName={e.taskName} />;
  });

  const doingItems = doingArray.map((e) => {
    return <Task taskName={e.taskName} />;
  });

  const doneItems = doneArray.map((e) => {
    return <Task taskName={e.taskName} />;
  });

  return (
    <>
      <h1>{projectName}</h1>
      {showModal && <NewTaskModal addNewTask={handleAddingTask} />}
      <List title="To Do" toggleModal={handleToggle}>
        {toDoItems}
      </List>
      <List title="Doing" toggleModal={handleToggle}>
        {doingItems}
      </List>
      <List title="Done" toggleModal={handleToggle}>
        {doneItems}
      </List>
      <button type="submit" onClick={handleClearingTasks}>
        Clear Tasks
      </button>
    </>
  );
};

export default Project;
