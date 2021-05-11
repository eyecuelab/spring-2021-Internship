import React from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import styled from 'styled-components';
import List from '../list';
import theme from '../../styles/theme';
import SmallButton from '../smallButton';
import SmButton from '../../assets/img/SmButton.svg';
import Tear from '../../assets/img/TaskTear.svg';

const Layout = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  background: ${(props) => props.theme.colors.grey};
`;

const Wrapper = styled.div`
  background: ${(props) => props.theme.colors.grey};
  width: 1120px;
  max-height: 100%;
  padding-top: 25px;
  padding-bottom: 110px;
  position: relative;
  margin-top: -33px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 0px;
`;

const Footer = styled.div`
  position: absolute;
  z-index: 2;
  width: 1120px;
  margin-top: -80px;
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
      <Layout>
        <Wrapper>
          <SmallButton
            buttonText="New Task"
            size="12px"
            margin="-10px 0px auto 120px"
            img={SmButton}
            color={theme.colors.white}
            onClick={handleToggleNewTask}
          />
          <HeaderText id="tasks">Tasks</HeaderText>
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
        <Footer>
          <img src={Tear} alt="torn paper edge" />
        </Footer>
      </Layout>
    </>
  );
};

export default ProjTasks;
