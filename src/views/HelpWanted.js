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

const HelpWanted = () => {
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
        Help Wanted
      </Typography>
      <MediaTable type={'nhaneedhelp'} />
    </>
  );
};

export default HelpWanted;
