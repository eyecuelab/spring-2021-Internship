import React from 'react';
import ReactDatePicker from 'react-datepicker';
import { useForm, Controller } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import { Form, Button } from 'semantic-ui-react';
import { Modal } from '../modal';

type ModalProps = {
  createNewProject: (projectName: string, endDate: string) => void;
  toggleModal: () => void;
};

type Inputs = {
  projectName: string;
  endDate: Date;
};

const NewProjectModal = ({ createNewProject, toggleModal }: ModalProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();
  // eslint-disable-next-line
  const onSubmit = (data: any) => {
    createNewProject(data.projectName, data.endDate);
    toggleModal();
  };
  return (
    <>
      <Modal width="250px" toggleModal={toggleModal}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* eslint-disable react/jsx-props-no-spreading */}
          <Form.Input placeholder="Project Name" {...register('projectName', { required: true })} />
          {errors.projectName && <p>This field is required</p>}
          {/* <input type="datetime" placeholder="Due Date" {...register('endDate')} /> */}
          <Controller
            control={control}
            name="endDate"
            render={({ field: { onChange, onBlur, value } }) => (
              <ReactDatePicker
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
                placeholderText="Set Due Date"
              />
            )}
          />
          <Button type="submit">Submit</Button>
        </Form>
      </Modal>
    </>
  );
};

export default NewProjectModal;
