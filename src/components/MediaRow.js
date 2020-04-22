import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import {
  GridListTileBar,
  IconButton,
  makeStyles,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@material-ui/core';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  media: {
    height: 140,
  },
}));

const MediaRow = ({ file }) => {
  const description = JSON.parse(file.description);

  const classes = useStyles();
  let thumb = 'http://via.placeholder.com/320x200.png?text=Audio';
  if (file.thumbnails) {
    thumb = mediaUrl + file.thumbnails.w160;
  }

  return (
    <>
      <CardActionArea>
        <CardMedia className={classes.media} image={thumb} title={file.title} />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {file.title}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {description.desc}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size='small' color='primary'>
          Learn More
        </Button>
      </CardActions>
    </>
  );
};

MediaRow.propTypes = {
  file: PropTypes.object,
};

export default MediaRow;

/* <img src={thumb} alt={file.title} />
      <h2>{file.title}</h2>
      <h3>{description.desc}</h3>
      <h4>{description.contact}</h4>*/
