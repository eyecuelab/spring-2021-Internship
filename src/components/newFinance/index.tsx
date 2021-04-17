import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Modal } from '../modal';

type ModalProps = {
  addNewFinance: (
    itemName: string,
    itemPrice: number,
    quantity: number,
    category: string,
    date: Date,
    minutes: number,
    hours: number
  ) => void;
  toggleModal: () => void;
};

type Inputs = {
  category: string;
  itemName: string;
  itemPrice: number;
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
  const [formType, setFormType] = useState('materials');
  const onSubmit = (data: Inputs) =>
    addNewFinance(
      data.itemName,
      data.itemPrice,
      data.quantity,
      formType,
      data.date,
      data.minutes,
      data.hours
    );

  const handleChange = (event: any) => {
    setFormType(event.target.value);
  };

  const MaterialForm = () => {
    return (
      <>
        <input placeholder="Material Name" {...register('itemName', { required: true })} />
        {errors.itemName && <p>This field is required</p>}
        <input type="float" placeholder="Price (per unit)" {...register('itemPrice', { min: 0 })} />
        {errors.itemPrice && <p>This must be greater than or equal to 0</p>}
        <input type="number" placeholder="Quantity" {...register('quantity', { min: 1 })} />
        {errors.quantity && <p>This must be higher than 0</p>}
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
          render={({ field: { onChange, onBlur, value } }) => (
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
        <input type="float" placeholder="itemPrice" {...register('itemPrice', { min: 0 })} />
        {errors.itemPrice && <p>This must be greater than or equal to 0</p>}
      </>
    );
  };

  return (
    <>
      <Modal width="250px" toggleModal={toggleModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* eslint-disable react/jsx-props-no-spreading */}
          <select onChange={handleChange}>
            <option value="materials">Material</option>
            <option value="labor">Labor</option>
            <option value="other">Other</option>
          </select>
          {formType === 'materials' && <MaterialForm />}
          {formType === 'labor' && <LaborForm />}
          {formType === 'other' && <OtherForm />}
          <input type="submit" />
        </form>
      </Modal>
    </>
  );
};

export default NewFinance;
