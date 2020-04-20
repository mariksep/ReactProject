import React, {useContext, useEffect} from 'react';
import useRegisterForm from '../hooks/RegisterHooks';
import {MediaContext} from '../contexts/MediaContext';
import {login, register} from '../hooks/ApiHooks';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {Button} from '@material-ui/core/';


const RegisterForm = ({history}) => {
  const [user, setUser] = useContext(MediaContext);
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


  const {inputs, handlesubmit,
    handleInputChange} = useRegisterForm(doRegister);


  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
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
          fullWidth
          type='text'
          onChange={handleInputChange}
          name='username'
          label='username'
          variant='outlined'
          validators={['minStringLength:3', 'required', 'isAvailable']}
          errorMessages={['password mismatch', 'this field is required']}
        />
        <TextValidator
          fullWidth
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

          label='confirm password'
          validators={[
            'isMatch',
            'required']}
          aria-errormessage='password mismatch and this field is required'
          errorMessages={[
            'password mismatch',
            'this field is required']}

        />
        <TextValidator
          fullWidth
          type='password'
          onChange={handleInputChange}
          name='password'

          label='password'
          variant='outlined'
          validators={['minStringLength:5', 'required']}
          errorMessages={['min length 5', 'this field is required']}
        />
        <TextValidator
          fullWidth
          type='password'
          onChange={handleInputChange}
          variant='outlined'
          name='confirm'
          label="confirm password"
          validators={['isMatch', 'required']}
          errorMessages={[
            'password mismatch',
            'this field is required']}

        />
        <TextValidator
          fullWidth
          type='text'
          onChange={handleInputChange}
          name='full_name'
          placeholder='full name'
        />


        <Button variant='outlined' size='large' type='submit'>
          Submit
        </Button>
      </ValidatorForm>
    </>
  );
}
  ;


RegisterForm.propTypes = {
  history: PropTypes.object,
};

export default withRouter(RegisterForm);
