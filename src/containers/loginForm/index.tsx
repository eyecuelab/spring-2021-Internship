import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { setEmail, setPassword, setUUID } from '../../store/slices/loginSlice';

type Inputs = {
  email: string;
  password: string;
};

const LoginForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  function submitUser(email: string, password: string) {
    dispatch(setEmail(email));
    dispatch(setPassword(password));
    dispatch(setUUID());
  }

  const onSubmit = (data: any) => submitUser(data.email, data.password);

  return (
    <>
      <p>Sign In:</p>
      <form id="signInForm" onSubmit={handleSubmit(onSubmit)}>
        {/* eslint-disable react/jsx-props-no-spreading */}
        <input placeholder="Email Address" {...register('email', { required: true })} />
        {errors.email && <p>This field is required</p>}
        {/* eslint-disable react/jsx-props-no-spreading */}
        <input placeholder="Password" {...register('password', { required: true })} />
        {errors.password && <p>This field is required</p>}
        <input type="submit" />
      </form>
    </>
  );
};

export default LoginForm;
