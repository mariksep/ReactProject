import React from 'react';

const RegisterForm = () => {
  return (
    <>
      <h1>Register</h1>
      <form>
        <input placeholder="full name"/>
        <input placeholder="email"/>
        <input placeholder="username"/>
        <input placeholder="password"/>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default RegisterForm;
