import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Login from './views/Login';
import Media from './views/Media';


const App = () => {
  return (
    <>
      <h1>MOI</h1>
      <Router>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route path="/media" component={Media}/>

        </Switch>
      </Router>
    </>
  );
};

export default App;
