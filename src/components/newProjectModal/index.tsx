import React from 'react';
import ReactDatePicker from 'react-datepicker';
import { useForm, Controller } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import { Form, Button } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { Modal } from '../modal';
import * as selectors from '../../store/selectors';
import theme from '../../styles/theme';

type ModalProps = {
  addProject: (projectName: string, startDate: string, endDate: string, uuid: string) => void;
  toggleModal: () => void;
};

type Inputs = {
  projectName: string;
  startDate: Date;
  endDate: Date;
};

const NewProjectModal = ({ addProject, toggleModal }: ModalProps): JSX.Element => {
  const uuid = useSelector(selectors.selectUUID);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();
  // eslint-disable-next-line
  const onSubmit = (data: any) => {
    addProject(data.projectName, data.startDate, data.endDate, uuid);
    toggleModal();
  };
  return (
    <>
      <Modal width="250px" color={theme.colors.burntOrange}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* eslint-disable react/jsx-props-no-spreading */}
          <Form.Input placeholder="Project Name" {...register('projectName', { required: true })} />
          {errors.projectName && <p>This field is required</p>}
          {/* <input type="datetime" placeholder="Due Date" {...register('endDate')} /> */}
          <Controller
            control={control}
            name="startDate"
            render={({ field: { onChange, onBlur, value } }) => (
              <ReactDatePicker
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
                placeholderText="Set Start Date"
              />
            )}
          />
          <Controller
            control={control}
            name="endDate"
            render={({ field: { onChange, onBlur, value } }) => (
              <ReactDatePicker
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
                placeholderText="Set End Date"
              />
            )}
          />
          <Button type="button" onClick={toggleModal} margin="458px">
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </Form>
      </Modal>
    </>
  );
};

export default NewProjectModal;
