import React from 'react';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import styled from 'styled-components';
import { signIn } from '../../store/slices/userSlice/thunks';

const Wrapper = styled.div`
  background: ${(props) => props.theme.colors.offWhite};
  padding-top: 150px;
  height: 100vh;
`;

const clientId: string = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID ?? '';

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
