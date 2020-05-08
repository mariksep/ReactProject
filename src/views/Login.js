import React, {useState} from 'react';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import { Typography, FormGroup, Switch} from '@material-ui/core/';
import {Grid} from '@material-ui/core/';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '100vw',
    height: '100vh',
  },
  text: {
    margin: '1em',
    textAlign: 'center',
  },
});

const Login = () => {
  const classes = useStyles();
  const [show, setShow] = useState(true);
  const showForms = () => {
    setShow(!show);
  };

  return (
    <>
      {/*  Etusivu jossa voi kirjautua sisssän tai rekisteröityä*/}
      <Grid
        container
        direction='column'
        alignItems='center'
        justify='center'
        className={classes.root}
      >
        <Grid
          direction='column'
          alignItems='center'
          justify='center'
          className={classes.text}
        >
          <Typography disableTypography={true} variant='h1'>
            NEIGHBOR HELP
          </Typography>
          <Typography variant='subtitle1'>
            Welcome to the neighbor help app. The neighbor help app helps you
            find help for everyday tasks and you can also offer it to others who
            need help{' '}
          </Typography>
        </Grid>
        <Grid direction='column' alignItems='center' justify='center'>
          <FormGroup>
            <Typography component='div'>
              <Grid
                component='label'
                container
                justify='center'
                alignItems='center'
                spacing={1}
              >
                <Grid item> Login</Grid>
                <Switch color='default' onChange={showForms} name='checkedA' />
                <Grid item> Register</Grid>
              </Grid>
            </Typography>
          </FormGroup>
          {/* vaihtaa loginin ja rekisterin välillä riippuewn show arvosta */}
          {show ? <LoginForm /> : <RegisterForm />}
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
