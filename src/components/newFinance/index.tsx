import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Form } from 'semantic-ui-react';
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
  defaultForm: string;
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

const NewFinance = ({ toggleModal, addNewFinance, defaultForm }: ModalProps): JSX.Element => {
  const [formType, setFormType] = useState(defaultForm);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();
  // eslint-disable-next-line
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormType(event.target.value);
  };

  const MaterialForm = () => {
    return (
      <>
        <Form>
          <Form.Input placeholder="Material Name" {...register('itemName', { required: true })} />
          {errors.itemName && <p>This field is required</p>}
          <Form.Input
            type="number"
            placeholder="Price (per unit)"
            {...register('itemPrice', { min: 0 })}
          />
          {errors.itemPrice && <p>This must be greater than or equal to 0</p>}
          <Form.Input type="number" placeholder="Quantity" {...register('quantity', { min: 1 })} />
          {errors.quantity && <p>This must be higher than 0</p>}
        </Form>
      </>
    );
  };

  const LaborForm = () => {
    return (
      <>
        <Form>
          <Form.Input placeholder="Activity Name" {...register('itemName', { required: true })} />
          {errors.itemName && <p>This field is required</p>}
          <Form.Input type="number" placeholder="Hour(s)" {...register('hours')} />
          <Form.Input type="number" placeholder="Minutes" {...register('minutes')} />
          <Controller
            control={control}
            name="date"
            render={({ field: { onChange, onBlur, value } }) => (
              <ReactDatePicker
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
                placeholderText="Choose a Date"
              />
            )}
          />
        </Form>
      </>
    );
  };
  const OtherForm = () => {
    return (
      <>
        <Form>
          <Form.Input placeholder="Item Name" {...register('itemName', { required: true })} />
          {errors.itemName && <p>This field is required</p>}
          <Form.Input
            type="number"
            placeholder="Item Price"
            {...register('itemPrice', { min: 0 })}
          />
          {errors.itemPrice && <p>This must be greater than or equal to 0</p>}
        </Form>
      </>
    );
  };

  return (
    <>
      <Modal width="250px" toggleModal={toggleModal}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* eslint-disable react/jsx-props-no-spreading */}
          <select onChange={handleChange}>
            {defaultForm === 'materials' ? (
              <option selected value="materials">
                Material
              </option>
            ) : (
              <option value="materials">Material</option>
            )}
            {defaultForm === 'labor' ? (
              <option selected value="labor">
                Labor
              </option>
            ) : (
              <option value="Labor">Labor</option>
            )}
            {defaultForm === 'other' ? (
              <option selected value="other">
                Other
              </option>
            ) : (
              <option value="other">Other</option>
            )}
          </select>
          {formType === 'materials' && <MaterialForm />}
          {formType === 'labor' && <LaborForm />}
          {formType === 'other' && <OtherForm />}
          <Form.Button type="submit"> Submit </Form.Button>
        </Form>
      </Modal>
    </>
  );
};

export default NewFinance;
