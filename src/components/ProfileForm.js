import React, {useContext, useEffect} from 'react';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';
import {Button, Grid} from '@material-ui/core';
import UploadProfilePic from '../views/UploadProfilePic';

import {
  checkUserAvailable,
  updateProfile,
  userInformation,
} from '../hooks/ApiHooks';
import useProfileForm from '../hooks/ProfileHooks';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  inputs: {
    padding: '1em',
    textAlign: 'center',
    width: '60vw',
  },


}));

const ProfileForm = ({history}) => {
  const classes = useStyles();

  const [user, setUser]= useContext(MediaContext);


  const doUpdate= async () =>{
    try {
      // await checkUserAvailable(inputs.username);
      const token = localStorage.getItem('token');
      await updateProfile(inputs, token);
      const userdata = await userInformation(token);
      setUser(userdata);
      setTimeout(() => {
        alert('information updated');
      }, 100);
    } catch (e) {
      console.log(e.message);
    }
  };


  const {
    handleSubmitProfile,
    inputs,
    setInputs,
    handleInputChangeProfile,
  }=useProfileForm(doUpdate);


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
    <>
      <h1>Update your profile information</h1>
      <ValidatorForm
        onSubmit={handleSubmitProfile}
        instantValidate={false}
        noValidate
      >
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <TextValidator
            className={classes.inputs}

            type="text"
            name="username"
            placeholder="Username"
            onChange={handleInputChangeProfile}
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
          />

          <TextValidator
            className={classes.inputs}

            type="email"
            name="email"
            placeholder="Email"
            onChange={handleInputChangeProfile}
            value={inputs.email}
            validators={['isEmail']}
            errorMessages={['this field is required',
              'email is not valid']}
          />

          <TextValidator
              className={classes.inputs}
            type='password'
            onChange={handleInputChangeProfile}
            name='password'
            placeholder='change password'
            value={inputs.password}

          />

          <TextValidator
            className={classes.inputs}

            type="text"
            name="full_name"
            placeholder="Full name"
            onChange={handleInputChangeProfile}
            value={inputs.full_name}
            validators={
              ['matchRegexp:^[a-zA-Z]+(([\',. -][a-zA-Z ])?[a-zA-Z]*)*$']
            }
            errorMessages={['text only']}

          />
          <Button type='submit' >Save</Button>
        </Grid>
      </ValidatorForm>
      <UploadProfilePic></UploadProfilePic>
    </>
  );
};

ProfileForm.propTypes = {
  history: PropTypes.object,

};

export default withRouter(ProfileForm);
