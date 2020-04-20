import React from 'react';
import PropTypes from 'prop-types';
import BackButton from '../components/BackButton';
import { Typography } from '@material-ui/core';
import { useMediaByTag } from '../hooks/ApiHooks';

const Helpers = (props) => {
  const posts = useMediaByTag('nhahelper');
  console.log('helpers', posts);

  return (
    <>
      <BackButton />
      <Typography component='h1' variant='h2' gutterBottom>
        Helpers
      </Typography>
    </>
  );
};

Helpers.propTypes = {};

export default Helpers;
