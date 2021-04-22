import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Form } from 'semantic-ui-react';
import { MaterialItem, LaborItem, OtherItem } from '../../store/slices/projectSlice';
import { Modal } from '../modal';

type ModalProps = {
  addMaterialItem: (item: MaterialItem) => void;
  addLaborItem: (item: LaborItem) => void;
  addOtherItem: (item: OtherItem) => void;
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
  addMaterialItem,
  addLaborItem,
  addOtherItem,
  defaultForm,
}: ModalProps): JSX.Element => {
  const [formType, setFormType] = useState(defaultForm);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();
  // eslint-disable-next-line
  const onMaterialSubmit = (data: MaterialItem) => addMaterialItem(data);
  const onLaborSubmit = (data: LaborItem) => {
    addLaborItem(data);
  };
  const onOtherSubmit = (data: OtherItem) => addOtherItem(data);

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
        <Form.Button type="submit" onClick={handleSubmit(onMaterialSubmit)}>
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
        <Form.Button type="submit" onClick={handleSubmit(onLaborSubmit)}>
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
        <Form.Button type="submit" onClick={handleSubmit(onOtherSubmit)}>
          Submit
        </Form.Button>
      </>
    );
  };

  return (
    <>
      <Modal width="250px" toggleModal={toggleModal}>
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
          {/* <Form.Button type="submit"> Submit </Form.Button> */}
        </Form>
      </Modal>
    </>
  );
};

export default NewFinance;
