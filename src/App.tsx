import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import * as selectors from './store/selectors';
import LoginForm from './containers/loginForm';
import Project from './containers/project';
import NavBar from './components/navBar';
import Footer from './components/footer';
import theme from './styles/theme';
import './App.css';
import GlobalStyles from './styles/globalStyles';

function App(): JSX.Element {
  const loggedIn = useSelector(selectors.selectUUID);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <NavBar />
        <Switch>
          <Route path="/project">{!loggedIn ? <Redirect to="/" /> : <Project />}</Route>
          <Route path="/">{loggedIn ? <Redirect to="/project" /> : <LoginForm />}</Route>
        </Switch>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
