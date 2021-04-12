import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '../modal';

type ModalProps = {
  addNewFinance: (itemName: string, itemPrice: string, quantity: number, category: string) => void;
  toggleModal: () => void;
};

type Inputs = {
  category: string;
  itemName: string;
  itemPrice: string;
  quantity: number;
  minutes: number;
  date: Date;
};

const NewFinance = ({ toggleModal, addNewFinance }: ModalProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  // eslint-disable-next-line
  const [formType, setFormType] = useState('material');
  const onSubmit = (data: any) =>
    addNewFinance(data.itemName, data.itemPrice, data.quantity, formType);

  const handleChange = (event: any) => {
    setFormType(event.target.value);
  };

  const MaterialForm = () => {
    return (
      <>
        <input defaultValue="test" {...register('itemName', { required: true })} />
        {errors.itemName && <p>This field is required</p>}
        <input type="number" placeholder="itemPrice" {...register('itemPrice')} />
        <input type="number" placeholder="quantity" {...register('quantity')} />
      </>
    );
  };

  const LaborForm = () => {
    return (
      <>
        <input defaultValue="test" {...register('itemName', { required: true })} />
        {errors.itemName && <p>This field is required</p>}
        <input type="number" placeholder="minutes" {...register('minutes')} />
        <input type="number" placeholder="date" {...register('date')} />
      </>
    );
  };
  const OtherForm = () => {
    return (
      <>
        <input defaultValue="test" {...register('itemName', { required: true })} />
        {errors.itemName && <p>This field is required</p>}
        <input type="number" placeholder="itemPrice" {...register('itemPrice')} />
        <input type="number" placeholder="quantity" {...register('quantity')} />
      </>
    );
  };

  return (
    <>
      <Modal width="250px" toggleModal={toggleModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* eslint-disable react/jsx-props-no-spreading */}
          <select onChange={handleChange}>
            <option value="material">Material</option>
            <option value="labor">Labor</option>
            <option value="other">Other</option>
          </select>
          {formType === 'material' && <MaterialForm />}
          {formType === 'labor' && <LaborForm />}
          {formType === 'other' && <OtherForm />}
          <input type="submit" />
        </form>
      </Modal>
    </>
  );
};

export default NewFinance;
