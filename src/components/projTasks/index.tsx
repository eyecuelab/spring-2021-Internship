import React from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import styled from 'styled-components';
import List from '../list';
import theme from '../../styles/theme';
import SmallButton from '../smallButton';
import SmButton from '../../assets/img/SmButton.svg';

const Wrapper = styled.div`
  background: ${(props) => props.theme.colors.grey};
  max-height: 100%;
  overflow: hidden;
  padding: 25px 0;
  position: relative;
`;

const HeaderText = styled.p`
  position: absolute;
  top: 37px;
  font-family: ${(props) => props.theme.font};
  color: ${(props) => props.theme.colors.black};
  opacity: 0.2;
  line-height: 17px;
  left: 48px;
  font-size: 24px;
`;

const ListRow = styled.div`
  display: flex;
  margin-top: 80px;
  margin-left: 40px;
`;

const TaskContainer = styled.div`
  background: ${(props) => props.theme.colors.darkGrey};
  border-radius: 3px;
  width: 333px;
  margin: 10px;
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
};

const ProjTasks = ({
  toDoItems,
  doingItems,
  doneItems,
  handleOnDragEnd,
  handleToggleNewTask,
}: ProjTasksProps): JSX.Element => {
  return (
    <>
      <Wrapper>
        <SmallButton
          buttonText="New Task"
          size="12px"
          margin="-10px 0px auto 120px"
          img={SmButton}
          color={theme.colors.white}
          onClick={handleToggleNewTask}
        />
        <HeaderText>Tasks</HeaderText>
        <ListRow>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="todo">
              {(provided) => (
                <List title="To Do">
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
                <List title="Doing">
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
                <List title="Done">
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
        </ListRow>
      </Wrapper>
    </>
  );
};

export default ProjTasks;
