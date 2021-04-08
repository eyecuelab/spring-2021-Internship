import React from 'react';
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

  return (
    <>
      <Modal toggleModal={toggleModal} width="350px">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input defaultValue="test" {...register('taskName', { required: true })} />
          {errors.taskName && <p>This field is required</p>}

          <select {...register('taskStatus', { required: true })}>
            <option value="To Do">To Do</option>
            <option value="Doing"> Doing</option>
            <option value="Done"> Done</option>
          </select>
          <input type="submit" />
        </form>
      </Modal>
    </>
  );
};

export default NewTaskModal;
