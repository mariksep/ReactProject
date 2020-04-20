import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './views/Login';
import Media from './views/Media';
import Upload from './views/Upload';
import { MediaProvider } from './contexts/MediaContext';
import Helpers from './views/Helpers';
import HelpWanted from './views/HelpWanted';

const App = () => {
  return (
    <>
      <Router>
        <MediaProvider>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/media' component={Media} />
            <Route path='/upload' component={Upload} />
            <Route path='/helpers' component={Helpers} />
            <Route path='/helpwanted' component={HelpWanted} />
          </Switch>
        </MediaProvider>
      </Router>
    </>
  );
};

export default App;
