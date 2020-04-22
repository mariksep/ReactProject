import React from 'react';
import BackButton from '../components/BackButton';
import { Typography } from '@material-ui/core';
import MediaTable from '../components/MediaTable';

const Helpers = () => {
  return (
    <>
      <BackButton />
      <Typography component='h1' variant='h2' gutterBottom>
        Helpers
      </Typography>
      <MediaTable type={'nhahelper'} />
    </>
  );
};

export default Helpers;
