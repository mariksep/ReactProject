import React, {useContext, useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './views/Login';
import Media from './views/Media';
import Upload from './views/Upload';
import {MediaContext, MediaProvider} from './contexts/MediaContext';
import Helpers from './views/Helpers';
import HelpWanted from './views/HelpWanted';
import Profile from './views/Profile';
import PropTypes from 'prop-types';


const App = ({history}) => {
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
            <Route path='/profile' component={Profile} />

          </Switch>
        </MediaProvider>
      </Router>
    </>
  );
};
App.propTypes = {
  history: PropTypes.object,
};


export default App;
