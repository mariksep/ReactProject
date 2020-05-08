import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
  FormHelperText,
  Grid,
  CircularProgress,
} from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import useUploadForm from '../hooks/UploadHooks';
import { uploadFile } from '../hooks/ApiHooks';
import { makeStyles } from '@material-ui/core/styles';
import { Map, TileLayer, Marker } from 'react-leaflet';
import Nav from '../components/Nav';
import { MediaContext } from '../contexts/MediaContext';
import {Icon} from 'leaflet';
import MarkerIcon from '../assets/marker.png';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
  header: {
    fontWeight: 'normal',
    margin: '3rem 0 3rem 0',
    textAlign: 'center',
  },
  inputs: {
    padding: '1rem',
    textAlign: 'center',
    width: '60vw',
    '@media (max-width:780px)': {
      width: '90vw',
    },
    '& label.Mui-focused': {
      color: '#442C2E',
    },
  },
  radio: {
    marginBottom: '1rem',
    fontWeight: 'bold',
    fontSize: '1.4rem',
  },
  uploadBtn: {
    backgroundColor: '#0000008a',
    color: 'white',
    marginTop: '2rem',
    marginBottom: '4rem',
    '&:hover': {
      backgroundColor: 'white',
      color: '#0000008a',
      border: '1px solid #0000008a',
    },
  },
  map: {
    borderRadius: '15px',
    margin: '0.5rem',
  },
  textHelp: {
    fontWeight: 'bold',
  },
  preview: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fileError: {
    color: 'red',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  headContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  guide: {
    fontFamily: 'Roboto, sans-serif',
    marginBottom: '2rem',
  },
}));

const Upload = ({ history }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useContext(MediaContext);
  const markerIcon = new Icon({
    iconUrl: MarkerIcon,
    iconSize: [40, 40],
  });


  const doUpload = async () => {
    setLoading(true);

    try {
      const uploadObject = {
        title: inputs.title,
        description: JSON.stringify({
          desc: inputs.description,
          contact: inputs.contact,
          coords: inputs.coords,
        }),
        file: inputs.file,
      };

      const tagName = inputs.type;
      const result = await uploadFile(uploadObject, tagName);
      console.log('filen lataus onnistui', result);

      // Siirry sille sivulle mitä tyyppiä postaus oli
      setTimeout(() => {
        setLoading(false);
        if (inputs.type === 'nhahelper') {
          history.push('/helpers');
        } else {
          history.push('/helpwanted');
        }
      }, 2000);
    } catch (e) {
      console.log(e.message);
    }
  };

  const {
    inputs,
    setInputs,
    error,
    helperText,
    handleInputChange,
    handleSubmit,
    handleFileChange,
    handleRadioChange,
    handleCoordsChange,
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
      false
    );

    if (inputs.file !== null) {
      console.log(inputs.file);

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
  }, [inputs.file, setInputs, setUser]);

  return (
    <div className={classes.root}>
      <Nav />
      <Grid
        container
        direction='column'
        justify='space-around'
        alignItems='center'
      >
        <Grid item xs={12} className={classes.headContainer}>
          <Typography
            component='h1'
            variant='h2'
            className={classes.header}
            gutterBottom
          >
            Add new task
          </Typography>
          <Typography
            component='p'
            variant='body2'
            gutterBottom
            className={classes.guide}
          >
            All starred ( * ) fields are required
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <ValidatorForm
              instantValidate={false}
              noValidate
              onSubmit={handleSubmit}
            >
              <Grid item xs={12} className={classes.inputs}>
                <FormControl component='fieldset' error={error}>
                  <FormLabel
                    id='uploadRadioText'
                    component='legend'
                    className={classes.radio}
                  >
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
                  <FormHelperText className={classes.textHelp}>
                    Choose one *
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} className={classes.inputs}>
                <TextValidator
                  fullWidth
                  label='How can you help or where do you need help? *'
                  type='text'
                  name='title'
                  value={inputs.title}
                  onChange={handleInputChange}
                  validators={[
                    'required',
                    "matchRegexp:^[a-zA-ZäöåÄÖÅ0-9,.'!?@ -]*$",
                  ]}
                  errorMessages={['Type title for your task']}
                />
              </Grid>
              <Grid item xs={12} className={classes.inputs}>
                <TextValidator
                  fullWidth
                  label='Provide a detailed description about your task *'
                  name='description'
                  value={inputs.description}
                  onChange={handleInputChange}
                  validators={["matchRegexp:^[a-zA-ZäöåÄÖÅ0-9,.'!?@ -]*$"]}
                  errorMessages={[
                    'Special characters are not allowed. Text only!',
                  ]}
                />
              </Grid>
              <Grid item xs={12} className={classes.inputs}>
                <TextValidator
                  fullWidth
                  label='How people can contact you? *'
                  name='contact'
                  value={inputs.contact}
                  onChange={handleInputChange}
                  validators={[
                    'required',
                    'matchRegexp:^[a-zA-ZäöåÄÖÅ0-9,.!?@ -]*$',
                  ]}
                  errorMessages={['Type your contact-information']}
                />
              </Grid>
              {inputs.dataUrl.length > 0 && (
                <Grid item xs={12} className={classes.preview}>
                  <div
                    style={{
                      width: '50vw',
                      height: '30vh',
                      backgroundImage: `url(${inputs.dataUrl})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      backgroundSize: 'contain',
                    }}
                  ></div>
                </Grid>
              )}
              <Grid item xs={12} className={classes.inputs}>
                <TextValidator
                  helperText='add picture *'
                  type='file'
                  name='file'
                  accept='image/*,video/*,audio/*'
                  onChange={handleFileChange}
                />
                <FormHelperText
                  className={`${classes.fileError} ${classes.preview}`}
                >
                  {helperText}
                </FormHelperText>
              </Grid>
              <Grid
                container
                direction='column'
                justify='center'
                alignItems='center'
              >
                <Typography>You can display the location (optional)</Typography>
                <Map
                  className={classes.map}
                  onClick={handleCoordsChange}
                  center={[60.169857, 24.938379]}
                  zoom={11}
                >
                  <TileLayer
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {inputs.coords.length !== 0 && (
                    <Marker
                        icon={markerIcon}
                        position={[inputs.coords.lat, inputs.coords.lng]} />
                  )}
                </Map>
              </Grid>
              {loading && (
                <Grid item className={classes.preview}>
                  <CircularProgress />
                </Grid>
              )}
              <Grid item xs={12}>
                <Button fullWidth type='submit' className={classes.uploadBtn}>
                  Upload
                </Button>
              </Grid>
            </ValidatorForm>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

Upload.propTypes = {
  history: PropTypes.object,
};

export default Upload;
