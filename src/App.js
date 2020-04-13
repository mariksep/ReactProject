import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Login from './views/Login';

const App = () => {
  return (
    <>
      <h1>MOI</h1>
      <Router>
        <Switch>
          <Route path="/" component={Login}/>
        </Switch>
      </Router>
    </>
  );
};

export default App;
