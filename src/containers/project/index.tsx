import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import dayjs from 'dayjs';
import {
  addTask,
  clearTasks,
  addLineItem,
  clearItems,
  FinanceItem,
  // updateTaskStatus,
  TaskItem,
  moveTask,
  deleteTask,
} from '../../store/slices/projectSlice';
import * as selectors from '../../store/selectors';
import NewTaskModal from '../../components/newTaskModal';
import NewFinance from '../../components/newFinance';
import ProjTask from '../../components/projTasks';
import Task from '../../components/task';
import Item from '../../components/item';
import ProjFinance from '../../components/projFinance';
import TaskDetail from '../../components/taskDetail';

type ProjectTypes = {
  formerStatus: string;
  todo: string;
};

const Project = (): JSX.Element => {
  const dispatch = useDispatch();
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
  const [showTaskDetail, setTaskDetailView] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskItem>({
    taskName: '',
    taskStatus: '',
    id: '',
    activity: [],
  });

  const handleToggleNewTask = () => {
    setTaskModalView(!showTaskModal);
  };

  const handleToggleFinance = () => {
    setFinanceModalView(!showFinanceModal);
  };

  const handleToggleTaskDetail = () => {
    setTaskDetailView(!showTaskDetail);
  };

  const handleClearingTasks = () => {
    dispatch(clearTasks());
  };

  const handleClearingItems = () => {
    dispatch(clearItems());
  };

  const handleAddingTask = (taskName: string, taskStatus: string) => {
    // const activity = now
    dispatch(addTask({ taskName, taskStatus }));
    setTaskModalView(!showTaskModal);
  };

  const handleDeleteTask = (taskStatus: string, id: string) => {
    // const activity = now
    dispatch(deleteTask({ taskStatus, id }));
    setTaskDetailView(!showTaskDetail);
  };

  const handleAddingFinance = (
    itemName: string,
    itemPrice: number,
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
      const LISTS: any = {
        todo: toDoList,
        doing: doingList,
        done: doneList,
      };
      const taskStatus = result.destination.droppableId;
      const formerStatus = result.source.droppableId;
      const fromIndex = result.source.index;
      const toIndex = result.destination.index;
      if (LISTS[formerStatus]) {
        if (formerStatus !== LISTS) {
          console.error(`Former Status Unrecognized:"${formerStatus}"`);
        }
        const { taskName, id, activity } = LISTS[formerStatus][fromIndex];
        dispatch(
          moveTask({ taskName, id, formerStatus, taskStatus, fromIndex, toIndex, activity })
        );
      } else {
        console.error(`Unrecognized result.source.droppableId: "${result.source.droppableId}".`);
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
            <Task
              taskName={e.taskName}
              id={e.id}
              status={e.taskStatus}
              selectTask={setSelectedTask}
              toggleModal={handleToggleTaskDetail}
            />
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
            <Task
              taskName={e.taskName}
              id={e.id}
              status={e.taskStatus}
              selectTask={setSelectedTask}
              toggleModal={handleToggleTaskDetail}
            />
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
            <Task
              taskName={e.taskName}
              id={e.id}
              status={e.taskStatus}
              selectTask={setSelectedTask}
              toggleModal={handleToggleTaskDetail}
            />
          </li>
        )}
      </Draggable>
    );
  });

  const projDate = dayjs(dueDate).format('MM/DD/YYYY');

  function calculateMaterialTotal(arr: Array<FinanceItem>): number {
    let total = 0;
    arr.forEach((e: FinanceItem) => {
      total += e.itemPrice * e.quantity;
    });
    return total;
  }

  function calculateLaborTotal(arr: Array<FinanceItem>): number {
    let total = 0;
    arr.forEach((e: FinanceItem) => {
      total += e.minutes;
    });
    return total / 60;
  }

  function calculateOtherTotal(arr: Array<FinanceItem>): number {
    let total = 0;
    arr.forEach((e: FinanceItem) => {
      total += e.itemPrice;
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
      <h2>Due Date: {projDate}</h2>
      {showTaskModal && (
        <NewTaskModal toggleModal={handleToggleNewTask} addNewTask={handleAddingTask} />
      )}
      {showFinanceModal && (
        <NewFinance toggleModal={handleToggleFinance} addNewFinance={handleAddingFinance} />
      )}
      {showTaskDetail && (
        <TaskDetail
          toggleModal={handleToggleTaskDetail}
          task={selectedTask}
          deleteTask={handleDeleteTask}
        />
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
        handleToggleFinance={handleToggleFinance}
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
