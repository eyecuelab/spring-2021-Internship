import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import {
  addTask,
  clearTasks,
  addLineItem,
  clearItems,
  FinanceItem,
  updateTaskStatus,
} from '../../store/slices/projectSlice';
import * as selectors from '../../store/selectors';
import NewTaskModal from '../../components/newTaskModal';
import NewFinance from '../../components/newFinance';
import ProjTask from '../../components/projTasks';
import Task from '../../components/task';
import Item from '../../components/item';
import ProjFinance from '../../components/projFinance';

const Project = (): JSX.Element => {
  const dispatch = useDispatch();
  const project = useSelector(selectors.projectSelector);
  const projectName = useSelector(selectors.selectProjectName);
  const materialItemList = useSelector(selectors.selectMaterialItems);
  const laborItemList = useSelector(selectors.selectLaborItems);
  const otherItemList = useSelector(selectors.selectOtherItems);
  const toDoList = useSelector(selectors.selectProjToDoTasks);
  const doingList = useSelector(selectors.selectProjDoingTasks);
  const doneList = useSelector(selectors.selectProjDoneTasks);
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
    minutes: number,
    hours: number
  ) => {
    dispatch(addLineItem({ itemName, itemPrice, quantity, category, date, minutes, hours }));
    setFinanceModalView(!showFinanceModal);
  };

  const handleOnDragEnd = (result: any) => {
    if (result.destination !== null) {
      console.log(result.destination);
      if (result.source.droppableId === 'todo') {
        const { taskName } = toDoList[result.source.index];
        const { id } = toDoList[result.source.index];
        const taskStatus = result.destination.droppableId;
        const formerStatus = result.source.droppableId;
        dispatch(updateTaskStatus({ taskName, taskStatus, id, formerStatus }));
      } else if (result.source.droppableId === 'doing') {
        const { taskName } = doingList[result.source.index];
        const { id } = doingList[result.source.index];
        const taskStatus = result.destination.droppableId;
        const formerStatus = result.source.droppableId;
        dispatch(updateTaskStatus({ taskName, taskStatus, id, formerStatus }));
      } else if (result.source.droppableId === 'done') {
        const { taskName } = doneList[result.source.index];
        const { id } = doneList[result.source.index];
        const taskStatus = result.destination.droppableId;
        const formerStatus = result.source.droppableId;
        dispatch(updateTaskStatus({ taskName, taskStatus, id, formerStatus }));
      }
    }
  };

  const toDoItems: JSX.Element[] = toDoList.map((e, index) => {
    return (
      <Draggable key={e.id} draggableId={e.id} index={index}>
        {/* eslint-disable-next-line */}
        {(provided) => (
          <li
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            key={e.id}
          >
            <Task taskName={e.taskName} />
          </li>
        )}
      </Draggable>
    );
  });

  const doingItems: JSX.Element[] = doingList.map((e, index) => {
    return (
      <Draggable key={e.id} draggableId={e.id} index={index}>
        {/* eslint-disable-next-line */}
        {(provided) => (
          <li
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            key={e.id}
          >
            <Task taskName={e.taskName} />
          </li>
        )}
      </Draggable>
    );
  });

  const doneItems: JSX.Element[] = doneList.map((e, index) => {
    return (
      <Draggable key={e.id} draggableId={e.id} index={index}>
        {/* eslint-disable-next-line */}
        {(provided) => (
          <li
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            key={e.id}
          >
            <Task taskName={e.taskName} />
          </li>
        )}
      </Draggable>
    );
  });

  const currentDate = new Date(dueDate);
  const stringDate = currentDate.toDateString();

  // const materialArray = materialItemList.filter((e) => e.category === 'material');
  // const laborArray = laborItemList.filter((e) => e.category === 'labor');
  // const otherArray = otherItemList.filter((e) => e.category === 'other');

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

  const materialItems: JSX.Element[] = materialItemList.map((e) => {
    return (
      <Item
        itemName={e.itemName}
        itemPrice={e.itemPrice}
        quantity={e.quantity}
        category={e.category}
      />
    );
  });

  const laborItems: JSX.Element[] = laborItemList.map((e) => {
    return <Item itemName={e.itemName} minutes={e.minutes} date={e.date} category={e.category} />;
  });

  const otherItems: JSX.Element[] = otherItemList.map((e) => {
    return (
      <Item
        itemName={e.itemName}
        itemPrice={e.itemPrice}
        quantity={e.quantity}
        category={e.category}
      />
    );
  });

  const materialTotals = calculateMaterialTotal(materialItemList);
  const laborTotals = calculateLaborTotal(laborItemList);
  const otherTotals = calculateOtherTotal(otherItemList);
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
      <ProjTask
        toDoItems={toDoItems}
        doingItems={doingItems}
        doneItems={doneItems}
        handleToggleNewTask={handleToggleNewTask}
        handleOnDragEnd={handleOnDragEnd}
      />
      <button type="submit" onClick={handleClearingTasks}>
        Clear Tasks
      </button>
      <ProjFinance
        materialTotals={materialTotals}
        laborTotals={laborTotals}
        otherTotals={otherTotals}
        materialItems={materialItems}
        laborItems={laborItems}
        otherItems={otherItems}
      />
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
