import React from 'react';
import MediaTable from '../components/MediaTable';
import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@material-ui/core';

const Media = () => {
  return (
    <div>
      <h1> Media nappula kumpi row haetaan </h1>
      <MediaTable />
      <Button component={RouterLink} to='/upload'>
        Uploadiin
      </Button>
    </div>
  );
};

export default Media;
