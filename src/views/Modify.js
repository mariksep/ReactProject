import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import BackButton from '../components/BackButton';
import {
  Button,
  Grid,
  Typography,
  FormHelperText,
} from '@material-ui/core/';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {modifyFile, useSingleMedia} from '../hooks/ApiHooks';
import useModifyFileForm from '../hooks/ModifyFileHooks';
import {makeStyles} from '@material-ui/core/styles';
import {Map, TileLayer, Marker} from 'react-leaflet';


const useStyles = makeStyles((theme) => ({
  inputs: {
    padding: '1em',
    width: '60vw',
    textAlign: 'center',

  },
  helpper: {
    padding: ' 1.5em',

  },


}));

const Modify = ({history, match}) => {
  const classes = useStyles();

  const file = useSingleMedia(match.params.id);


  const doModify = async () =>{
    try {
      const modifyObject =
      {
        title: inputs.title,
        description: JSON.stringify({
          desc: inputs.description,
          contact: inputs.contact,
          coords: inputs.coords,
        }),
        file: inputs.file,
      };
      console.log(modifyObject);
      console.log(JSON.parse(modifyObject.description));
      const result = await modifyFile(modifyObject, match.params.id);
      console.log(result);
      history.push('/Profile');
    } catch (e) {
      console.log(e.message);
    }
  };
  const {
    inputs,
    setInputs,
    handleSubmit,
    handleInputChange,
    handleCoordsChange,

  } =
      useModifyFileForm(doModify);
  let mapLenght = 0;
  let description=undefined;


  useEffect(() => {
    (async () => {
      if (file !== null) {
        console.log(file);
        description = JSON.parse(file.description);
        mapLenght=Object.keys(description.coords).length;
        setInputs(() => {
          if (description.coords==='') {
            return {
              title: file.title,
              description: description.desc,
              contact: description.contact,
              coords: {lat: 0,
                lng: 0,
              },
              file: file.file,

            };
          }
          console.log(description);

          return {
            title: file.title,
            description: description.desc,
            contact: description.contact,
            coords: description.coords,
            file: file.file,

          };
        });
      }
    })();
  }, [file, setInputs]);


  return (

    <>
      {file !== null &&
          <>
            <BackButton/>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Typography
                component='h1'
                variant='h2'
                gutterBottom
              >Modify you post</Typography>
              <FormHelperText
                className={classes.helpper}

              >
      You can modify your post here:
              </FormHelperText>
              <ValidatorForm
                onSubmit={handleSubmit}
                instantValidate={false}
                noValidate
              >
                <Grid container
                  direction="column"
                  justify="center"
                  alignItems="center">

                  <Grid item
                    className={classes.inputs}
                  >
                    <TextValidator
                      fullWidth
                      name='title'
                      onChange={handleInputChange}
                      type='text'
                      label='Where do you need help?'
                      value={inputs.title}
                      validators={[
                        'required',
                        'matchRegexp:^[a-zA-ZäöåÄÖÅ0-9,.!?@ -]*$',
                      ]}
                      errorMessages={['Type title for your task']}
                    />
                  </Grid>
                  <Grid item
                    className={classes.inputs}
                  >
                    <TextValidator
                      fullWidth
                      name='description'
                      onChange={handleInputChange}
                      type='text'
                      label='Provide a detailed description'
                      value={inputs.description}
                      validators={[
                        'matchRegexp:^[a-zA-ZäöåÄÖÅ0-9,.!?@ -]*$',
                      ]}
                      errorMessages={['Text only, no special characters']}
                    />
                  </Grid>
                  <Grid item
                    className={classes.inputs}
                  >
                    <TextValidator
                      fullWidth
                      name='contact'
                      onChange={handleInputChange}
                      type='text'
                      label='How people can contact you?'
                      value={inputs.contact}
                      validators={[
                        'required',
                        'matchRegexp:^[a-zA-ZäöåÄÖÅ0-9,.!?@ -]*$',
                      ]}
                      errorMessages={['Type your contact-information']}
                    />

                  </Grid>

                  {Object.keys(inputs.coords).length>0&&
                    <Grid
                      container
                      direction='column'
                      justify="center"
                      alignItems="center"
                    >
                      <Typography>The location</Typography>

                      <Map
                        onClick={handleCoordsChange}
                        center={[inputs.coords.lat, inputs.coords.lng]}
                        zoom={15}>
                        <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        />
                        <Marker
                          position={[inputs.coords.lat, inputs.coords.lng]}
                        />


                      </Map>

                    </Grid>
                  }

                  <Button type="submit">Save</Button>

                </Grid>


              </ValidatorForm>


            </Grid>
          </>
      }
    </>
  );
};

Modify.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
};

export default Modify;
