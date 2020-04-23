import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@material-ui/core';

const Media = () => {
  return (
    <div>
      <Button fullWidth component={RouterLink} to='/Profile'>
        Profile
      </Button>
      <Button fullWidth component={RouterLink} to='/helpers'>
        Helpers
      </Button>
      <Button fullWidth component={RouterLink} to='/helpwanted'>
        HelpWanted
      </Button>
      <Button fullWidth component={RouterLink} to='/upload'>
        Uploadiin
      </Button>
    </div>
  );
};

export default Media;
