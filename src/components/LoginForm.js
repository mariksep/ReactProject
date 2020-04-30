import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import useLoginForm from '../hooks/LoginHooks';
import { login } from '../hooks/ApiHooks';
import { MediaContext } from '../contexts/MediaContext';
import { withRouter } from 'react-router-dom';
import { TextField, Button, Grid, InputAdornment } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import LockIcon from '@material-ui/icons/Lock';

const useStyles = makeStyles((theme) => ({
  inputs: {
    padding: '1em',
    textAlign: 'center',
    width: '40vw',
  },
}));

const LoginForm = ({ history }) => {
  const classes = useStyles();

  const [user, setUser] = useContext(MediaContext);
  const doLogin = async () => {
    try {
      // hakee käyttäjän tiedot Apihooksista
      const userData = await login(inputs);
      // tallenta ne ylhäällä olevaan user muuttujaan
      setUser(userData.user);
      // tallentaa token
      localStorage.setItem('token', userData.token);
      // siirtyy media sivulle
      history.push('/media');
    } catch (e) {
      console.log(e.message);
      return alert('The username or password incorrect — Try again!');
      // throw new Error(e.message);
    }
  };

  const { inputs, handlesubmit, handleInputChange } = useLoginForm(doLogin);
  return (
    <Grid
      container
      direction='column'
      justify='space-around'
      alignItems='center'
    >
      <Grid item>
        <div>
          <h1>Login</h1>
        </div>
      </Grid>

      <Grid item>
        <form onSubmit={handlesubmit}>
          <Grid
            container
            direction='column'
            justify='space-between'
            alignItems='center'
          >
            <Grid item>
              <TextField
                className={classes.inputs}
                onChange={handleInputChange}
                type='text'
                name='username'
                placeholder='username'
                value={inputs.username}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <PersonOutlineIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                className={classes.inputs}
                onChange={handleInputChange}
                type='password'
                name='password'
                placeholder='password'
                value={inputs.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item>
              <Button size='large' type='submit'>
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};
LoginForm.propTypes = {
  history: PropTypes.object,
};

export default withRouter(LoginForm);
