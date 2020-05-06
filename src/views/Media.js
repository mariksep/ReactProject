import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {
  Typography,
  Grid,
  Avatar,
  Button,
} from '@material-ui/core';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import {makeStyles} from '@material-ui/core/styles';
import {useMediaByTag} from '../hooks/ApiHooks';
import {Icon} from 'leaflet';
import iconHelper from '../assets/helper.png';
import iconWanted from '../assets/job.png';
import Nav from '../components/Nav';
import CommentIcon from '@material-ui/icons/Comment';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const useStyles = makeStyles({
  map: {
    width: '95vw',
    height: '85vh',
    marginTop: '5rem',
    borderRadius: '15px',
    margin: '0.5rem',
  },
  popUpAvatar: {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '5rem',
    height: '5rem',
  },
});

const Media = () => {
  const classes = useStyles();

  const helper = useMediaByTag('nhahelper');
  const needhelp = useMediaByTag('nhaneedhelp');

  let description = undefined;
  const HelperIcon = new Icon({
    iconUrl: iconHelper,
    iconSize: [50, 50],
  });
  const iconWantedIcon = new Icon({
    iconUrl: iconWanted,
    iconSize: [50, 50],
  });


  return (
    <>
      <Nav />
      <Grid container justify='center' alignItems='center'>
        <Map className={classes.map} center={[60.169857, 24.938379]} zoom={13}>
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {helper != null &&
            helper.map((file, index) => {
              description = JSON.parse(file.description);
              const popupDesc = description.desc.slice(0, 60);
              const profileIndex = file.avatar.length - 1;
              let profilePicture =
                'http://via.placeholder.com/320x200.png?text=User';
              if (file.avatar.length > 0) {
                profilePicture = mediaUrl + file.avatar[profileIndex].filename;
              }
              // eslint-disable-next-line max-len
              if (description.coords !== null && description.coords !== '' && file !== null) {
                return (

                  <Marker
                    icon={HelperIcon}
                    className={classes.helper}
                    key={file.file_id}
                    position={[description.coords.lat,
                      description.coords.lng]}
                  >
                    <Popup>
                      <Avatar
                        aria-label='user'
                        style={{
                          backgroundImage: `url(${profilePicture})`,
                        }}
                        className={classes.popUpAvatar}
                      ></Avatar>
                      <Typography component='h5' variant='h5'>
                        {file.user.username}
                      </Typography>
                      <Typography component='h6' variant='h6'>
                        {file.title}
                      </Typography>
                      <CommentIcon />
                      <Typography component='p' variant='body2'>
                        {popupDesc}  ...
                        <Button

                          aria-label={`info about ${file.title}`}
                          component={RouterLink}
                          to={'/SingleFile/' + file.file_id}
                        >read more
                        </Button>
                      </Typography>
                    </Popup>

                  </Marker>


                );
              } else {
                return console.log();
              }
            })}

          {needhelp != null &&
            needhelp.map((file, index) => {
              description = JSON.parse(file.description);
              const profileIndex = file.avatar.length - 1;
              let profilePicture =
                'http://via.placeholder.com/320x200.png?text=User';
              if (file.avatar.length > 0) {
                profilePicture = mediaUrl + file.avatar[profileIndex].filename;
              }
              const popupDesc = description.desc.slice(0, 60);
              if (description.coords != null && description.coords != '') {
                return (

                  <Marker
                    icon={iconWantedIcon}
                    key={file.file_id}
                    position={[description.coords.lat, description.coords.lng]}
                  >
                    <Popup>
                      <Avatar
                        aria-label='user'
                        style={{
                          backgroundImage: `url(${profilePicture})`,
                        }}
                        className={classes.popUpAvatar}
                      ></Avatar>
                      <Typography component='h5' variant='h5'>
                        {file.user.username}
                      </Typography>

                      <Typography component='h6' variant='h6'>
                        {file.title}
                      </Typography>
                      <CommentIcon />
                      <Typography component='p' variant='body2'>
                        {popupDesc}...
                        <Button

                          aria-label={`info about ${file.title}`}
                          component={RouterLink}
                          to={'/SingleFile/' + file.file_id}
                        >  read more
                        </Button>
                      </Typography>
                    </Popup>
                  </Marker>

                );
              } else {
                return console.log();
              }
            })

          }
        </Map>

      </Grid>
    </>
  );
};

export default Media;
