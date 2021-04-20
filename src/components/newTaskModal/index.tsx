import React from 'react';
import { Form, Button, Select } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import { Modal } from '../modal';

type ModalProps = {
  addNewTask: (taskName: string, taskStatus: string) => void;
  toggleModal: () => void;
};

type Inputs = {
  taskName: string;
  taskStatus: string;
};

const NewTaskModal = ({ addNewTask, toggleModal }: ModalProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  // eslint-disable-next-line
  const onSubmit = (data: any) => addNewTask(data.taskName, data.taskStatus);
  const statusOptions = [
    { key: 'todo', value: 'todo', text: 'To Do' },
    { key: 'doing', value: 'doing', text: 'Doing' },
    { key: 'done', value: 'done', text: 'Done' },
  ];
  return (
    <>
      <Modal toggleModal={toggleModal} width="350px">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Field>
            <input placeholder="Task Name" {...register('taskName', { required: true })} />
            {errors.taskName && <p>This field is required</p>}
          </Form.Field>
          <select {...register('taskStatus', { required: true })}>
            <option value="todo">To Do</option>
            <option value="doing"> Doing</option>
            <option value="done"> Done</option>
          </select>
          {/* <Select
            placeholder="Status"
            options={statusOptions}
            {...register('taskStatus', { required: true })}
          /> */}

          <Button type="submit">Submit</Button>
        </Form>
      </Modal>
    </>
  );
};

export default NewTaskModal;
