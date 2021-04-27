import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Card, Tab } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import NewProjectModal from '../../components/newProjectModal';
import * as selectors from '../../store/selectors';
import {
  setProjectName,
  setProjectStartDate,
  setProjectEndDate,
  setId,
  postProject,
  getProjects,
  getProjectById,
  postTask,
} from '../../store/slices/projectSlice';

const UserHub = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const projectName = useSelector(selectors.selectProjectName);
  const projectEndDate = useSelector(selectors.selectProjectEndDate);
  const projectStartDate = useSelector(selectors.selectProjectStartDate);
  const projectList = useSelector(selectors.selectProjectList);
  const [showModal, setModalView] = useState(false);

  const handleClick = () => {
    history.push('/project');
  };

  const projects: JSX.Element[] = projectList.map((e) => {
    return (
      <Card onClick={handleClick}>
        <Card.Header>{e.projectName}</Card.Header>
        <Card.Meta>{e.id}</Card.Meta>
        <Card.Description>
          {e.startDate} - {e.endDate}
        </Card.Description>
      </Card>
    );
  });

  const handleToggle = () => {
    setModalView(!showModal);
  };

  const handleMakeGet = async () => {
    dispatch(getProjects());
  };

  const handleMakeGetById = async () => {
    dispatch(getProjectById(2));
  };

  const handleMakePostProj = () => {
    dispatch(postProject());
  };

  const handleNewProject = (name: string, endDate: string) => {
    dispatch(setProjectName(name));
    dispatch(setProjectStartDate());
    dispatch(setProjectEndDate(endDate));
    dispatch(setId());
    // history.push('/project');
  };

  const locales = {
    'en-US': 'date-fns/locale/en-US',
  };

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  const myEventsList = [
    {
      startDate: projectStartDate,
      endDate: projectEndDate,
      title: projectName,
    },
  ];

  const panes = [
    {
      menuItem: 'Projects',
      render: () => (
        <Tab.Pane>
          <h1>Projects:</h1>
          <Card.Group>{projects}</Card.Group>
          <Button type="button" onClick={handleToggle}>
            Add New Project
          </Button>
          <Button type="button" onClick={handleMakeGet}>
            API GET CALL
          </Button>
          <Button type="button" onClick={handleMakeGetById}>
            API GET BY ID CALL
          </Button>
          <Button type="button" onClick={handleMakePostProj}>
            API POST CALL PROJ
          </Button>
          {showModal && (
            <NewProjectModal toggleModal={handleToggle} createNewProject={handleNewProject} />
          )}
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Monthly Calendar',
      render: () => (
        <Tab.Pane>
          <Calendar
            localizer={localizer}
            events={myEventsList}
            startAccessor="startDate"
            endAccessor="endDate"
            style={{ height: '600px', maxWidth: '1000px' }}
            views={{ month: true }}
            // components={{toolbar: CustomToolbar}}
          />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <Tab panes={panes} />
    </>
  );
};

export default UserHub;
