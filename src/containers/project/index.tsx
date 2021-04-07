import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import NewTaskModal from '../../components/newTaskModal';
import List from '../../components/list';

const Project = () => {
  const projectName = useSelector((state: RootState) => state.project.projectName);
  const [showModal, setModalView] = useState(false);

  const handleToggle = () => {
    setModalView(!showModal);
  };

  return (
    <>
      <h1>{projectName}</h1>
      {showModal && <NewTaskModal />}
      <List title="To Do" toggleModal={handleToggle} />
      <List title="Doing" toggleModal={handleToggle} />
      <List title="Done" toggleModal={handleToggle} />
    </>
  );
};

export default Project;
