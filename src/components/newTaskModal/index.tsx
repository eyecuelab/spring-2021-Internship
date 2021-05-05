import React from 'react';
import { useSelector } from 'react-redux';
import { Form, Button, TextArea } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import * as selectors from '../../store/selectors';
import { Modal } from '../modal';

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
    addNewTask(data.taskName, data.taskDesc, data.taskStatus, project);
  };
  return (
    <>
      <Modal toggleModal={toggleModal} width="350px">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Field>
            <Form.Input placeholder="Task Name" {...register('taskName', { required: true })} />
            {errors.taskName && <p>This field is required</p>}
            <TextArea placeholder="Task Description" {...register('taskDesc')} />
          </Form.Field>
          <select {...register('taskStatus', { required: true })}>
            <option selected value="todo">
              To Do
            </option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
          <Button type="submit">Submit</Button>
        </Form>
      </Modal>
    </>
  );
};

export default NewTaskModal;
