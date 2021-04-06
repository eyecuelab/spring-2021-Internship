import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginForm from './containers/loginForm';
import UserHub from './containers/userHub';
import Project from './containers/project';
import './App.css';
import { RootState } from './store/store';

function App(): JSX.Element {
  const loggedIn = useSelector((state: RootState) => state.user.uuid);

  return (
    <Router>
      <Switch>
        <Route path="/project">
          <Project />
        </Route>
        <Route path="/hub">
          <UserHub />
        </Route>
        <Route path="/">{loggedIn !== '' ? <Redirect to="/hub" /> : <LoginForm />}</Route>
      </Switch>
    </Router>
  );
}

export default App;
