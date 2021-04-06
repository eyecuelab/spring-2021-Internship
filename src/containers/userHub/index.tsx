import React, { SyntheticEvent, useState } from 'react';
import NewProjectModal from '../../components/newProjectModal';

const UserHub = (): JSX.Element => {
  const [showModal, setModalView] = useState(false);
  const [projectName, setProjectName] = useState('');

  const handleToggle = () => {
    setModalView(!showModal);
  };

  const handleNameUpdate = (name: string) => {
    setProjectName(name);
  };

  return (
    <>
      <p>This is the user hub, you made it.</p>
      <button type="button" onClick={handleToggle}>
        Add New Project
      </button>
      {showModal && <NewProjectModal nameUpdate={handleNameUpdate} />}
      {projectName !== '' ? <p>{projectName}</p> : null}
    </>
  );
};

export default UserHub;
