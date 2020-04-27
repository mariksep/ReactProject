import React, {useContext, useEffect} from 'react';
import {Card,
  Grid,
  IconButton,
  GridList,
  GridListTile,
  GridListTileBar,
} from '@material-ui/core';
import {deleteFile, useMediaByTag, userInformation} from '../hooks/ApiHooks';
import {MediaContext} from '../contexts/MediaContext';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import BrushIcon from '@material-ui/icons/Brush';
import {Link as RouterLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';


const baseUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';
const useStyles = makeStyles({
  card: {
    position: 'relative',

  },

  icons: {
    position: 'absolute',
    top: '50%',
    left: '0',
    backgroundColor: 'white',
  },
  icon: {
    color: 'black',
  },

});


// eslint-disable-next-line react/prop-types
const MyMediaFileRow =({file, index}) => {
  const classes = useStyles();
  return (
    <Grid className={classes.gridi}>
      <Card className={classes.card} key={index}>
        <Grid className={classes.img} >
          <img src={baseUrl +file.thumbnails.w320}/>
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
              className={classes.icon}

              fontSize='medium'/>Zoom
          </IconButton>

          <IconButton
            component={RouterLink}
            aria-label={`Modify file`}
            to={'/Modify/'+file.file_id}>
            <BrushIcon
              className={classes.icon}

              fontSize='medium'/>Modify</IconButton>
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
            to={'/Profile'}>Delete</IconButton>

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
