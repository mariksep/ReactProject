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
import { Link as RouterLink } from 'react-router-dom';
import StarIcon from '@material-ui/icons/Star';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const useStyles = makeStyles(() => ({
  media: {
    height: 200,
    width: '100%',
    '&:hover': {
      opacity: '50%',
    },
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
    fontFamily: 'Rubik, sans-serif',
    fontSize: '1.5rem',
  },
  icon: {
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    width: '2.5rem',
    height: '2.5rem',
  },
  description: {
    margin: '0 3rem 0 5rem',
    fontSize: '0.9rem',
  },
  subheader: {
    color: '#442C2E',
    fontSize: '0.9rem',
    margin: '0.5rem',
    borderBottom: '1px solid rgb(254, 216, 208)',
  },
  avatar: {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '3rem',
    height: '3rem',
  },
  starIconYellow: {
    color: '#e2e232',
    fontSize: '1.2rem',
    marginRight: '0.1rem',
  },
  starIconGrey: {
    color: '#cccccc',
    fontSize: '1.2rem',
    marginRight: '0.1rem',
  },
  ratingContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: '1rem',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '0.9rem',
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

  // Show average rating as stars
  let averageRating = 0;
  let stars = [];

  const displayStars = (averageRating) => {
    if (averageRating > 0) {
      for (let i = 0; i < averageRating; i++) {
        const key = 'y' + file.file_id.toString() + i;
        stars.push(<StarIcon className={classes.starIconYellow} key={key} />);
      }
    }

    if (5 - averageRating > 0) {
      for (let i = 0; i < 5 - averageRating; i++) {
        const key = 'g' + file.file_id.toString() + i;
        stars.push(<StarIcon className={classes.starIconGrey} key={key} />);
      }
    }
  };

  if (file.rating.length > 0) {
    for (const rate of file.rating) {
      averageRating += rate.rating;
    }
    averageRating = Math.round(averageRating / file.rating.length);
    displayStars(averageRating);
  } else {
    displayStars(0);
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
          action={
            <div className={classes.ratingContainer}>
              {stars}( {file.rating.length} )
            </div>
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
            component={RouterLink}
            to={'/SingleFile/' + file.file_id}
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
                margin: '0.3rem 0.7rem',
              }}
              className={classes.icon}
            ></div>
            <Typography
              variant='h6'
              component='h3'
              className={classes.subheader}
            >
              How to contact
            </Typography>
          </CardActions>
          <Typography
            variant='body1'
            component='h4'
            className={classes.description}
          >
            {description.contact}
          </Typography>
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
