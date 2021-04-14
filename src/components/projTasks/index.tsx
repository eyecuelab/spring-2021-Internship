import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { RiArrowDownSLine, RiArrowRightSLine } from 'react-icons/ri';
import List from '../list';

const Wrapper = styled.div<{ open: boolean }>`
  margin: 10px;
  align-items: center;
  max-height: ${(props) => (props.open ? '100%' : '0')};
  overflow: hidden;
  padding: ${(props) => (props.open ? '25px 0' : '0')};
  transition: all 0.3s ease-out;
`;

const Heading = styled.h2`
  padding: 3px;
  background: #d1cfcf;
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
              <List title="To Do" toggleModal={handleToggleNewTask}>
                <ul className="todo" {...provided.droppableProps} ref={provided.innerRef}>
                  {toDoItems}
                  {provided.placeholder}
                </ul>
              </List>
            )}
          </Droppable>
          <Droppable droppableId="doing">
            {(provided) => (
              <List title="Doing" toggleModal={handleToggleNewTask}>
                <ul className="doing" {...provided.droppableProps} ref={provided.innerRef}>
                  {doingItems}
                  {provided.placeholder}
                </ul>
              </List>
            )}
          </Droppable>
          <Droppable droppableId="done">
            {(provided) => (
              <List title="Done" toggleModal={handleToggleNewTask}>
                <ul className="done" {...provided.droppableProps} ref={provided.innerRef}>
                  {doneItems}
                  {provided.placeholder}
                </ul>
              </List>
            )}
          </Droppable>
        </DragDropContext>
      </Wrapper>
    </div>
  );
};

export default ProjTasks;
