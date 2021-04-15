import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { RiArrowDownSLine, RiArrowRightSLine } from 'react-icons/ri';
import List from '../list';

const Wrapper = styled.div<{ open: boolean }>`
  margin: 10px;
  align-items: flex-start;
  display: flex;
  max-height: ${(props) => (props.open ? '100%' : '0')};
  overflow: hidden;
  padding: ${(props) => (props.open ? '25px 0' : '0')};
  transition: all 0.3s ease-out;
`;

const Heading = styled.h2`
  padding: 3px;
  background: #d1cfcf;
`;

const TaskContainer = styled.div`
  background: #dbdbdb;
`;

const TaskUl = styled.ul`
  height: 600px;
  padding: 5px 10px;
`;

type ProjTasksProps = {
  toDoItems: JSX.Element[];
  doingItems: JSX.Element[];
  doneItems: JSX.Element[];
  handleToggleNewTask: () => void;
  handleOnDragEnd: (result: any) => void;
};

const ProjTasks = ({
  toDoItems,
  doingItems,
  doneItems,
  handleToggleNewTask,
  handleOnDragEnd,
}: ProjTasksProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(true);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <Heading onClick={handleClick}>
        {isOpen ? <RiArrowDownSLine /> : <RiArrowRightSLine />}Project Tasks
      </Heading>
      <Wrapper open={isOpen}>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="todo">
            {(provided) => (
              <List title="todo" toggleModal={handleToggleNewTask}>
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
              <List title="doing" toggleModal={handleToggleNewTask}>
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
              <List title="done" toggleModal={handleToggleNewTask}>
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
    </div>
  );
};

export default ProjTasks;
