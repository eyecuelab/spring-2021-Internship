import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import * as selectors from '../../store/selectors';
import { Modal } from '../modal';
import theme from '../../styles/theme';

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

type ModalProps = {
  addNewTask: (taskName: string, taskDesc: string, taskStatus: string, project: number) => void;
  toggleModal: () => void;
};

type Inputs = {
  taskName: string;
  taskStatus: string;
  taskDesc: string;
};

const NewTaskModal = ({ addNewTask, toggleModal }: ModalProps): JSX.Element => {
  const projectId = useSelector(selectors.selectProjectId);
  const project = parseInt(projectId, 10);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  // eslint-disable-next-line
  const onSubmit = (data: any) => {
    addNewTask(data.taskName, data.taskDesc, 'todo', project);
  };
  return (
    <>
      <Modal toggleModal={toggleModal} width="664px" color={theme.colors.burntOrange}>
        <>
          <Header>Create New Task</Header>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input placeholder="Enter Task..." {...register('taskName', { required: true })} />
            {errors.taskName && <p>This field is required</p>}
            <TextArea placeholder="Details" {...register('taskDesc')} />
            <ButtonWrapper>
              <Button type="button" onClick={toggleModal} margin="458px">
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

export default NewTaskModal;
