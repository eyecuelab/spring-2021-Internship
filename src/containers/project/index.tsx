import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addTask,
  clearTasks,
  addLineItem,
  clearItems,
  calculateTotals,
} from '../../store/slices/projectSlice';
import * as selectors from '../../store/selectors';
import NewTaskModal from '../../components/newTaskModal';
import NewFinance from '../../components/newFinance';
import List from '../../components/list';
import Task from '../../components/task';
import Finance from '../../components/finance';
import Item from '../../components/item';

const Project = (): JSX.Element => {
  const dispatch = useDispatch();
  const projectName = useSelector(selectors.selectProjectName);
  const taskList = useSelector(selectors.selectProjectTasks);
  const itemList = useSelector(selectors.selectProjectItems);
  const projectTotals = useSelector(selectors.selectProjectTotals);
  const [showTaskModal, setTaskModalView] = useState(false);
  const [showFinanceModal, setFinanceModalView] = useState(false);

  const handleToggleNewTask = () => {
    setTaskModalView(!showTaskModal);
  };

  const handleToggleFinance = () => {
    setFinanceModalView(!showFinanceModal);
  };

  const handleClearingTasks = () => {
    dispatch(clearTasks());
  };

  const handleClearingItems = () => {
    dispatch(clearItems());
  };

  const handleAddingTask = (taskName: string, taskStatus: string) => {
    dispatch(addTask({ taskName, taskStatus }));
    setTaskModalView(!showTaskModal);
  };

  const handleAddingFinance = (
    itemName: string,
    itemPrice: string,
    quantity: number,
    category: string
  ) => {
    dispatch(addLineItem({ itemName, itemPrice, quantity, category }));
    dispatch(calculateTotals());
    setFinanceModalView(!showFinanceModal);
  };

  const toDoArray = taskList.filter((e) => e.taskStatus === 'To Do');
  const doingArray = taskList.filter((e) => e.taskStatus === 'Doing');
  const doneArray = taskList.filter((e) => e.taskStatus === 'Done');

  const toDoItems: JSX.Element[] = toDoArray.map((e) => {
    return (
      <div key={e.id}>
        <Task taskName={e.taskName} />
      </div>
    );
  });

  const doingItems: JSX.Element[] = doingArray.map((e) => {
    return (
      <div key={e.id}>
        <Task taskName={e.taskName} />
      </div>
    );
  });

  const doneItems: JSX.Element[] = doneArray.map((e) => {
    return (
      <div key={e.id}>
        <Task taskName={e.taskName} />
      </div>
    );
  });

  const lineItems: JSX.Element[] = itemList.map((e) => {
    return (
      <div>
        <Item itemName={e.itemName} itemPrice={e.itemPrice} quantity={e.quantity} />
      </div>
    );
  });
  return (
    <>
      <h1>{projectName}</h1>
      {showTaskModal && (
        <NewTaskModal toggleModal={handleToggleNewTask} addNewTask={handleAddingTask} />
      )}
      {showFinanceModal && (
        <NewFinance toggleModal={handleToggleFinance} addNewFinance={handleAddingFinance} />
      )}
      <List title="To Do" toggleModal={handleToggleNewTask}>
        {toDoItems}
      </List>
      <List title="Doing" toggleModal={handleToggleNewTask}>
        {doingItems}
      </List>
      <List title="Done" toggleModal={handleToggleNewTask}>
        {doneItems}
      </List>
      <button type="submit" onClick={handleClearingTasks}>
        Clear Tasks
      </button>
      <Finance columnOne="Material" columnTwo="Quantity" columnThree="Cost" totals={projectTotals}>
        {lineItems}
      </Finance>
      <Finance columnOne="Activity" columnTwo="Hours" columnThree="Date" totals={projectTotals}>
        {lineItems}
      </Finance>
      <Finance
        columnOne="Description"
        columnTwo="placeholder"
        columnThree="Cost"
        totals={projectTotals}
      >
        {lineItems}
      </Finance>
      <button type="button" onClick={handleToggleFinance}>
        Add Line Item
      </button>
      <button type="submit" onClick={handleClearingItems}>
        Clear Items
      </button>
    </>
  );
};

export default Project;
