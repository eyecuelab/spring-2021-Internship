import React from 'react';
import { useDispatch } from 'react-redux';
// import { useForm } from 'react-hook-form';
// import { Form } from 'semantic-ui-react';
import { GoogleLogin } from 'react-google-login';
import { signIn } from '../../store/slices/userSlice/thunks';

// type Inputs = {
//   email: string;
//   password: string;
// };

const clientId: string = process.env.REACT_APP_CLIENT_ID ?? '';

const LoginForm = (): JSX.Element => {
  const dispatch = useDispatch();
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<Inputs>();

  // function submitUser(email: string, password: string) {
  //   dispatch(setEmail(email));
  //   dispatch(setPassword(password));
  //   dispatch(setUUID());
  // }
  // eslint-disable-next-line
  // const onSubmit = (data: any) => submitUser(data.email, data.password);

  function handleLogin(googleData: any) {
    dispatch(signIn(googleData));
  }

  return (
    <>
      <GoogleLogin
        clientId={clientId}
        buttonText="Log in with Google"
        onSuccess={handleLogin}
        onFailure={handleLogin}
        cookiePolicy="single_host_origin"
      />
      {/* <p>Sign In:</p>
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
      </Form> */}
    </>
  );
};

export default LoginForm;
