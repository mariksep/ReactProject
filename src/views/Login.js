import React, {useState} from 'react';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import {Button} from '@material-ui/core/';


const Login = () => {
  const [show, setShow]= useState(true);
  const showForms = () =>{
    setShow(!show);
  };

  return (
    <>
      <h1>Etusivu</h1>
      <Button
        variant="outlined" size="large"
        onClick={showForms}>{show ? 'Login' : 'Register'}
      </Button>
      {show ?
        <LoginForm/> :
        <RegisterForm/>
      }
    </>
  );
};

export default Login;
