import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Draggable, DropResult } from 'react-beautiful-dnd';
import dayjs from 'dayjs';
import {
  clearTasks,
  clearItems,
  MaterialItem,
  LaborItem,
  OtherItem,
  // updateTaskStatus,
  TaskItem,
  moveTask,
  deleteTask,
  updateTask,
  postTask,
  postItem,
} from '../../store/slices/projectSlice';
import * as selectors from '../../store/selectors';
import NewTaskModal from '../../components/newTaskModal';
import NewFinance from '../../components/newFinance';
import ProjTask from '../../components/projTasks';
import Task from '../../components/task';
import Item from '../../components/item';
import ProjFinance from '../../components/projFinance';
import TaskDetail from '../../components/taskDetail';

const Project = (): JSX.Element => {
  const dispatch = useDispatch();
  const projectName = useSelector(selectors.selectProjectName);
  const materialItemList = useSelector(selectors.selectMaterialItems);
  const laborItemList = useSelector(selectors.selectLaborItems);
  const otherItemList = useSelector(selectors.selectOtherItems);
  const toDoList = useSelector(selectors.selectProjToDoTasks);
  const doingList = useSelector(selectors.selectProjDoingTasks);
  const doneList = useSelector(selectors.selectProjDoneTasks);
  const endDate = useSelector(selectors.selectProjectEndDate);
  const [showTaskModal, setTaskModalView] = useState(false);
  const [showFinanceModal, setFinanceModalView] = useState(false);
  const [showTaskDetail, setTaskDetailView] = useState(false);
  const [defaultTaskForm, setTaskForm] = useState('');
  const [defaultItemForm, setItemForm] = useState('');
  const [selectedTask, setSelectedTask] = useState<TaskItem>({
    taskName: '',
    taskStatus: '',
    id: '',
    position: 0,
    activity: [],
  });

  const setDefaultTaskForm = (taskStatus: string) => {
    setTaskForm(taskStatus);
  };

  const setDefaultItemForm = (taskStatus: string) => {
    setItemForm(taskStatus);
  };

  const handleToggleTaskModal = () => {
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

  const handleAddingTask = (taskName: string, taskStatus: string, project: number) => {
    dispatch(postTask({ taskName, taskStatus, project }));
    setTaskModalView(!showTaskModal);
  };

  const handleDeleteTask = (id: string, taskStatus: string) => {
    dispatch(deleteTask({ id, taskStatus }));
    setTaskDetailView(!showTaskDetail);
  };

  const handleAddingMaterial = (
    itemName: string,
    itemPrice: number,
    quantity: number,
    category: string,
    date: string,
    minutes: number,
    hours: number,
    project: number
  ) => {
    dispatch(postItem({ itemName, itemPrice, quantity, category, date, minutes, hours, project }));
    setFinanceModalView(!showFinanceModal);
  };

  // const handleAddingLabor = (
  //   itemName: string,
  //   category: string,
  //   date: string,
  //   minutes: number,
  //   hours: number,
  //   project: number
  // ) => {
  //   dispatch(postLaborItem({ itemName, category, date, minutes, hours, project }));
  //   setFinanceModalView(!showFinanceModal);
  // };

  // const handleAddingOther = (
  //   itemName: string,
  //   itemPrice: number,
  //   category: string,
  //   project: number
  // ) => {
  //   dispatch(postOtherItem({ itemName, itemPrice, category, project }));
  //   setFinanceModalView(!showFinanceModal);
  // };

  const handleOnDragEnd = (result: DropResult) => {
    if (result.destination && result.destination !== null) {
      const LISTS: Record<string, Array<TaskItem>> = {
        todo: toDoList,
        doing: doingList,
        done: doneList,
      };
      const taskStatus = result.destination.droppableId;
      const formerStatus = result.source.droppableId;
      const fromIndex = result.source.index;
      const toIndex = result.destination.index;
      let updatedPosition = 100;
      if (toIndex === 0 && LISTS[taskStatus].length !== 0) {
        updatedPosition = LISTS[taskStatus][toIndex].position - 1;
      } else if (toIndex !== 0) {
        updatedPosition = LISTS[taskStatus][toIndex - 1].position + 1;
      }
      if (LISTS[formerStatus]) {
        // if (formerStatus !== LISTS) {
        //   console.error(`Former Status Unrecognized:"${formerStatus}"`);
        // }
        const { taskName, id, activity } = LISTS[formerStatus][fromIndex];
        const intId = parseInt(id, 10);
        dispatch(
          moveTask({
            taskName,
            id,
            formerStatus,
            taskStatus,
            fromIndex,
            toIndex,
            updatedPosition,
            activity,
          })
        );
        dispatch(updateTask({ taskName, intId, taskStatus, updatedPosition }));
      } else {
        console.error(`Unrecognized result.source.droppableId: "${result.source.droppableId}".`);
      }
    }
  };

  const toDoItems: JSX.Element[] = toDoList.map((e, index) => {
    const dragid = e.id.toString();
    return (
      <Draggable key={e.id} draggableId={dragid} index={index}>
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
    const dragid = e.id.toString();
    return (
      <Draggable key={e.id} draggableId={dragid} index={index}>
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
    const dragid = e.id.toString();
    return (
      <Draggable key={e.id} draggableId={dragid} index={index}>
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

  const projDate = dayjs(endDate).format('MM/DD/YYYY');

  function calculateMaterialTotal(arr: Array<MaterialItem>): number {
    let total = 0;
    arr.forEach((e: MaterialItem) => {
      total += e.itemPrice * e.quantity;
    });
    return total;
  }

  function calculateLaborTotal(arr: Array<LaborItem>): number {
    let total = 0;
    arr.forEach((e: LaborItem) => {
      const hours = e.hours * 60;
      total += hours * 1;
      total += e.minutes * 1;
    });
    return total / 60;
  }

  function calculateOtherTotal(arr: Array<OtherItem>): number {
    let total = 0;
    arr.forEach((e: OtherItem) => {
      total += e.itemPrice * 1;
    });
    return total;
  }

  const materialItems: JSX.Element[] = materialItemList.map((e) => {
    return (
      <Item
        itemName={e.itemName}
        itemPrice={e.itemPrice}
        quantity={e.quantity}
        category="material"
      />
    );
  });

  const laborItems: JSX.Element[] = laborItemList.map((e) => {
    return (
      <Item
        itemName={e.itemName}
        minutes={e.minutes}
        date={e.date}
        hours={e.hours}
        category="labor"
      />
    );
  });

  const otherItems: JSX.Element[] = otherItemList.map((e) => {
    return (
      <Item itemName={e.itemName} itemPrice={e.itemPrice} quantity={e.quantity} category="other" />
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
        <NewTaskModal
          toggleModal={handleToggleTaskModal}
          addNewTask={handleAddingTask}
          defaultForm={defaultTaskForm}
        />
      )}
      {showFinanceModal && (
        <NewFinance
          toggleModal={handleToggleFinance}
          addItem={handleAddingMaterial}
          defaultForm={defaultItemForm}
        />
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
        handleToggleNewTask={handleToggleTaskModal}
        handleOnDragEnd={handleOnDragEnd}
        setDefaultForm={setDefaultTaskForm}
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
        setDefaultForm={setDefaultItemForm}
      />
      <button type="submit" onClick={handleClearingItems}>
        Clear Items
      </button>
    </>
  );
};

export default Project;
