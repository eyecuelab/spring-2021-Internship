import React from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '../modal';

type ModalProps = {
  nameUpdate: (projectName: string) => void;
  toggleModal: () => void;
};

type Inputs = {
  projectName: string;
};

const NewProjectModal = ({ nameUpdate, toggleModal }: ModalProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  // eslint-disable-next-line
  const onSubmit = (data: any) => nameUpdate(data.projectName);

  return (
    <>
      <Modal width="250px" toggleModal={toggleModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* eslint-disable react/jsx-props-no-spreading */}
          <input defaultValue="test" {...register('projectName', { required: true })} />
          {errors.projectName && <p>This field is required</p>}
          <input type="submit" />
        </form>
      </Modal>
    </>
  );
};

export default NewProjectModal;
