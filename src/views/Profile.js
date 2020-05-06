import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {MediaContext} from '../contexts/MediaContext';
import {userInformation, getAvatarImage} from '../hooks/ApiHooks';
import ProfileForm from '../components/ProfileForm';
import {
  Card,
  Button,
  Grid,
  Typography,
  Modal,
  CardContent,
  CardMedia,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import MyMediaRow from '../components/MyMediaRow';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import FaceIcon from '@material-ui/icons/Face';
import Nav from '../components/Nav';

const baseUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';
const useStyles = makeStyles({
  card: {
    'width': '30vw',
    'height': '50%',
    'margin': '1rem',
    '@media (max-width:950px)': {
      width: '50vw',
    },
    '@media (max-width:600px)': {
      width: '90vw',
    },
  },
  profilePic: {
    height: 200,
    width: '100%',
  },
  icon: {
    color: '#442C2E',
  },
});

const Profile = ({history}) => {
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
  let profilePic = 'http://placekitten.com/200/300';
  if (avatar.length > 0) {
    profilePic = baseUrl + avatar[profileIndex].filename;
  }

  return (
    <>
      <Nav />
      <Grid container justify='center'>
        <Typography component='h1' variant='h2'>
          Profile
        </Typography>
      </Grid>

      {user != null && (
        <>
          <Grid container justify='center'>
            <Card className={classes.card}>
              <CardMedia
                className={classes.profilePic}
                image={profilePic}
                alt='Avatar image'
                title='Avatar image'
              ></CardMedia>
              <CardContent className={classes.cardContent}>
                <Grid container direction='column' justify='center'>
                  <Grid item>
                    <PersonOutlineIcon className={classes.icon} />
                    <Typography component='p'>
                      Username: {user.username}
                    </Typography>
                  </Grid>

                  <Grid item>
                    <AlternateEmailIcon className={classes.icon} />
                    <Typography component='p'>Email: {user.email}</Typography>
                  </Grid>
                  <Grid item>
                    <FaceIcon className={classes.icon} />
                    <Grid container>
                      <Typography component='p'>Full name: </Typography>
                      <Typography component='p'>  { user.full_name}
                      </Typography>
                    </Grid>

                  </Grid>
                </Grid>
                <Button fullWidth onClick={showUpdate}>
                  Change
                </Button>
              </CardContent>

              <Modal open={show}>
                <ProfileForm />
              </Modal>
            </Card>
          </Grid>

          <Grid container justify='center' alignItems='center'>
            <Typography component='h2' variant='h2'>
              Jobs that I have posted{' '}
            </Typography>
          </Grid>
          <MyMediaRow />
        </>
      )}
    </>
  );
};

Profile.propTypes = {
  history: PropTypes.object,
};

export default Profile;
