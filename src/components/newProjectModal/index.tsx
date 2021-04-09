import React from 'react';
import ReactDatePicker from 'react-datepicker';
import { useForm, Controller } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import { Modal } from '../modal';

type ModalProps = {
  createNewProject: (projectName: string, dueDate: Date) => void;
  toggleModal: () => void;
};

type Inputs = {
  projectName: string;
  dueDate: Date;
};

const NewProjectModal = ({ createNewProject, toggleModal }: ModalProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();
  // eslint-disable-next-line
  const onSubmit = (data: any) => createNewProject(data.projectName, data.dueDate);
  return (
    <>
      <Modal width="250px" toggleModal={toggleModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* eslint-disable react/jsx-props-no-spreading */}
          <input defaultValue="test" {...register('projectName', { required: true })} />
          {errors.projectName && <p>This field is required</p>}
          {/* <input type="datetime" placeholder="Due Date" {...register('dueDate')} /> */}
          <Controller
            control={control}
            name="dueDate"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <ReactDatePicker onChange={onChange} onBlur={onBlur} selected={value} />
            )}
          />
          <input type="submit" />
        </form>
      </Modal>
    </>
  );
};

export default NewProjectModal;
