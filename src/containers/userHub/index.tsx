import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import NewProjectModal from '../../components/newProjectModal';
import { setProjectName, setId } from '../../store/slices/projectSlice';

const UserHub = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showModal, setModalView] = useState(false);
  // const [projectName, setProjectName] = useState('');

  const handleToggle = () => {
    setModalView(!showModal);
  };

  const handleNameUpdate = (name: string) => {
    dispatch(setProjectName(name));
    dispatch(setId());
    history.push('/project');
  };

  return (
    <>
      <p>This is the user hub, you made it.</p>
      <button type="button" onClick={handleToggle}>
        Add New Project
      </button>
      {showModal && <NewProjectModal nameUpdate={handleNameUpdate} />}
    </>
  );
};

export default UserHub;
