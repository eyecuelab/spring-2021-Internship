import React from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import styled from 'styled-components';
import List from '../list';

const Wrapper = styled.div`
  margin: 10px;
  align-items: flex-start;
  display: flex;
  max-height: 100%;
  overflow: hidden;
  padding: 25px 0;
`;

const TaskContainer = styled.div`
  background: ${(props) => props.theme.colors.darkGrey};
  border-radius: 3px;
  width: 333px;
`;

const TaskUl = styled.ul`
  min-height: 62px;
  height: auto;
  padding: 5px 10px;
`;

type ProjTasksProps = {
  toDoItems: JSX.Element[];
  doingItems: JSX.Element[];
  doneItems: JSX.Element[];
  handleToggleNewTask: () => void;
  handleOnDragEnd: (result: DropResult) => void;
  setDefaultForm: (taskStatus: string) => void;
};

const ProjTasks = ({
  toDoItems,
  doingItems,
  doneItems,
  handleToggleNewTask,
  handleOnDragEnd,
  setDefaultForm,
}: ProjTasksProps): JSX.Element => {
  return (
    <>
      <Wrapper>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="todo">
            {(provided) => (
              <List title="todo" toggleModal={handleToggleNewTask} setDefaultForm={setDefaultForm}>
                <TaskContainer>
                  <TaskUl
                    className="todo"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{ listStyleType: 'none' }}
                  >
                    {toDoItems}
                    {provided.placeholder}
                  </TaskUl>
                </TaskContainer>
              </List>
            )}
          </Droppable>
          <Droppable droppableId="doing">
            {(provided) => (
              <List title="doing" toggleModal={handleToggleNewTask} setDefaultForm={setDefaultForm}>
                <TaskContainer>
                  <TaskUl
                    className="doing"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{ listStyleType: 'none' }}
                  >
                    {doingItems}
                    {provided.placeholder}
                  </TaskUl>
                </TaskContainer>
              </List>
            )}
          </Droppable>
          <Droppable droppableId="done">
            {(provided) => (
              <List title="done" toggleModal={handleToggleNewTask} setDefaultForm={setDefaultForm}>
                <TaskContainer>
                  <TaskUl
                    className="done"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{ listStyleType: 'none' }}
                  >
                    {doneItems}
                    {provided.placeholder}
                  </TaskUl>
                </TaskContainer>
              </List>
            )}
          </Droppable>
        </DragDropContext>
      </Wrapper>
    </>
  );
};

export default ProjTasks;
