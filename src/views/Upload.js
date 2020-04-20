import React, {useEffect, useState} from 'react';
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
  FormHelperText,
} from '@material-ui/core';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import useUploadForm from '../hooks/UploadHooks';
import {uploadFile} from '../hooks/ApiHooks';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  dangerText: {
    color: 'red',
    fontSize: '1.2em',
    borderBottom: '1px solid red',
  },
}));

const Upload = ({history}) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const doUpload = async () => {
    if (inputs.type === '') {
      const uploadRadioText = document.querySelector('#uploadRadioText');
      uploadRadioText.classList.add(classes.dangerText);
      return false;
    } else {
      console.log('input up', inputs);
      setLoading(true);

      try {
        const uploadObject = {
          title: inputs.title,
          description: inputs.description,
          file: inputs.file,
        };
        const tag_name = inputs.type;
        console.log('tagi', tag_name);
        const result = await uploadFile(uploadObject, tag_name);
        console.log('filen lataus onnistui', result);
        // Siirry etusivulle
        setTimeout(() => {
          setLoading(false);
          history.push('/media');
        }, 2000);
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  const {
    inputs,
    setInputs,
    handleInputChange,
    handleSubmit,
    handleFileChange,
    handleRadioChange,
  } = useUploadForm(doUpload);

  console.log('ips', inputs);

  // Use-effect käynnistyy kun inputs.file muuttuu
  useEffect(() => {
    const reader = new FileReader();

    reader.addEventListener(
        'load',
        () => {
        // convert image file to base64 string
          setInputs((inputs) => {
            return {
              ...inputs,
              dataUrl: reader.result,
            };
          });
        },
        false,
    );

    if (inputs.file !== null) {
      if (inputs.file.type.includes('image')) {
        reader.readAsDataURL(inputs.file);
      } else {
        setInputs((inputs) => {
          return {
            ...inputs,
            dataUrl: 'logo192.png',
          };
        });
      }
    }
  }, [inputs.file, setInputs]);

  return (
    <>
      <BackButton />
      <Typography component='h1' variant='h2' gutterBottom>
        Add new task
      </Typography>
      <ValidatorForm instantValidate={false} noValidate onSubmit={handleSubmit}>
        <FormControl component='fieldset'>
          <FormLabel id='uploadRadioText' component='legend'>
            Choose the type of the task
          </FormLabel>
          <RadioGroup
            aria-label='typeoftask'
            name='type'
            onChange={handleRadioChange}
          >
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
          <FormHelperText>Choose one</FormHelperText>
        </FormControl>
        <TextValidator
          fullWidth
          label='Where do you need help?'
          type='text'
          name='title'
          value={inputs.title}
          onChange={handleInputChange}
          validators={['required']}
          errorMessages={['Type title for your task']}
        />
        <TextValidator
          fullWidth
          label='Provide a more detailed description'
          name='description'
          value={inputs.description}
          onChange={handleInputChange}
          validators={[
            'matchRegexp:^[a-zA-Z]+(([\',. -][a-zA-Z ])?[a-zA-Z]*)*$',
          ]}
          errorMessages={['Tell more about your task']}
        />
        <TextValidator
          type='file'
          name='file'
          accept='image/*,video/*,audio/*'
          onChange={handleFileChange}
        />
        <Button fullWidth color='primary' type='submit'>
          Upload
        </Button>
      </ValidatorForm>
    </>
  );
};

Upload.propTypes = {
  history: PropTypes.object,
};

export default Upload;
