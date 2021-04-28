import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Card, Tab } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import dayjs from 'dayjs';
import NewProjectModal from '../../components/newProjectModal';
import * as selectors from '../../store/selectors';
import { postProject, getProjects, getProjectById } from '../../store/slices/projectSlice';

const UserHub = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const projName = useSelector(selectors.selectProjectName);
  const projectEndDate = useSelector(selectors.selectProjectEndDate);
  const projectStartDate = useSelector(selectors.selectProjectStartDate);
  const projectList = useSelector(selectors.selectProjectList);
  const [showModal, setModalView] = useState(false);

  const handleProjectSelect = (id: string) => {
    dispatch(getProjectById(id));
    history.push('/project');
  };

  const projects: JSX.Element[] = projectList.map((e) => {
    const startDate = dayjs(e.startDate).format('MM/DD/YYYY');
    const endDate = dayjs(e.endDate).format('MM/DD/YYYY');
    return (
      <Card onClick={() => handleProjectSelect(e.id)}>
        <Card.Header>{e.projectName}</Card.Header>
        <Card.Meta>{e.id}</Card.Meta>
        <Card.Description>
          {startDate} - {endDate}
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
    dispatch(getProjectById('2'));
  };

  const handleNewProject = (projectName: string, startDate: string, endDate: string) => {
    dispatch(postProject({ projectName, startDate, endDate }));
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
      title: projName,
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
          {showModal && (
            <NewProjectModal toggleModal={handleToggle} addProject={handleNewProject} />
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
