import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Form } from 'semantic-ui-react';
import { setEmail, setPassword, setUUID } from '../../store/slices/authSlice';

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
  // eslint-disable-next-line
  const onSubmit = (data: any) => submitUser(data.email, data.password);

  return (
    <>
      <p>Sign In:</p>
      <Form id="signInForm" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Input placeholder="Email Address" {...register('email', { required: true })} />
          {errors.email && <p>This field is required</p>}

          <Form.Input
            type="password"
            placeholder="Password"
            {...register('password', { required: true })}
          />
          {errors.password && <p>This field is required</p>}
        </Form.Group>
        <Form.Button type="submit">Log In</Form.Button>
      </Form>
    </>
  );
};

export default LoginForm;
