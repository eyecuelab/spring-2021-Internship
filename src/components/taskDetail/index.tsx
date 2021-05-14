import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Modal } from '../modal';
import { TaskItem } from '../../store/slices/projectSlice';
import theme from '../../styles/theme';
import { updateTask } from '../../store/slices/projectSlice/thunks';

const Header = styled.h1`
  font-family: ${(props) => props.theme.font};
  font-size: ${(props) => props.theme.fontSizes.large};
  color: ${(props) => props.theme.colors.white};
  text-alight: left;
  margin-bottom: 36px;
`;

const Input = styled.input`
  width: 584px;
  height: 54px;
  font-family: ${(props) => props.theme.font};
  font-size: ${(props) => props.theme.fontSizes.small};
  padding: 18px;
  margin-bottom: 24px;
`;

const TextArea = styled.textarea`
  width: 584px;
  min-height: 151px;
  font-family: ${(props) => props.theme.font};
  font-size: ${(props) => props.theme.fontSizes.small};
  padding: 18px;
`;

const ButtonWrapper = styled.div`
  display: flex;
`;

const Button = styled.button<{ margin: string }>`
  display: inline;
  margin-top: 22px;
  margin-left: ${(props) => props.margin};
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: none;
  font-family: ${(props) => props.theme.font};
  color: ${(props) => props.theme.colors.white};
`;

type TaskDetailProps = {
  toggleModal: () => void;
  task: TaskItem;
  deleteTask: (id: string, taskStatus: string) => void;
};

type Inputs = {
  taskName: string;
  taskStatus: string;
  taskDesc: string;
};

const TaskDetail = ({ toggleModal, task, deleteTask }: TaskDetailProps): JSX.Element => {
  const dispatch = useDispatch();

  const handleUpdateTask = (
    taskName: string,
    taskId: string,
    taskStatus: string,
    taskDesc: string,
    updatedPosition: number
  ) => {
    const intId = parseInt(taskId, 10);
    dispatch(updateTask({ taskName, intId, taskStatus, taskDesc, updatedPosition }));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  // eslint-disable-next-line
  const onSubmit = (data: any) => {
    handleUpdateTask(data.taskName, task.id, task.taskStatus, data.taskDesc, task.position);
    toggleModal();
  };
  return (
    <>
      <Modal width="664px" color={theme.colors.burntOrange}>
        <>
          <Header>Task Detail</Header>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input defaultValue={task.taskName} {...register('taskName', { required: true })} />
            {errors.taskName && <p>This field is required</p>}
            <TextArea defaultValue={task.taskDesc} {...register('taskDesc')} />
            <ButtonWrapper>
              <Button
                type="button"
                onClick={() => deleteTask(task?.id, task?.taskStatus)}
                margin="0"
              >
                delete
              </Button>
              <Button type="button" onClick={toggleModal} margin="405px">
                Cancel
              </Button>
              <Button type="submit" margin="15px">
                Save
              </Button>
            </ButtonWrapper>
          </form>
        </>
      </Modal>
    </>
  );
};

export default TaskDetail;
