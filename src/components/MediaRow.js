import React from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Card,
  CardHeader,
  Avatar,
} from '@material-ui/core';
import ContactIcon from '../assets/contact.png';
import JobIcon from '../assets/job.png';
import HelperIcon from '../assets/helper.png';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const useStyles = makeStyles(() => ({
  media: {
    height: 200,
    width: '100%',
  },
  cardContainer: {
    width: '30vw',
    margin: '1rem 1rem 3rem 1rem',
    '@media (max-width:950px)': {
      width: '50vw',
    },
    '@media (max-width:600px)': {
      width: '90vw',
    },
  },
  cardContent: {
    padding: 0,
  },
  cardHeader: {
    padding: '0.5rem',
    textAlign: 'center',
  },
  icon: {
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    width: '2.7rem',
    height: '2.7rem',
  },
  description: {
    margin: '1rem',
  },
  subheader: {
    color: '#6b6b6b',
    fontSize: '1rem',
  },
  avatar: {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '3rem',
    height: '3rem',
  },
}));

const MediaRow = ({ file, type }) => {
  const description = JSON.parse(file.description);
  console.log('file', file);
  const classes = useStyles();
  let thumb = 'http://via.placeholder.com/320x200.png?text=Audio';
  if (file.thumbnails) {
    thumb = mediaUrl + file.thumbnails.w320;
  }

  const profileIndex = file.avatar.length - 1;
  let profilePicture = 'http://via.placeholder.com/320x200.png?text=User';
  if (file.avatar.length > 0) {
    profilePicture = mediaUrl + file.avatar[profileIndex].filename;
  }

  return (
    <>
      <Card className={classes.cardContainer}>
        <CardHeader
          avatar={
            <Avatar
              aria-label='user'
              style={{
                backgroundImage: `url(${profilePicture})`,
              }}
              className={classes.avatar}
            ></Avatar>
          }
          title={file.user.username}
          subheader={file.user.full_name}
        />
        <CardContent className={classes.cardContent}>
          <Typography
            gutterBottom
            variant='h5'
            component='h2'
            className={classes.cardHeader}
          >
            {file.title}
          </Typography>
          <CardMedia
            className={classes.media}
            image={thumb}
            title={file.title}
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {type === 'nhahelper' && (
              <>
                <div
                  style={{
                    backgroundImage: `url(${HelperIcon})`,
                    margin: '1rem',
                  }}
                  className={classes.icon}
                ></div>
                <Typography
                  variant='h6'
                  component='h3'
                  className={classes.subheader}
                >
                  I want to help you!
                </Typography>
              </>
            )}
            {type === 'nhaneedhelp' && (
              <>
                <div
                  style={{
                    backgroundImage: `url(${JobIcon})`,
                    margin: '1rem',
                  }}
                  className={classes.icon}
                ></div>
                <Typography
                  variant='h6'
                  component='h3'
                  className={classes.subheader}
                >
                  I need help!
                </Typography>
              </>
            )}
          </div>
          <Typography
            variant='body1'
            component='h4'
            className={classes.description}
          >
            {description.desc}
          </Typography>
          <CardActions>
            <div
              style={{
                backgroundImage: `url(${ContactIcon})`,
                margin: '0.3rem',
              }}
              className={classes.icon}
            ></div>
            <Typography variant='body1' component='h4'>
              {description.contact}
            </Typography>
          </CardActions>
        </CardContent>
      </Card>
    </>
  );
};

MediaRow.propTypes = {
  file: PropTypes.object,
  type: PropTypes.string,
};

export default MediaRow;
