import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import useLoginForm from '../hooks/LoginHooks';

const LoginForm = ({history}) =>{
  const doLogin = async () =>{
    history.push('/media');
  };


  return (
    <>
      <h1>Login</h1>
      <form>
        <input className='username' placeholder="username"/>
        <input placeholder="password"/>
        <button type="submit" onClick={doLogin}>Login</button>
      </form>
    </>
  );
};
LoginForm.propTypes = {
  history: PropTypes.object,
};


export default withRouter(LoginForm);
