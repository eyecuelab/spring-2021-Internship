import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import { Modal } from '../modal';

type ModalProps = {
  addNewTask: (taskName: string, taskStatus: string) => void;
  toggleModal: () => void;
  defaultForm: string;
};

type Inputs = {
  taskName: string;
  taskStatus: string;
};

const NewTaskModal = ({ addNewTask, toggleModal, defaultForm }: ModalProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  // eslint-disable-next-line
  const onSubmit = (data: any) => addNewTask(data.taskName, data.taskStatus);
  return (
    <>
      <Modal toggleModal={toggleModal} width="350px">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Field>
            <Form.Input placeholder="Task Name" {...register('taskName', { required: true })} />
            {errors.taskName && <p>This field is required</p>}
          </Form.Field>
          <select {...register('taskStatus', { required: true })}>
            {defaultForm === 'todo' ? (
              <option selected value="todo">
                To Do
              </option>
            ) : (
              <option value="todo">To Do</option>
            )}
            {defaultForm === 'doing' ? (
              <option selected value="doing">
                Doing
              </option>
            ) : (
              <option value="doing">Doing</option>
            )}
            {defaultForm === 'done' ? (
              <option selected value="done">
                Done
              </option>
            ) : (
              <option value="done">Done</option>
            )}
          </select>
          <Button type="submit">Submit</Button>
        </Form>
      </Modal>
    </>
  );
};

export default NewTaskModal;
