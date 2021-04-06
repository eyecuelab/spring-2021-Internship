import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import List from '../../components/list';

const Project = () => {
  const projectName = useSelector((state: RootState) => state.project.projectName);

  return (
    <>
      <h1>{projectName}</h1>
      <List title="To Do" />
      <List title="Doing" />
      <List title="Done" />
    </>
  );
};

export default Project;
