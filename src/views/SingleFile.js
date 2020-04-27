import React from 'react';
import PropTypes from 'prop-types';
import {useSingleMedia} from '../hooks/ApiHooks';
import BackButton from '../components/BackButton';
import {Card, Grid, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Map, TileLayer, Marker} from 'react-leaflet';


const baseUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';
const useStyles = makeStyles((theme) => ({
  text: {
    padding: '1em',
    width: '60vw',

  },
  desc: {
    width: '60vw',

  },
  img: {
    width: '100%',
  },

}));

const SingleFile = ({history, match}) => {
  const classes = useStyles();
  const file = useSingleMedia(match.params.id);
  let description = undefined;
  let mapLenght = undefined;
  if (file !== null) {
    description = JSON.parse(file.description);
    mapLenght=Object.keys(description.coords).length;
    console.log(description);

  }
  return (

    <>{file != null &&
      <>
        <BackButton/>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Card>
            <img
              className={classes.img}
              src={baseUrl + file.thumbnails.w640}
              alt='post picture'/>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Typography
                className={classes.text}
                variant='h2' component='h2'>{file.title}</Typography>
              <Typography
                className={classes.text}
                variant='body1' >Contact information:
                {description.contact}</Typography>
              <Typography
                className={classes.desc}
                variant="body1"
                component="p">Description:</Typography>
              <Typography
                className={classes.text}
                variant="body1"
                component="p">{description.desc}</Typography>
            </Grid>
            {mapLenght>0 &&
            <Grid
              container
              direction='column'
              justify="center"
              alignItems="center"
            >
              <Typography>The location</Typography>


              <Map
                center={[description.coords.lat, description.coords.lng]}
                zoom={15}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />

                <Marker
                  position={[description.coords.lat, description.coords.lng]}
                />


              </Map>

            </Grid>
            }

          </Card>
        </Grid>
      </>
    }
    </>
  );
};

SingleFile.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
};

export default SingleFile;
