import React from 'react';
import MediaTable from '../components/MediaTable';
import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@material-ui/core';

const Media = () => {
  return (
    <div>
      <h1> Media nappula kumpi row haetaan </h1>
      <MediaTable />
      <Button fullWidth component={RouterLink} to='/upload'>
        Uploadiin
      </Button>
      <Button fullWidth component={RouterLink} to='/helpers'>
        Helpers
      </Button>
      <Button fullWidth component={RouterLink} to='/helpwanted'>
        HelpWanted
      </Button>
    </div>
  );
};

export default Media;
