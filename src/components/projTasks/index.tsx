import React from 'react';
import List from '../list';
// import Item from '../item';

type ProjTasksProps = {
  toDoItems: JSX.Element[];
  doingItems: JSX.Element[];
  doneItems: JSX.Element[];
  handleToggleNewTask: () => void;
};

const projTasks = ({
  toDoItems,
  doingItems,
  doneItems,
  handleToggleNewTask,
}: ProjTasksProps): JSX.Element => {
  return (
    <div>
      <h1>Project Tasks</h1>
      <List title="To Do" toggleModal={handleToggleNewTask}>
        {toDoItems}
      </List>
      <List title="Doing" toggleModal={handleToggleNewTask}>
        {doingItems}
      </List>
      <List title="Done" toggleModal={handleToggleNewTask}>
        {doneItems}
      </List>
    </div>
  );
};

export default projTasks;
