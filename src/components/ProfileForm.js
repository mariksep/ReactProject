import React, { useContext, useEffect } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { MediaContext } from '../contexts/MediaContext';
import { Button, Grid, InputAdornment } from '@material-ui/core';
import UploadProfilePic from '../views/UploadProfilePic';
import {
  checkUserAvailable,
  updateProfile,
  userInformation,
} from '../hooks/ApiHooks';
import useProfileForm from '../hooks/ProfileHooks';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import FaceIcon from '@material-ui/icons/Face';
import LockIcon from '@material-ui/icons/Lock';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  inputs: {
    padding: '1em',
    textAlign: 'center',
    width: '60vw',
  },

  modal: {
    borderRadius: '15px',
    width: '90%',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
}));

const ProfileForm = ({ history }) => {
  const classes = useStyles();

  const [user, setUser] = useContext(MediaContext);

  const doUpdate = async () => {
    try {
      // await checkUserAvailable(inputs.username);
      const token = localStorage.getItem('token');
      await updateProfile(inputs, token);
      const userdata = await userInformation(token);
      setUser(userdata);
      window.location.reload();
    } catch (e) {
      console.log(e.message);
    }
  };
  const reload = () => {
    window.location.reload();
  };

  const {
    handleSubmitProfile,
    inputs,
    setInputs,
    handleInputChangeProfile,
  } = useProfileForm(doUpdate);

  useEffect(() => {
    setInputs(user);
    ValidatorForm.addValidationRule('isAvailable', async (value) => {
      console.log(value);
      try {
        if (value !== user.username) {
          const response = await checkUserAvailable(value);
          console.log(response);
          return response.available;
        } else {
          return true;
        }
      } catch (e) {
        console.log(e.message);
        return true;
      }
    });
  }, [user, setInputs]);

  return (
    <Grid className={classes.container}>
      <Grid className={classes.modal}>
        <Grid container>
          <Button fullWidth startIcon={<ArrowBackIcon />} onClick={reload}>
            Back
          </Button>
        </Grid>
        <Grid container direction='row' justify='center' alignItems='center'>
          <h1>Update your profile information</h1>
          <ValidatorForm
            onSubmit={handleSubmitProfile}
            instantValidate={false}
            noValidate
          >
            <Grid
              container
              direction='row'
              justify='center'
              alignItems='center'
            >
              <TextValidator
                className={classes.inputs}
                type='text'
                name='username'
                placeholder='Username'
                onChange={handleInputChangeProfile}
                value={inputs.username}
                validators={['required', 'minStringLength:3', 'isAvailable']}
                errorMessages={[
                  'this field is required',
                  'minimum 3 charaters',
                  inputs.username + ' is not available',
                ]}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <PersonOutlineIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <TextValidator
                className={classes.inputs}
                type='email'
                name='email'
                placeholder='Email'
                onChange={handleInputChangeProfile}
                value={inputs.email}
                validators={['isEmail']}
                errorMessages={['this field is required', 'email is not valid']}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AlternateEmailIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <TextValidator
                className={classes.inputs}
                type='password'
                onChange={handleInputChangeProfile}
                name='password'
                placeholder='change password'
                value={inputs.password || ''}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <TextValidator
                className={classes.inputs}
                type='text'
                name='full_name'
                placeholder='Full name'
                onChange={handleInputChangeProfile}
                value={inputs.full_name}
                validators={[
                  "matchRegexp:^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$",
                ]}
                errorMessages={['text only']}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <FaceIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <Button fullWidth type='submit'>
                Save
              </Button>
            </Grid>
          </ValidatorForm>
        </Grid>
        <UploadProfilePic></UploadProfilePic>
      </Grid>
    </Grid>
  );
};

ProfileForm.propTypes = {
  history: PropTypes.object,
};

export default withRouter(ProfileForm);
