import React from 'react';
import {Card,
  Grid,
  IconButton,
  CardMedia,
  Typography,
  CardContent,
} from '@material-ui/core';
import {
  deleteFile,
} from '../hooks/ApiHooks';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import BrushIcon from '@material-ui/icons/Brush';
import {Link as RouterLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import CommentIcon from '@material-ui/icons/Comment';

const baseUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';
const useStyles = makeStyles({
  card: {
    'position': 'relative',
    'width': '30vw',

    'margin': '1rem',
    '@media (max-width:950px)': {
      width: '50vw',
    },
    '@media (max-width:600px)': {
      width: '90vw',
    },
  },
  cardmedia: {
    height: 200,
    width: '100%',
  },
  contact: {
    margin: '1rem',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    width: '2.7rem',
    height: '2.7rem',
  },

  icon: {
    color: '#442C2E',

  },
  icons: {
    marginRight: '1em',
  },
  desc: {
    width: '10%',
  },

});

const MyMediaFileRow =({file, index}) => {
  const item = JSON.parse(file.description);
  const classes = useStyles();
  let cardmedia= 'http://placekitten.com/200/300';
  if (file.thumbnails) {
    cardmedia =baseUrl +file.thumbnails.w320;
  }


  return (
    <>
      <Card className={classes.card} key={index}>
        <CardContent>
          <Typography
            component='h5'
            variant='h5'
          >{file.title}</Typography>
        </CardContent>
        <CardMedia
          className={classes.cardmedia}
          image={cardmedia}
          alt="Post image"
          title=" Post image"
        >
        </CardMedia>
        <CardContent>
          <Grid
            container
            direction="row">
            <CommentIcon className={classes.icons}/>
            <Typography component='p'> {item.desc}</Typography>
          </Grid>
          <Grid
            container
            direction="row">
            <ContactMailIcon className={classes.icons}/>
            <Typography component='p'>
            contact: {item.contact}</Typography>
          </Grid>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center">

            <IconButton
              aria-label={`info about ${file.title}`}
              component={RouterLink}
              to={'/SingleFile/'+file.file_id}>
              <ZoomInIcon
                className={classes.icon}/>Zoom
            </IconButton>

            <IconButton
              component={RouterLink}
              aria-label={`Modify file`}
              to={'/Modify/'+file.file_id}>
              <BrushIcon
                className={classes.icon}
              />
              Modify
            </IconButton>
            <IconButton
              aria-label={`delete file`}
              component={RouterLink}
              onClick={
                ()=>{
                  const delOK= window.confirm(`Do you want to delete
                    ${file.title} post?` );
                  if (delOK) {
                    deleteFile(file.file_id);
                    window.location.reload();
                  }
                }

              }
              to={'/Profile'}>
              <DeleteIcon
                className={classes.icon}
              /> Delete
            </IconButton>
          </Grid>
        </CardContent>

      </Card>
    </>
  );
};

MyMediaFileRow.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
};

export default MyMediaFileRow;
