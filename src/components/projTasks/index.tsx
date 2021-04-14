import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import List from '../list';

type ProjTasksProps = {
  toDoItems: JSX.Element[];
  doingItems: JSX.Element[];
  doneItems: JSX.Element[];
  handleToggleNewTask: () => void;
  handleOnDragEnd: (result: any) => void;
};

const projTasks = ({
  toDoItems,
  doingItems,
  doneItems,
  handleToggleNewTask,
  handleOnDragEnd,
}: ProjTasksProps): JSX.Element => {
  return (
    <div>
      <h1>Project Tasks</h1>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="To Do">
          {(provided) => (
            <List title="To Do" toggleModal={handleToggleNewTask}>
              <ul className="To Do" {...provided.droppableProps} ref={provided.innerRef}>
                {toDoItems}
                {provided.placeholder}
              </ul>
            </List>
          )}
        </Droppable>
        <Droppable droppableId="Doing">
          {(provided) => (
            <List title="Doing" toggleModal={handleToggleNewTask}>
              <ul className="Doing" {...provided.droppableProps} ref={provided.innerRef}>
                {doingItems}
                {provided.placeholder}
              </ul>
            </List>
          )}
        </Droppable>
        <Droppable droppableId="Done">
          {(provided) => (
            <List title="Done" toggleModal={handleToggleNewTask}>
              <ul className="Done" {...provided.droppableProps} ref={provided.innerRef}>
                {doneItems}
                {provided.placeholder}
              </ul>
            </List>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default projTasks;
