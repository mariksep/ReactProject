import PropTypes from 'prop-types';
import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
  backbutton: {
    position: 'absolute',
    top: '10%',
    left: '8%',
  },
}));

const BackButton = ({ history }) => {
  const classes = useStyles();
  return (
    <>
      <Button
        className={classes.backbutton}
        startIcon={<ArrowBackIcon />}
        onClick={() => {
          history.goBack();
        }}
      >
        Back
      </Button>
    </>
  );
};

BackButton.propTypes = {
  history: PropTypes.object,
};

export default withRouter(BackButton);
