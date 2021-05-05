import React from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import styled from 'styled-components';
import List from '../list';

const Wrapper = styled.div`
  background: ${(props) => props.theme.colors.grey};
  max-height: 100%;
  overflow: hidden;
  padding: 25px 0;
`;

const HeaderText = styled.p`
  position: relative;
  top: 37px;
  font-family: ${(props) => props.theme.font};
  color: ${(props) => props.theme.colors.black};
  opacity: 0.2;
  line-height: 17px;
`;

const ListRow = styled.div`
  justify-content: center;
  display: flex;
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
        <HeaderText style={{ left: '48px', fontSize: '24px' }}>Tasks</HeaderText>
        <ListRow>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="todo">
              {(provided) => (
                <List
                  title="To Do"
                  toggleModal={handleToggleNewTask}
                  setDefaultForm={setDefaultForm}
                >
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
                <List
                  title="Doing"
                  toggleModal={handleToggleNewTask}
                  setDefaultForm={setDefaultForm}
                >
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
                <List
                  title="Done"
                  toggleModal={handleToggleNewTask}
                  setDefaultForm={setDefaultForm}
                >
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
