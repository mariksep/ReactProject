import React from 'react';
import PropTypes from 'prop-types';
import {useSingleMedia} from '../hooks/ApiHooks';
import BackButton from '../components/BackButton';
import {Card, Grid, IconButton, Typography, CardMedia} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {FormHelperText} from './Modify';


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
  console.log(file);
  let description = undefined;
  if (file !== null) {
    description = JSON.parse(file.description);
  }
  console.log(file);
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
