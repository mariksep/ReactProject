import React, {useState} from 'react';
import LoginForm from '../components/loginForm';
import RegisterForm from '../components/registerForm';
const button = {
  color: 'white',
  border: 'none',
  backgroundColor: 'lightblue',
  padding: '15px 32px',
  borderRadius: '15px',
  outline: 'none',

};

const Login = () => {
  const [show, setShow]= useState(true);
  const showForms = () =>{
    setShow(!show);
  };

  return (
    <>
      <h1>Etusivu</h1>
      <button style={button} onClick={showForms}>{show ? 'Login' : 'Register'} </button>
      {show ?
        <LoginForm/> :
        <RegisterForm/>
      }
    </>
  );
};

export default Login;
