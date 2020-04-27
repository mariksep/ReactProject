import React from 'react';
import PropTypes from 'prop-types';
import { useMediaByTag } from '../hooks/ApiHooks';
import { makeStyles } from '@material-ui/core';
import MediaRow from './MediaRow';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
}));

const MediaTable = ({ type }) => {
  const classes = useStyles();
  const mediaHelpers = useMediaByTag('nhahelper');
  const mediaHelpNeeded = useMediaByTag('nhaneedhelp');

  return (
    <div className={classes.root}>
      {type === 'nhahelper' &&
        mediaHelpers.map((file) => (
          <MediaRow key={file.file_id} file={file} type={type} />
        ))}
      {type === 'nhaneedhelp' &&
        mediaHelpNeeded.map((file) => (
          <MediaRow key={file.file_id} file={file} type={type} />
        ))}
    </div>
  );
};

MediaTable.propTypes = {
  type: PropTypes.string,
};

export default MediaTable;
