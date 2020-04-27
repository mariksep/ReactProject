import React from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Card,
  CardHeader,
  Avatar,
} from '@material-ui/core';
import { useSingleMedia } from '../hooks/ApiHooks';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const useStyles = makeStyles(() => ({
  media: {
    height: 200,
    width: '100%',
  },
  cardContainer: {
    width: '30vw',
    textAlign: 'center',
    margin: '1rem',
  },
  cardContent: {
    padding: 0,
  },
  cardHeader: {
    padding: '1rem',
  },
  icon: {
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    width: '2rem',
    height: '2rem',
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

  let helpIcon = useSingleMedia(2045);
  let jobIcon = useSingleMedia(2046);
  let contactIcon = useSingleMedia(2047);

  let icons;

  if (helpIcon && jobIcon && contactIcon) {
    icons = {
      helpIcon: helpIcon.thumbnails.w160,
      jobIcon: jobIcon.thumbnails.w160,
      contactIcon: contactIcon.thumbnails.w160,
    };
  }

  return (
    <>
      {icons !== undefined && (
        <Card className={classes.cardContainer}>
          <CardHeader avatar={<Avatar aria-label='user'></Avatar>} />
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
              }}
            >
              {type === 'nhahelper' && (
                <div
                  style={{
                    backgroundImage: `url(${mediaUrl}${icons.helpIcon})`,
                  }}
                  className={classes.icon}
                ></div>
              )}
              {type === 'nhaneedhelp' && (
                <div
                  style={{
                    backgroundImage: `url(${mediaUrl}${icons.jobIcon})`,
                  }}
                  className={classes.icon}
                ></div>
              )}
              <Typography variant='body1' component='h3'>
                {description.desc}
              </Typography>
            </div>
            <CardActions>
              <div
                style={{
                  backgroundImage: `url(${mediaUrl}${icons.contactIcon})`,
                }}
                className={classes.icon}
              ></div>
              <Typography variant='body1' component='h3'>
                {description.contact}
              </Typography>
            </CardActions>
          </CardContent>
        </Card>
      )}
    </>
  );
};

MediaRow.propTypes = {
  file: PropTypes.object,
  type: PropTypes.string,
};

export default MediaRow;
