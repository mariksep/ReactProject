import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import BackButton from '../components/BackButton';
import { MediaContext } from '../contexts/MediaContext';
import { userInformation, getAvatarImage } from '../hooks/ApiHooks';
import ProfileForm from '../components/ProfileForm';
import { Card, Button, Grid, Typography, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MyMediaRow from '../components/MyMediaRow';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import FaceIcon from '@material-ui/icons/Face';
import Nav from '../components/Nav';

const baseUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';
const useStyles = makeStyles({
  card: {
    margin: '0.5em',
    maxWidth: '30%',
  },
  profile: {
    width: '100vw',
  },
  item: {
    width: '100vw',
  },
  button: {
    Width: '100%',
  },
  p: {
    padding: '0.5em',
  },
});

const Profile = ({ history }) => {
  const classes = useStyles();
  const [user, setUser] = useContext(MediaContext);
  const [avatar, setAvatar] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const userdata = await userInformation(localStorage.getItem('token'));
      setUser(userdata);
      return userdata;
    };
    checkUser();
  }, [setUser]);

  useEffect(() => {
    (async () => {
      if (user !== null) {
        setAvatar(await getAvatarImage(user.user_id));
      }
    })();
  }, [user]);

  const profileIndex = avatar.length - 1;
  const showUpdate = () => {
    setShow(!show);
  };

  return (
    <>
      <Nav />
      <Grid container justify='center' alignItems='center'>
        <h1>Profile</h1>
      </Grid>

      {user != null && (
        <Grid container direction='row' justify='center' alignItems='center'>
          <Grid
            item
            container
            direction='row'
            justify='center'
            alignItems='center'
          >
            <Card className={classes.card}>
              {avatar.length === 0 && (
                <img
                  src='http://placekitten.com/200/300'
                  alt='default profile picture'
                />
              )}
              {avatar.length > 0 && (
                <img
                  src={baseUrl + avatar[profileIndex].filename}
                  alt='your profile picture'
                />
              )}

              <Grid
                container
                direction='column'
                justify='center'
                alignItems='center'
              >
                <Grid item>
                  <Grid
                    container
                    direction='row'
                    justify='center'
                    alignItems='center'
                    className={classes.p}
                  >
                    <PersonOutlineIcon />
                    <Typography component='p'>
                      Username: {user.username}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item>
                  <Grid
                    container
                    direction='row'
                    justify='center'
                    alignItems='center'
                    className={classes.p}
                  >
                    <AlternateEmailIcon />
                    <Typography component='p'>Email: {user.email}</Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid
                    container
                    direction='row'
                    justify='center'
                    alignItems='center'
                    className={classes.p}
                  >
                    <FaceIcon />
                    <Typography component='p'>
                      Full name: {user.full_name}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item className={classes.item}>
                <Button className={classes.button} onClick={showUpdate}>
                  Change
                </Button>
              </Grid>

              <Modal open={show}>
                <ProfileForm />
              </Modal>
            </Card>
          </Grid>
          <Grid item>
            <Grid container justify='center' alignItems='center'>
              <h2>Jobs that I have posted </h2>
            </Grid>
            <MyMediaRow />
          </Grid>
        </Grid>
      )}
    </>
  );
};

Profile.propTypes = {
  history: PropTypes.object,
};

export default Profile;
