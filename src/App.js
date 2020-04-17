import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './views/Login';
import Media from './views/Media';
import Upload from './views/Upload';
import { MediaProvider } from './contexts/MediaContext';

const App = () => {
  return (
    <>
      <Router>
        <MediaProvider>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/media' component={Media} />
            <Route path='/upload' component={Upload} />
          </Switch>
        </MediaProvider>
      </Router>
    </>
  );
};

export default App;
