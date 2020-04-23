import React from 'react';
import BackButton from '../components/BackButton';
import { Typography } from '@material-ui/core';
import { useMediaByTag } from '../hooks/ApiHooks';
import MediaTable from '../components/MediaTable';

const HelpWanted = () => {
  const picArray = useMediaByTag('nhaneedhelp');
  console.log(picArray);

  return (
    <>
      <BackButton />
      <Typography component='h1' variant='h2' gutterBottom>
        HelpWanted
      </Typography>
      <MediaTable type={'nhaneedhelp'} />
    </>
  );
};

export default HelpWanted;
