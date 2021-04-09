import React from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '../modal';

type ModalProps = {
  addNewFinance: (itemName: string, itemPrice: string, quantity: number) => void;
  toggleModal: () => void;
};

type Inputs = {
  itemName: string;
  itemPrice: string;
  quantity: number;
};

const NewFinance = ({ toggleModal, addNewFinance }: ModalProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  // eslint-disable-next-line
  const onSubmit = (data: any) => addNewFinance(data.itemName, data.itemPrice, data.quantity);

  return (
    <>
      <Modal width="250px" toggleModal={toggleModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* eslint-disable react/jsx-props-no-spreading */}
          <input defaultValue="test" {...register('itemName', { required: true })} />
          {errors.itemName && <p>This field is required</p>}
          <input type="number" placeholder="itemPrice" {...register('itemPrice')} />
          <input type="number" placeholder="quantity" {...register('quantity')} />

          <input type="submit" />
        </form>
      </Modal>
    </>
  );
};

export default NewFinance;
