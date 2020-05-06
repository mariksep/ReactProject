import React from 'react';

import { Typography, makeStyles } from '@material-ui/core';
import MediaTable from '../components/MediaTable';
import Nav from '../components/Nav';

const useStyles = makeStyles((theme) => ({
  header: {
    textAlign: 'center',
    marginBottom: '4rem',
    marginTop: '3rem',
  },
}));

const Helpers = () => {
  const classes = useStyles();
  return (
    <>
      <Nav />
      <Typography
        component='h1'
        variant='h2'
        gutterBottom
        className={classes.header}
      >
        Helpers
      </Typography>
      <MediaTable type={'nhahelper'} />
    </>
  );
};

export default Helpers;
