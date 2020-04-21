import React, {useContext, useEffect} from 'react';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {Button} from '@material-ui/core/';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';
import {
  checkUserAvailable,
  updateProfile,
  userInformation,
} from '../hooks/ApiHooks';
import useProfileForm from '../hooks/ProfileHooks';

const ProfileForm = ({history}) => {
  const [user, setUser] = useContext(MediaContext);
  const doUpdate=async () =>{
    try {
      const token = localStorage.getItem('token');
      await updateProfile(inputs, token);
      const userdata= userInformation(token);
      setUser(userdata);

      setTimeout(() => {
        alert('information updated');
        history.push('/media');
      }, 100);
    } catch (e) {
      console.log(e.message);
    }
  };


  const {
    handleSubmit,
    inputs,
    setInputs,
    handleInputChange,
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
      <h1>Update your profile</h1>
      <ValidatorForm
        onSubmit={handleSubmit}
        instantValidate={false}
        noValidate
      >
        <TextValidator

          type="text"
          name="username"
          label="Username"
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
        />

        <TextValidator

          type="email"
          name="email"
          label="Email"
          onChange={handleInputChange}
          value={inputs.email}
          validators={['isEmail']}
          errorMessages={['this field is required',
            'email is not valid']}
        />
        {/*
          <TextValidator

              type='password'
              onChange={handleInputChange}
              name='password'
              label='password'
              value={inputs.password}
              validators={['minStringLength:5', 'required']}
              errorMessages={['min length 5', 'this field is required']}
          />
        */}
        <TextValidator

          type="text"
          name="full_name"
          label="Full name"
          onChange={handleInputChange}
          value={inputs.full_name}
          validators={
            ['matchRegexp:^[a-zA-Z]+(([\',. -][a-zA-Z ])?[a-zA-Z]*)*$']
          }
          errorMessages={['text only']}

        />
        <Button type='submit' >Save</Button>

      </ValidatorForm>
    </>
  );
};

ProfileForm.propTypes = {
  history: PropTypes.object,

};

export default withRouter(ProfileForm);
