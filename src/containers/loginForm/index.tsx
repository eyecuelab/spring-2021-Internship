import React from 'react';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import styled from 'styled-components';
import { signIn } from '../../store/slices/userSlice/thunks';

const clientId: string = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID ?? '';
const Wrapper = styled.div`
  margin-top: 200px;
`;

const LoginForm = (): JSX.Element => {
  const dispatch = useDispatch();

  function handleLogin(googleData: any) {
    dispatch(signIn(googleData));
  }

  return (
    <>
      <Wrapper>
        <GoogleLogin
          clientId={clientId}
          buttonText="Log in with Google"
          onSuccess={handleLogin}
          onFailure={handleLogin}
          cookiePolicy="single_host_origin"
        />
      </Wrapper>
    </>
  );
};

export default LoginForm;
