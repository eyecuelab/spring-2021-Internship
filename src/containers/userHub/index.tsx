import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Card } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import NewProjectModal from '../../components/newProjectModal';
import * as selectors from '../../store/selectors';
import {
  setProjectName,
  setProjectStartDate,
  setProjectDueDate,
  setId,
} from '../../store/slices/projectSlice';

const UserHub = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const projectName = useSelector(selectors.selectProjectName);
  const projectDueDate = useSelector(selectors.selectProjectDueDate);
  const projectStartDate = useSelector(selectors.selectProjectStartDate);
  const [showModal, setModalView] = useState(false);
  const handleToggle = () => {
    setModalView(!showModal);
  };

  const handleNewProject = (name: string, dueDate: Date) => {
    dispatch(setProjectName(name));
    dispatch(setProjectStartDate());
    dispatch(setProjectDueDate(dueDate));
    dispatch(setId());
    // history.push('/project');
  };

  const handleClick = () => {
    history.push('/project');
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
      endDate: projectDueDate,
      title: projectName,
    },
  ];

  return (
    <>
      <p>This is the user hub, you made it.</p>
      <Card onClick={handleClick} header={projectName} />
      <Button type="button" onClick={handleToggle}>
        Add New Project
      </Button>
      {showModal && (
        <NewProjectModal toggleModal={handleToggle} createNewProject={handleNewProject} />
      )}
      {/* Calendar */}
      <div>
        <Calendar
          localizer={localizer}
          events={myEventsList}
          startAccessor="startDate"
          endAccessor="endDate"
          style={{ height: '600px', maxWidth: '1000px' }}
          views={{ month: true, week: false }}
          // components={{toolbar: CustomToolbar}}
        />
      </div>
    </>
  );
};

export default UserHub;
