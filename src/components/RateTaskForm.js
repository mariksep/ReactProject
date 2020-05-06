import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import {
  Grid,
  Typography,
  FormControl,
  FormLabel,
  FormControlLabel,
  FormHelperText,
  RadioGroup,
  Radio,
  Button,
  IconButton,
  CircularProgress,
  makeStyles,
  ListItem,
  List,
  ListItemIcon,
} from '@material-ui/core';
import useRatingForm from '../hooks/RatingHooks';
import { addRating, deleteRating } from '../hooks/ApiHooks';
import DeleteIcon from '@material-ui/icons/Delete';
import StarIcon from '@material-ui/icons/Star';

const useStyles = makeStyles((theme) => ({
  preview: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteBtn: {
    borderRadius: '5px',
    border: '2px solid #ec1616',
    marginTop: '2rem',
    '&:hover': {
      background: '#d817172e',
    },
  },
  starIcon: {
    color: '#e2e232',
    fontSize: '2.5rem',
  },
  starIconBtn: {
    color: '#e2e232',
    fontSize: '2rem',
    marginRight: '0.3rem',
  },
}));

const RateTaskForm = ({ isShowing, hide, file, alreadyRated }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  console.log('fileee', file);
  const doRating = async () => {
    setLoading(true);

    try {
      const ratingObject = {
        file_id: file.file_id,
        rating: inputs.rating,
      };
      const result = await addRating(ratingObject);
      console.log('ratingin teko onnistui', result);
      // Siirry sille sivulle mitä tyyppiä postaus oli
      setTimeout(() => {
        setLoading(false);
        window.location.reload();
      }, 2000);
    } catch (e) {
      console.log(e.message);
    }
  };

  const { inputs, error, handleSubmit, handleRadioChange } = useRatingForm(
    doRating
  );

  return (
    <>
      {isShowing
        ? ReactDOM.createPortal(
            <React.Fragment>
              <div className='modal-overlay' />
              <div
                className='modal-wrapper'
                aria-modal
                aria-hidden
                tabIndex={-1}
                role='dialog'
              >
                <div className='modal'>
                  <div className='modal-header'>
                    <button
                      type='button'
                      className='modal-close-button'
                      data-dismiss='modal'
                      aria-label='Close'
                      onClick={hide}
                    >
                      <span aria-hidden='true'>&times;</span>
                    </button>
                  </div>
                  <Grid container>
                    <Grid
                      container
                      direction='column'
                      justify='center'
                      alignItems='center'
                    >
                      {alreadyRated.rated === false && (
                        <>
                          <Typography variant='h5' style={{ margin: '2rem' }}>
                            Rate this task and user
                          </Typography>
                          <form onSubmit={handleSubmit}>
                            <FormControl component='fieldset' error={error}>
                              <FormLabel
                                id='uploadRadioText'
                                component='legend'
                              >
                                1 being the worst and 5 being the best
                                experience
                              </FormLabel>
                              <RadioGroup
                                aria-label='typeoftask'
                                name='type'
                                style={{
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  margin: '1rem',
                                }}
                                onChange={handleRadioChange}
                              >
                                <FormControlLabel
                                  value='1'
                                  control={<Radio />}
                                  label='1'
                                />
                                <FormControlLabel
                                  value='2'
                                  control={<Radio />}
                                  label='2'
                                />
                                <FormControlLabel
                                  value='3'
                                  control={<Radio />}
                                  label='3'
                                />
                                <FormControlLabel
                                  value='4'
                                  control={<Radio />}
                                  label='4'
                                />
                                <FormControlLabel
                                  value='5'
                                  control={<Radio />}
                                  label='5'
                                />
                              </RadioGroup>
                              <FormHelperText
                                style={{
                                  textAlign: 'center',
                                  marginBottom: '2rem',
                                }}
                              >
                                Choose one
                              </FormHelperText>
                              {loading && (
                                <Grid item className={classes.preview}>
                                  <CircularProgress />
                                </Grid>
                              )}
                              <Button fullWidth type='submit' size='large'>
                                <StarIcon className={classes.starIconBtn} />
                                Save rate
                              </Button>
                            </FormControl>
                          </form>
                        </>
                      )}
                      {alreadyRated.rated === true && (
                        <>
                          <List>
                            <Typography variant='h5' style={{ margin: '2rem' }}>
                              You have already rated this task
                            </Typography>
                            <ListItem className={classes.listItem}>
                              <Typography
                                variant='h6'
                                style={{ margin: '1rem' }}
                              >
                                You rated this as {alreadyRated.rate}
                              </Typography>
                              <ListItemIcon>
                                <StarIcon className={classes.starIcon} />
                              </ListItemIcon>
                            </ListItem>
                            <ListItem className={classes.listItem}>
                              <IconButton
                                className={classes.deleteBtn}
                                aria-label={`delete rate`}
                                component={RouterLink}
                                onClick={() => {
                                  const delOK = window.confirm(
                                    `Do you want to delete this rate?`
                                  );
                                  if (delOK) {
                                    deleteRating(file.file_id);
                                    window.location.reload();
                                  }
                                }}
                                to={`/SingleFile/${file.file_id}`}
                              >
                                <DeleteIcon /> Delete this rate
                              </IconButton>
                            </ListItem>
                          </List>
                        </>
                      )}
                    </Grid>
                  </Grid>
                </div>
              </div>
            </React.Fragment>,
            document.body
          )
        : null}
    </>
  );
};

RateTaskForm.propTypes = {
  isShowing: PropTypes.bool,
  hide: PropTypes.func,
  file: PropTypes.object,
  alreadyRated: PropTypes.object,
};

export default RateTaskForm;
