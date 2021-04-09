import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import NewProjectModal from '../../components/newProjectModal';
import { setProjectName, setProjectDueDate, setId } from '../../store/slices/projectSlice';

const UserHub = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showModal, setModalView] = useState(false);
  // const [projectName, setProjectName] = useState('');

  const handleToggle = () => {
    setModalView(!showModal);
  };

  const handleNewProject = (name: string, dueDate: Date) => {
    dispatch(setProjectName(name));
    dispatch(setProjectDueDate(dueDate));
    dispatch(setId());
    history.push('/project');
  };

  return (
    <>
      <p>This is the user hub, you made it.</p>
      <button type="button" onClick={handleToggle}>
        Add New Project
      </button>
      {showModal && (
        <NewProjectModal toggleModal={handleToggle} createNewProject={handleNewProject} />
      )}
    </>
  );
};

export default UserHub;
