import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginForm from './containers/loginForm';
import UserHub from './containers/userHub';
import './App.css';

function App(): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route path="/hub">
          <UserHub />
        </Route>
        <Route path="/">
          <LoginForm />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
