import React from 'react';
import BackButton from '../components/BackButton';
import { Typography, makeStyles } from '@material-ui/core';
import MediaTable from '../components/MediaTable';

const useStyles = makeStyles((theme) => ({
  header: {
    textAlign: 'center',
    marginBottom: '4rem',
  },
}));

const HelpWanted = () => {
  const classes = useStyles();
  return (
    <>
      <BackButton />
      <Typography
        component='h1'
        variant='h2'
        gutterBottom
        className={classes.header}
      >
        HelpWanted
      </Typography>
      <MediaTable type={'nhaneedhelp'} />
    </>
  );
};

export default HelpWanted;
