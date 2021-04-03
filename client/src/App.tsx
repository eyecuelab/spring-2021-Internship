import React from 'react';
import LoginForm from './containers/loginForm';
import UserHub from './containers/userHub';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';

function App() {
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
