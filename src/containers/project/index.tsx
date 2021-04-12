import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addTask,
  clearTasks,
  addLineItem,
  clearItems,
  FinanceItem,
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
  const dueDate = useSelector(selectors.selectProjectDueDate);
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
    category: string,
    date: Date,
    minutes: number
  ) => {
    dispatch(addLineItem({ itemName, itemPrice, quantity, category, date, minutes }));
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

  const currentDate = new Date(dueDate);
  const stringDate = currentDate.toDateString();

  const materialArray = itemList.filter((e) => e.category === 'material');
  const laborArray = itemList.filter((e) => e.category === 'labor');
  const otherArray = itemList.filter((e) => e.category === 'other');

  function calculateMaterialTotal(arr: Array<FinanceItem>): number {
    let total = 0;
    arr.forEach((e: FinanceItem) => {
      total += parseInt(e.itemPrice, 10) * e.quantity;
    });
    return total;
  }

  function calculateLaborTotal(arr: Array<FinanceItem>): string {
    let total = 0;
    arr.forEach((e: FinanceItem) => {
      total += e.minutes;
    });
    return (total / 60).toFixed(2);
  }

  function calculateOtherTotal(arr: Array<FinanceItem>): number {
    let total = 0;
    arr.forEach((e: FinanceItem) => {
      total += parseInt(e.itemPrice, 10);
    });
    return total;
  }

  const materialItems: JSX.Element[] = materialArray.map((e) => {
    return (
      <Item
        itemName={e.itemName}
        itemPrice={e.itemPrice}
        quantity={e.quantity}
        category={e.category}
      />
    );
  });

  const laborItems: JSX.Element[] = laborArray.map((e) => {
    return <Item itemName={e.itemName} minutes={e.minutes} date={e.date} category={e.category} />;
  });

  const otherItems: JSX.Element[] = otherArray.map((e) => {
    return (
      <Item
        itemName={e.itemName}
        itemPrice={e.itemPrice}
        quantity={e.quantity}
        category={e.category}
      />
    );
  });

  const materialTotals = calculateMaterialTotal(materialArray);
  const laborTotals = calculateLaborTotal(laborArray);
  const otherTotals = calculateOtherTotal(otherArray);

  return (
    <>
      <h1>{projectName}</h1>
      <h1>{stringDate}</h1>
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
      <Finance
        columnOne="Material"
        columnTwo="Quantity"
        columnThree="Cost (Per Unit)"
        totals={materialTotals}
      >
        {materialItems}
      </Finance>
      <Finance columnOne="Activity" columnTwo="Hours" columnThree="Date" totals={laborTotals}>
        {laborItems}
      </Finance>
      <Finance
        columnOne="Description"
        columnTwo="placeholder"
        columnThree="Cost"
        totals={otherTotals}
      >
        {otherItems}
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
