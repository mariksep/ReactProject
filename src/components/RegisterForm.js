import React, {useContext, useEffect} from 'react';
import useRegisterForm from '../hooks/RegisterHooks';
import {MediaContext} from '../contexts/MediaContext';
import {login, register} from '../hooks/ApiHooks';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';


const RegisterForm = ({history}) => {
  const [user, setUser]= useContext(MediaContext);
  console.log(user);
  const doRegister = async ()=>{
    try {
      delete inputs.confirm;
      // lähettää tiedot apihooksiin
      await register(inputs);
      // hakee käyttäjän tiedot Apihooksista
      const userData = await login(inputs);
      // tallenta ne ylhäällä olevaan user muuttujaan
      setUser(userData.user);
      // tallentaa token
      localStorage.setItem('token', userData.token);
      // siirtyy media sivulle
      history.push('/media');
    } catch (e) {
      console.log(e.message);
      alert(e.message);

      // throw new Error(e.message);
    }
  };


  const {inputs, handlesubmit,
    handleInputChange} = useRegisterForm(doRegister);


  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handlesubmit}>
        <input
          type='text'
          onChange={handleInputChange}
          name='username'
          placeholder="username"/>
        <input
          type='email'
          onChange={handleInputChange}
          name='email'
          placeholder="email"/>
        <input
          type='password'
          onChange={handleInputChange}
          name='password'
          placeholder="password"/>
        <input
          type='password'
          onChange={handleInputChange}
          name='confirm'
          placeholder="confirm password"/>
        <input
          type='text'
          onChange={handleInputChange}
          name='full_name'
          placeholder="full name"/>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

RegisterForm.propTypes = {
  history: PropTypes.object,
};


export default withRouter(RegisterForm);

