import React, {useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import useSignUpForm from '../hooks/RegisterHooks';
import {checkUserAvailable, login, register} from '../hooks/ApiHooks';
import {withRouter} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';
import {Button, Grid, InputAdornment} from '@material-ui/core';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {makeStyles} from '@material-ui/core/styles';
import LockIcon from '@material-ui/icons/Lock';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import FaceIcon from '@material-ui/icons/Face';


const useStyles = makeStyles((theme) => ({
  inputs: {
    padding: '1em',
    textAlign: 'center',
    width: '40vw',

  },


}));


const RegisterForm = ({history}) => {
  const classes = useStyles();

  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useContext(MediaContext);

  const doRegister = async () => {
    try {
      delete inputs.confirm;
      await register(inputs);
      // kirjaudu automaagisesti
      const userdata = await login(inputs);
      setUser(userdata.user);
      // tallenna token
      localStorage.setItem('token', userdata.token);
      // siirry etusivulle
      history.push('/media');
    } catch (e) {
      console.log(e.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useSignUpForm(doRegister);

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
      try {
        const response = await checkUserAvailable(value);
        console.log(response);
        return response.available;
      } catch (e) {
        console.log(e.message);
        return true;
      }
    });
  }, [inputs]);


  return (
    <>
      <Grid
        container
        direction="column"
        justify="space-around"
        alignItems="center">

        <Grid item>
          <div>
            <h1>Register</h1>
          </div>
        </Grid>
        <Grid item>
          <ValidatorForm
            onSubmit={handleSubmit}
            instantValidate={false}
            noValidate
          >
            <Grid container
              direction="column"
              justify="space-between"
              alignItems="center"
            >
              <TextValidator
                className={classes.inputs}

                type="text"
                name="username"
                placeholder="Username*"
                onChange={handleInputChange}
                value={inputs.username}
                validators={[
                  'required',
                  'minStringLength:3',
                  'isAvailable',
                ]}
                errorMessages={[
                  'this field is required',
                  'minimum 3 charaters',
                  inputs.username + ' is not available',
                ]}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineIcon />
                    </InputAdornment>
                  ),
                }}
              />


              <TextValidator
                className={classes.inputs}

                type="password"
                name="password"
                placeholder="Password*"
                onChange={handleInputChange}
                value={inputs.password}
                validators={['minStringLength:5', 'required']}
                errorMessages={[
                  'minimum length 5 characters',
                  'this field is required']}

                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon/>
                    </InputAdornment>
                  ),
                }}
              />


              <TextValidator
                className={classes.inputs}

                type="password"
                name="confirm"
                placeholder="Confirm password*"
                onChange={handleInputChange}
                value={inputs.confirm}
                validators={['isPasswordMatch', 'required']}
                errorMessages={['password mismatch', 'this field is required']}

                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />


              <TextValidator
                className={classes.inputs}

                type="email"
                name="email"
                placeholder="Email*"
                onChange={handleInputChange}
                value={inputs.email}
                validators={['required', 'isEmail']}
                errorMessages={['this field is required', 'email is not valid']}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AlternateEmailIcon />
                    </InputAdornment>
                  ),
                }}
              />


              <TextValidator
                className={classes.inputs}

                type="text"
                name="full_name"
                placeholder="Full name"
                onChange={handleInputChange}
                value={inputs.full_name}
                validators={
                  ['matchRegexp:^[a-zA-Z]+(([\',. -][a-zA-Z ])?[a-zA-Z]*)*$']
                }
                errorMessages={['text only']}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaceIcon  />
                    </InputAdornment>
                  ),
                }}
              />


              <Button
                type="submit"
              >
              Register
              </Button>
            </Grid>
          </ValidatorForm>
        </Grid>
      </Grid>
    </>
  );
};

RegisterForm.propTypes = {
  history: PropTypes.object,
};

export default withRouter(RegisterForm);
