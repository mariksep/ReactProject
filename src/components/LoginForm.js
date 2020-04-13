import React from 'react';

const LoginForm = () => {
  return (
    <>
      <h1>Login</h1>
      <form>
        <input className='username' placeholder="username"/>
        <input placeholder="password"/>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm;
