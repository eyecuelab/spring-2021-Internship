import React from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '../modal';

type ModalProps = {
  addNewFinance: (itemName: string) => void;
  toggleModal: () => void;
};

type Inputs = {
  itemName: string;
};

const NewFinance = ({ toggleModal, addNewFinance }: ModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  // eslint-disable-next-line
  const onSubmit = (data: any) => addNewFinance(data.itemName);

  return (
    <>
      <Modal width="250px" toggleModal={toggleModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* eslint-disable react/jsx-props-no-spreading */}
          <input defaultValue="test" {...register('itemName', { required: true })} />
          {errors.itemName && <p>This field is required</p>}
          <input type="submit" />
        </form>
      </Modal>
    </>
  );
};

export default NewFinance;
