import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Draggable, DropResult } from 'react-beautiful-dnd';
import { useHistory } from 'react-router-dom';
import dayjs from 'dayjs';
import {
  MaterialItem,
  LaborItem,
  OtherItem,
  TaskItem,
  moveTask,
} from '../../store/slices/projectSlice';
import {
  deleteTask,
  updateTask,
  postTask,
  postItem,
  deleteItem,
  deleteProject,
  putProject,
  putItem,
} from '../../store/slices/projectSlice/thunks';
import * as selectors from '../../store/selectors';
import NewTaskModal from '../../components/newTaskModal';
import NewFinance from '../../components/newFinance';
import ProjTask from '../../components/projTasks';
import Task from '../../components/task';
import Item from '../../components/item';
import ProjHeader from '../../components/projHeader';
import ProjFinance from '../../components/projFinance';
import TaskDetail from '../../components/taskDetail';
import InlineEdit from '../../components/inlineEdit';
import { Display, Edit } from './components';

const Project = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const projName = useSelector(selectors.selectProjectName);
  const materialItemList = useSelector(selectors.selectMaterialItems);
  const laborItemList = useSelector(selectors.selectLaborItems);
  const otherItemList = useSelector(selectors.selectOtherItems);
  const toDoList = useSelector(selectors.selectProjToDoTasks);
  const doingList = useSelector(selectors.selectProjDoingTasks);
  const doneList = useSelector(selectors.selectProjDoneTasks);
  const projStartDate = useSelector(selectors.selectProjectStartDate);
  const projectId = useSelector(selectors.selectProjectId);
  const projEndDate = useSelector(selectors.selectProjectEndDate);
  const [showTaskModal, setTaskModalView] = useState(false);
  const [showFinanceModal, setFinanceModalView] = useState(false);
  const [showTaskDetail, setTaskDetailView] = useState(false);
  const [defaultTaskForm, setTaskForm] = useState('');
  const [defaultItemForm, setItemForm] = useState('');
  const [selectedTask, setSelectedTask] = useState<TaskItem>({
    taskName: '',
    taskStatus: '',
    taskDesc: '',
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

  const handleDeletingProject = (id: string) => {
    dispatch(deleteProject(id));
    history.push('/');
  };

  const handleDeleteItem = (id: string, category: string) => {
    dispatch(deleteItem({ id, category }));
  };

  const handleAddingTask = (
    taskName: string,
    taskDesc: string,
    taskStatus: string,
    project: number
  ) => {
    dispatch(postTask({ taskName, taskDesc, taskStatus, project }));
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
        const { taskName, id, activity, taskDesc } = LISTS[formerStatus][fromIndex];
        const intId = parseInt(id, 10);
        dispatch(
          moveTask({
            taskName,
            id,
            formerStatus,
            taskStatus,
            taskDesc,
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

  const handleUpdateItem = (
    id: string,
    itemName: string,
    itemPrice: number | undefined,
    quantity: number | undefined,
    category: string,
    date: string | undefined,
    minutes: number | undefined,
    hours: number | undefined
  ) => {
    const itemId = parseInt(id, 10);
    dispatch(
      putItem({
        id: itemId,
        itemName,
        itemPrice,
        quantity,
        category,
        date,
        minutes,
        hours,
      })
    );
  };

  const materialItems: JSX.Element[] = materialItemList.map((e) => {
    return (
      <Item
        id={e.id}
        itemName={e.itemName}
        itemPrice={e.itemPrice}
        quantity={e.quantity}
        handleDelete={handleDeleteItem}
        handleUpdateItem={handleUpdateItem}
        category="material"
      />
    );
  });

  const laborItems: JSX.Element[] = laborItemList.map((e) => {
    return (
      <Item
        id={e.id}
        itemName={e.itemName}
        minutes={e.minutes}
        date={e.date}
        hours={e.hours}
        handleDelete={handleDeleteItem}
        handleUpdateItem={handleUpdateItem}
        category="labor"
      />
    );
  });

  const otherItems: JSX.Element[] = otherItemList.map((e) => {
    return (
      <Item
        id={e.id}
        itemName={e.itemName}
        itemPrice={e.itemPrice}
        quantity={e.quantity}
        handleDelete={handleDeleteItem}
        handleUpdateItem={handleUpdateItem}
        category="other"
      />
    );
  });

  const materialTotals = calculateMaterialTotal(materialItemList);
  const laborTotals = calculateLaborTotal(laborItemList);
  const otherTotals = calculateOtherTotal(otherItemList);

  const handleUpdateProject = (
    projId: number,
    projectName: string,
    startDate: string,
    endDate: string
  ) => {
    dispatch(putProject({ projId, projectName, startDate, endDate }));
  };

  const endDate = dayjs(projEndDate).format('MM/DD/YYYY');
  const startDate = dayjs(projStartDate).format('MM/DD/YYYY');

  const projId = parseInt(projectId, 10);
  const handleNewProjName = (updatedValue: string | number) => {
    handleUpdateProject(projId, updatedValue.toString(), projStartDate, projEndDate);
  };
  const handleNewProjStart = (updatedValue: string | number) => {
    const newDate = dayjs(updatedValue);
    handleUpdateProject(projId, projName, newDate.toString(), projEndDate);
  };
  const handleNewProjEnd = (updatedValue: string | number) => {
    const newDate = dayjs(updatedValue);
    handleUpdateProject(projId, projName, projStartDate, newDate.toString());
  };

  return (
    <>
      <ProjHeader />
      <h1>
        <InlineEdit
          value={projName}
          updateValue={handleNewProjName}
          renderDisplay={Display}
          renderEdit={Edit}
        />
      </h1>

      <h2>
        Start Date:
        <InlineEdit
          value={startDate}
          updateValue={handleNewProjStart}
          renderDisplay={Display}
          renderEdit={Edit}
        />
      </h2>

      <h2>
        End Date:
        <InlineEdit
          value={endDate}
          updateValue={handleNewProjEnd}
          renderDisplay={Display}
          renderEdit={Edit}
        />
      </h2>
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
      <button type="submit" onClick={() => handleDeletingProject(projectId)}>
        Delete Project
      </button>
    </>
  );
};

export default Project;
