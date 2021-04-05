import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useStore } from 'react-redux';
import LoginForm from './containers/loginForm';
import UserHub from './containers/userHub';
import './App.css';

function App(): JSX.Element {
  const store = useStore();
  const loggedIn = store.getState().user.uuid;

  return (
    <Router>
      <Switch>
        <Route path="/hub">
          <UserHub />
        </Route>
        <Route path="/">{loggedIn !== '' ? <Redirect to="/hub" /> : <LoginForm />}</Route>
      </Switch>
    </Router>
  );
}

export default App;
