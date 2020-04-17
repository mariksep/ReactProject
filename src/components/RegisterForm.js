import React, {useContext} from 'react';
import useRegisterForm from '../hooks/RegisterHooks';
import {MediaContext} from '../contexts/MediaContext';
import {login, register} from '../hooks/ApiHooks';

const RegisterForm = () => {
  const [user, setUser]= useContext(MediaContext);
  const doRegister = async ()=>{
    //console.log(inputs);
    // await register(inputs);
    // const userData = await login(inputs);
  };
  const {inputs, handlesubmit,
    handleInputChange} = useRegisterForm(doRegister);

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handlesubmit}>
        <input placeholder="username"/>
        <input placeholder="email"/>
        <input placeholder="password"/>
        <input placeholder="confirm"/>
        <input placeholder="full name"/>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default RegisterForm;
