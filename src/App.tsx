import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as selectors from './store/selectors';
import LoginForm from './containers/loginForm';
import UserHub from './containers/userHub';
import Project from './containers/project';
import NavBar from './components/navBar';
import './App.css';

function App(): JSX.Element {
  const loggedIn = useSelector(selectors.selectUUID);
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/project">{loggedIn === '' ? <Redirect to="/" /> : <Project />}</Route>
        <Route path="/hub">{loggedIn === '' ? <Redirect to="/" /> : <UserHub />}</Route>
        <Route path="/">{loggedIn !== '' ? <Redirect to="/hub" /> : <LoginForm />}</Route>
      </Switch>
    </Router>
  );
}

export default App;
