import React, {useContext, useEffect} from 'react';
import {Card, Grid, IconButton} from '@material-ui/core';
import {deleteFile, useMediaByTag, userInformation} from '../hooks/ApiHooks';
import {MediaContext} from '../contexts/MediaContext';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import BrushIcon from '@material-ui/icons/Brush';
import {Link as RouterLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import MyMediaRow from './MyMediaRow';


const baseUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

// eslint-disable-next-line react/prop-types
const MyMediaFileRow =({file, index}) => {
  return (
    <>
      <Card key={index}>
        <img src={baseUrl +file.thumbnails.w160}/>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center">

          <IconButton
            aria-label={`info about ${file.title}`}
            component={RouterLink}
            to={'/SingleFile/'+file.file_id}>
            <ZoomInIcon fontSize='large'/>Zoom
          </IconButton>

          <IconButton
            component={RouterLink}
            aria-label={`Modify file`}
            to={'/Modify/'+file.file_id}>
            <BrushIcon fontSize='large'/>Modify</IconButton>
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
    </>
  );
};

MyMediaFileRow.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
};

export default MyMediaFileRow;
