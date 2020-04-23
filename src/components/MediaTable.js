import React from 'react';
import PropTypes from 'prop-types';
import { useMediaByTag } from '../hooks/ApiHooks';
import {
  GridList,
  GridListTile,
  ListSubheader,
  makeStyles,
  Card,
} from '@material-ui/core';
import MediaRow from './MediaRow';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
    height: '100%',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

const MediaTable = ({ type }) => {
  const classes = useStyles();
  const mediaHelpers = useMediaByTag('nhahelper');
  const mediaHelpNeeded = useMediaByTag('nhaneedhelp');

  return (
    <div className={classes.root}>
      <Card>
        {type === 'nhahelper' &&
          mediaHelpers.map((file) => (
            <MediaRow key={file.file_id} file={file} />
          ))}
        {type === 'nhaneedhelp' &&
          mediaHelpNeeded.map((file) => (
            <MediaRow key={file.file_id} file={file} />
          ))}
      </Card>
    </div>
  );
};

MediaTable.propTypes = {
  type: PropTypes.string,
};

export default MediaTable;
