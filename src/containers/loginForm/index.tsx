import React from 'react';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import styled from 'styled-components';
import { signIn } from '../../store/slices/userSlice/thunks';
import { Modal } from '../../components/modal';
import theme from '../../styles/theme';
import Curo from '../../assets/img/Curo.svg';

const Wrapper = styled.div`
  background: ${(props) => props.theme.colors.offWhite};
  padding-top: 150px;
  height: calc(100vh - 51px);
`;

const Text = styled.h2`
  font-family: ${(props) => props.theme.font};
  font-size: ${(props) => props.theme.fontSizes.small};
  color: ${(props) => props.theme.colors.white};
  padding-bottom: 20px;
`;

const LoginWrapper = styled.div`
  justify-content: center;
  display: flex;
  margin: 0 auto 15px auto;
`;

export const Logo = styled.img.attrs({ src: `${Curo}` })`
  height: 48px;
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
        <Modal width="400px" color={theme.colors.burntOrange}>
          <>
            <LoginWrapper>
              <Logo />
            </LoginWrapper>

            <Text>Please log in with Google to continue</Text>
            <LoginWrapper>
              <GoogleLogin
                clientId={clientId}
                buttonText="Log in with Google"
                onSuccess={handleLogin}
                onFailure={handleLogin}
                cookiePolicy="single_host_origin"
              />
            </LoginWrapper>
          </>
        </Modal>
      </Wrapper>
    </>
  );
};

export default LoginForm;
