import React from 'react';
import PropTypes from 'prop-types';
import BackButton from '../components/BackButton';
import { Typography } from '@material-ui/core';
import { useMediaByTag } from '../hooks/ApiHooks';

const HelpWanted = (props) => {
  const picArray = useMediaByTag('nhaneedhelp');

  return (
    <>
      <BackButton />
      <Typography component='h1' variant='h2' gutterBottom>
        HelpWanted
      </Typography>
    </>
  );
};

HelpWanted.propTypes = {};

export default HelpWanted;
