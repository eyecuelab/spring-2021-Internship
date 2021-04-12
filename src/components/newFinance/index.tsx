import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Modal } from '../modal';

type ModalProps = {
  addNewFinance: (
    itemName: string,
    itemPrice: string,
    quantity: number,
    category: string,
    date: Date,
    minutes: number
  ) => void;
  toggleModal: () => void;
};

type Inputs = {
  category: string;
  itemName: string;
  itemPrice: string;
  quantity: number;
  hours: number;
  minutes: number;
  date: Date;
};

const NewFinance = ({ toggleModal, addNewFinance }: ModalProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();
  // eslint-disable-next-line
  const [formType, setFormType] = useState('material');
  const onSubmit = (data: any) =>
    addNewFinance(
      data.itemName,
      data.itemPrice,
      data.quantity,
      formType,
      data.date,
      data.minutes + data.hours / 60
    );

  const handleChange = (event: any) => {
    setFormType(event.target.value);
  };

  const MaterialForm = () => {
    return (
      <>
        <input placeholder="Material Name" {...register('itemName', { required: true })} />
        {errors.itemName && <p>This field is required</p>}
        <input type="number" placeholder="Price (per unit)" {...register('itemPrice')} />
        <input type="number" placeholder="Quantity" {...register('quantity')} />
      </>
    );
  };

  const LaborForm = () => {
    return (
      <>
        <input defaultValue="test" {...register('itemName', { required: true })} />
        {errors.itemName && <p>This field is required</p>}
        <input type="number" placeholder="hour(s)" {...register('hours')} />
        <input type="number" placeholder="minutes" {...register('minutes')} />
        <Controller
          control={control}
          name="date"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <ReactDatePicker onChange={onChange} onBlur={onBlur} selected={value} />
          )}
        />
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
