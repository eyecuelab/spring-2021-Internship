import React from 'react';
import styled from 'styled-components';
import ReactDatePicker from 'react-datepicker';
import { useForm, Controller } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';
import { Modal } from '../modal';
import * as selectors from '../../store/selectors';
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
      <Modal width="664px" color={theme.colors.teal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Header>Create New Project</Header>
          {/* eslint-disable react/jsx-props-no-spreading */}
          <Input placeholder="Project Name" {...register('projectName', { required: true })} />
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
          <ButtonWrapper>
            <Button type="button" onClick={toggleModal} margin="458px">
              Cancel
            </Button>
            <Button type="submit" margin="15px">
              Submit
            </Button>
          </ButtonWrapper>
        </form>
      </Modal>
    </>
  );
};

export default NewProjectModal;
