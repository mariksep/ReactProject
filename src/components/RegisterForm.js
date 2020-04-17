import React, { useContext, useEffect } from 'react';
import useRegisterForm from '../hooks/RegisterHooks';
import { MediaContext } from '../contexts/MediaContext';
import { login, register } from '../hooks/ApiHooks';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const RegisterForm = ({ history }) => {
  const [user, setUser] = useContext(MediaContext);
  console.log(user);
  const doRegister = async () => {
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

  const { inputs, handlesubmit, handleInputChange } = useRegisterForm(
    doRegister
  );
  useEffect(() => {
    ValidatorForm.addValidationRule('isMatch', (value) => {
      console.log(value);
      if (value !== inputs.password) {
        return false;
      }
      return true;
    });

    ValidatorForm.addValidationRule('isAvailable', async (value) => {
      console.log(value);
    });
  });

  return (
    <>
      <h1>Register</h1>
      <ValidatorForm onSubmit={handlesubmit}>
        <TextValidator
          type='text'
          onChange={handleInputChange}
          name='username'
          label='username'
          variant='outlined'
          validators={['minStringLength:3', 'required', 'isAvailable']}
        />
        <input
          type='email'
          onChange={handleInputChange}
          name='email'
          placeholder='email'
        />
        <input
          type='password'
          onChange={handleInputChange}
          name='password'
          placeholder='password'
        />
        <TextValidator
          id='standard-password-input'
          type='password'
          onChange={handleInputChange}
          variant='outlined'
          name='confirm'
          git
          label='confirm password'
          validators={['isMatch', 'required']}
          aria-errormessage='password mismatch and this field is required'
          errorMessages={['password mismatch', 'this field is required']}
        />
        <input
          type='text'
          onChange={handleInputChange}
          name='full_name'
          placeholder='full name'
        />

        <button type='submit'>Submit</button>
      </ValidatorForm>
    </>
  );
};

RegisterForm.propTypes = {
  history: PropTypes.object,
};

export default withRouter(RegisterForm);
