import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Form } from 'semantic-ui-react';
import * as selectors from '../../store/selectors';
import theme from '../../styles/theme';
import { Modal } from '../modal';

type ModalProps = {
  addItem: (
    itemName: string,
    itemPrice: number,
    quantity: number,
    category: string,
    date: string,
    minutes: number,
    hours: number,
    project: number
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

const NewFinance = ({
  toggleModal,
  addItem,
  // addLaborItem,
  // addOtherItem,
  defaultForm,
}: ModalProps): JSX.Element => {
  const [formType, setFormType] = useState('materials');
  const projectId = useSelector(selectors.selectProjectId);
  const project = parseInt(projectId, 10);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = (data: Inputs) => {
    addItem(
      data.itemName,
      data.itemPrice,
      data.quantity,
      data.category,
      data.date?.toString(),
      data.minutes,
      data.hours,
      project
    );
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormType(event.target.value);
  };

  const MaterialForm = () => {
    return (
      <>
        <Form.Input placeholder="Material Name" {...register('itemName', { required: true })} />
        {errors.itemName && <p>This field is required</p>}
        <Form.Input
          type="number"
          placeholder="Price (per unit)"
          {...register('itemPrice', { required: true, min: 0 })}
        />
        {errors.itemPrice && <p>This must be greater than or equal to 0</p>}
        <Form.Input
          type="number"
          placeholder="Quantity"
          {...register('quantity', { required: true, min: 1 })}
        />
        {errors.quantity && <p>This must be higher than 0</p>}
        <Form.Field>
          <input type="hidden" value="material" {...register('category')} />
        </Form.Field>
        <Form.Button type="submit" onClick={handleSubmit(onSubmit)}>
          Submit
        </Form.Button>
      </>
    );
  };

  const LaborForm = () => {
    return (
      <>
        <Form.Input placeholder="Activity Name" {...register('itemName', { required: true })} />
        {errors.itemName && <p>This field is required</p>}
        <Form.Input
          type="number"
          placeholder="Hour(s)"
          {...register('hours', { required: true })}
        />
        <Form.Input
          type="number"
          placeholder="Minutes"
          {...register('minutes', { required: true })}
        />
        <Form.Field>
          <input type="hidden" value="labor" {...register('category')} />
        </Form.Field>
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
        <Form.Button type="submit" onClick={handleSubmit(onSubmit)}>
          Submit
        </Form.Button>
      </>
    );
  };
  const OtherForm = () => {
    return (
      <>
        <Form.Input placeholder="Item Name" {...register('itemName', { required: true })} />
        {errors.itemName && <p>This field is required</p>}
        <Form.Input
          type="number"
          placeholder="Item Price"
          {...register('itemPrice', { required: true, min: 0 })}
        />
        {errors.itemPrice && <p>This must be greater than or equal to 0</p>}
        <Form.Field>
          <input type="hidden" value="other" {...register('category')} />
        </Form.Field>
        <Form.Button type="submit" onClick={handleSubmit(onSubmit)}>
          Submit
        </Form.Button>
      </>
    );
  };

  return (
    <>
      <Modal width="250px" toggleModal={toggleModal} color={theme.colors.burntOrange}>
        <Form>
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
              <option value="labor">Labor</option>
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
        </Form>
      </Modal>
    </>
  );
};

export default NewFinance;
