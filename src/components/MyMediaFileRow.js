import React, {useContext, useEffect} from 'react';
import {Card,
  Grid,
  IconButton,

  Typography,
} from '@material-ui/core';
import {deleteFile, useMediaByTag, userInformation} from '../hooks/ApiHooks';
import {MediaContext} from '../contexts/MediaContext';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import BrushIcon from '@material-ui/icons/Brush';
import {Link as RouterLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const baseUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';
const useStyles = makeStyles({
  card: {
    position: 'relative',
    margin: '2rem',
    width: '30rem',

  },
  img: {
    width: '100rem',
  },

  icons: {
    position: 'absolute',
    top: '0',
    left: '0',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  icon: {
    color: 'black',
  },
  desc: {
    width: '10%',
  },

});

const MyMediaFileRow =({file, index}) => {
  const item = JSON.parse(file.description);
  const classes = useStyles();
  return (
    <Grid>
      <Card className={classes.card} key={index}>
        <Grid className={classes.img} >
          <img src={baseUrl +file.thumbnails.w640}/>
        </Grid>
        <Grid
          className={classes.icons}
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

        <Grid container
          direction="column"
          justify="center"
          alignItems="center">
          <Typography component='p'>Description: {item.desc}</Typography>
          <Typography component='p'>Contact information: {item.contact}</Typography>
        </Grid>

      </Card>
    </Grid>
  );
};

MyMediaFileRow.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
};

export default MyMediaFileRow;
