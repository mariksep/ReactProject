import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSingleMedia, userInformation } from '../hooks/ApiHooks';
import BackButton from '../components/BackButton';
import { Card, Grid, Typography, Button, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Map, TileLayer, Marker } from 'react-leaflet';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import CommentIcon from '@material-ui/icons/Comment';
import RateTaskForm from '../components/RateTaskForm';
import { MediaContext } from '../contexts/MediaContext';
import StarIcon from '@material-ui/icons/Star';
import Comments from '../components/Comments';
import { Icon } from 'leaflet';
import MarkerIcon from '../assets/marker.png';

const baseUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const useStyles = makeStyles((theme) => ({
  card: {
    margin: '3em',
  },
  text: {
    padding: '1em',
    width: '60vw',
  },
  desc: {
    padding: '1em',
    width: '60vw',
  },
  img: {
    width: '100%',
  },
  rateBtn: {
    position: 'absolute',
    top: '3%',
    right: '3%',
  },
  starIcon: {
    color: '#e2e232',
    fontSize: '2rem',
    marginRight: '0.3rem',
  },
}));

const SingleFile = ({ history, match }) => {
  const classes = useStyles();
  const [user, setUser] = useContext(MediaContext);
  const [show, setShow] = useState(false);
  const markerIcon = new Icon({
    iconUrl: MarkerIcon,
    iconSize: [40, 40],
  });

  const file = useSingleMedia(match.params.id);

  let description = undefined;
  let mapLenght = undefined;
  let alreadyRated = {
    rated: false,
    rate: '',
  };

  // Get user information
  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await userInformation(localStorage.getItem('token'));
        setUser(userData);
      } catch (e) {
        // Send to login-page if there is no token
        history.push('/');
      }
    };
    checkUser();
  }, [history, setUser]);

  const checkRating = (file) => {
    if (file.rating.length > 0) {
      for (const rate of file.rating) {
        if (rate.user_id === user.user_id) {
          alreadyRated.rated = true;
          alreadyRated.rate = rate.rating;
        }
      }
    }
  };

  if (file !== null) {
    description = JSON.parse(file.description);
    mapLenght = Object.keys(description.coords).length;
    checkRating(file);
  }

  const showUpdate = () => {
    setShow(!show);
  };

  const [isShowing, setIsShowing] = useState(false);

  const toggle = () => {
    setIsShowing(!isShowing);
  };

  return (
    <>
      {file != null && (
        <>
          <BackButton />
          <Grid
            container
            direction='column'
            justify='center'
            alignItems='center'
          >
            <Card className={classes.card}>
              <img
                className={classes.img}
                src={baseUrl + file.thumbnails.w640}
                alt='post picture'
              />
              <Grid
                container
                direction='column'
                justify='center'
                alignItems='center'
                style={{ position: 'relative' }}
              >
                <Typography
                  className={classes.text}
                  variant='h2'
                  component='h2'
                >
                  {file.title}
                </Typography>
                <RateTaskForm
                  isShowing={isShowing}
                  hide={toggle}
                  file={file}
                  alreadyRated={alreadyRated}
                />
                <Button
                  className={classes.rateBtn}
                  size='large'
                  onClick={toggle}
                >
                  <StarIcon className={classes.starIcon} />
                  Rate this task
                </Button>
                <Grid
                  container
                  direction='row'
                  justify='center'
                  alignItems='center'
                >
                  <ContactMailIcon />
                  <Typography className={classes.text} variant='body1'>
                    Contact :{description.contact + ' '} OR <br></br>
                    <Button variant='outlined' onClick={showUpdate}>
                      See comments
                    </Button>
                  </Typography>
                </Grid>
                <Grid
                  container
                  direction='row'
                  justify='center'
                  alignItems='center'
                >
                  <CommentIcon />
                  <Typography
                    className={classes.desc}
                    variant='body1'
                    component='p'
                  >
                    Description:
                  </Typography>
                </Grid>
                <Typography
                  className={classes.text}
                  variant='body1'
                  component='p'
                >
                  {description.desc}
                </Typography>
              </Grid>
              {mapLenght > 0 && (
                <Grid
                  container
                  direction='column'
                  justify='center'
                  alignItems='center'
                >
                  <Typography>The location</Typography>
                  <Map
                    center={[description.coords.lat, description.coords.lng]}
                    zoom={15}
                  >
                    <TileLayer
                      url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker
                        icon={markerIcon}
                      position={[
                        description.coords.lat,
                        description.coords.lng,
                      ]}
                    />
                  </Map>
                </Grid>
              )}
            </Card>
            <Modal open={show}>
              <Comments file={file} />
            </Modal>
          </Grid>
        </>
      )}
    </>
  );
};

SingleFile.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
};

export default SingleFile;
