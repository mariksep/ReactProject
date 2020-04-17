import React from 'react';
import PropTypes from 'prop-types';
import BackButton from '../components/BackButton';
import {
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
} from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const Upload = () => {
  return (
    <>
      <BackButton />
      <Typography component='h1' variant='h2' gutterBottom>
        Add new task
      </Typography>
      <ValidatorForm instantValidate={false} noValidate>
        <FormControl
          component='fieldset'
          validators={['required']}
          errorMessages={['Choose one']}
        >
          <FormLabel component='legend'>Select the type of the task</FormLabel>
          <RadioGroup aria-label='tasktype' name='tasktype'>
            <FormControlLabel
              value='nhahelper'
              control={<Radio />}
              label='I want to help'
            />
            <FormControlLabel
              value='nhaneedhelp'
              control={<Radio />}
              label='I need help'
            />
          </RadioGroup>
        </FormControl>
        <TextValidator
          fullWidth
          label='Where do you need help?'
          type='text'
          name='title'
          validators={['required']}
          errorMessages={['This field is required']}
        />
        <TextValidator
          fullWidth
          label='Provide a more detailed description'
          name='description'
          validators={[
            "matchRegexp:^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$",
          ]}
          errorMessages={['text only']}
        />
        <TextValidator
          type='file'
          name='file'
          accept='image/*,video/*,audio/*'
        />
        <Button fullWidth color='primary' type='submit'>
          Upload
        </Button>
      </ValidatorForm>
    </>
  );
};

Upload.propTypes = {};

export default Upload;
