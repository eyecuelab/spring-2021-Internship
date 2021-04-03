import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { selectUser, setEmail, setPassword, setUUID } from './loginSlice';
import { useHistory } from "react-router-dom";


const LoginForm = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  function submitUser() {
    dispatch(setEmail(String(userEmail)));
    dispatch(setPassword(String(userPassword)));
    dispatch(setUUID());
    history.push("/hub");
  }

  return (
    <>
      <p>Sign In:</p>
      <form>
        <input
          name="email"
          type="text"
          value={userEmail}
          placeholder="Email Address" 
          onChange={event => setUserEmail(event.target.value)}/>
        <input
          name="password"
          type="text"
          value={userPassword}
          placeholder="Password" 
          onChange={event => setUserPassword(event.target.value)}/>
        <button onClick={() => submitUser()}>Submit</button>
      </form>
    </>
  );
}

export default LoginForm;