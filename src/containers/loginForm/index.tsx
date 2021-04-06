import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setPassword, setUUID } from '../../store/slices/loginSlice';
import { RootState } from '../../store/store';

const LoginForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const currentUUID = useSelector((state: RootState) => state.user.uuid);

  function cleanUp() {
    setUserEmail('');
    setUserPassword('');
  }
  useEffect(() => {
    return cleanUp();
  }, [currentUUID]);

  function submitUser() {
    dispatch(setEmail(String(userEmail)));
    dispatch(setPassword(String(userPassword)));
    dispatch(setUUID());
  }

  return (
    <>
      <p>Sign In:</p>
      <form id="signInForm">
        <input
          name="email"
          type="text"
          placeholder="Email Address"
          onChange={(event) => setUserEmail(event.target.value)}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={(event) => setUserPassword(event.target.value)}
        />
        <button type="submit" onClick={() => submitUser()}>
          Submit
        </button>
      </form>
    </>
  );
};

export default LoginForm;
