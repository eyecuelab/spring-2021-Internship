import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

type ModalProps = {
  addNewTask: (taskName: string, taskStatus: string) => void;
};

type Inputs = {
  taskName: string;
  taskStatus: string;
};

const Wrapper = styled.div`
  position: fixed;
  justify-content: center;
  z-index: 9;
  background: white;
  display: block;
  margin-left: 30vw;
  margin-right: 30vw;
  width: 40vw;
`;

const NewTaskModal = ({ addNewTask }: ModalProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit = (data: any) => addNewTask(data.taskName, data.taskStatus);

  return (
    <>
      <Wrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input defaultValue="test" {...register('taskName', { required: true })} />
          {errors.taskName && <p>This field is required</p>}

          <select {...register('taskStatus', { required: true })}>
            <option value="To Do">To Do</option>
            <option value=" Doing"> Doing</option>
            <option value=" Done"> Done</option>
          </select>

          <input type="submit" />
        </form>
      </Wrapper>
    </>
  );
};

export default NewTaskModal;
