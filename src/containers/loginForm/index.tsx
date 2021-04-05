import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setEmail, setPassword, setUUID } from './loginSlice';

const LoginForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  function submitUser() {
    dispatch(setEmail(String(userEmail)));
    dispatch(setPassword(String(userPassword)));
    dispatch(setUUID());
    history.push('/hub');
  }

  return (
    <>
      <p>Sign In:</p>
      <form id="signInForm">
        <input
          name="email"
          type="text"
          value={userEmail}
          placeholder="Email Address"
          onChange={(event) => setUserEmail(event.target.value)}
        />
        <input
          name="password"
          type="password"
          value={userPassword}
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
