import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import BackButton from '../components/BackButton';
import {MediaContext} from '../contexts/MediaContext';
import {userInformation, getAvatarImage} from '../hooks/ApiHooks';
import ProfileForm from '../components/ProfileForm';
import {Card, Button, Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import UploadProfilePic from './UploadProfilePic';

const baseUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';
const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },

});


const Profile = ({history}) => {
  const classes = useStyles();
  const [user, setUser] = useContext(MediaContext);
  const [avatar, setAvatar] = useState([]);
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState(true);

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
  const profileIndex =avatar.length-1;

  const showUpdate = () => {
    setShow(!show);
  };
  return (
    <>
      <BackButton />
      <Grid
        container
        direction="column"
        justify="space-between"
        alignItems="center"
      >
        <h1>Profile</h1>

        {(
          user !== null&&
            <>

              <Card className={classes.card}>
                {avatar.length===0 &&
                  <img src='http://placekitten.com/200/300'alt='default profile picture'/>
                }
                {avatar.length > 0 &&
                  <img src={baseUrl+ avatar[profileIndex].filename}
                    alt='your profile picture'/>
                }


                <p>{user.username}</p>
                <p>{user.email}</p>
                <p>{user.full_name}</p>
                <Button onClick={showUpdate}>Change</Button>
              </Card>

              {show ?
                 <>
                   <Card><ProfileForm></ProfileForm></Card>

                 </> :
                  <Card></Card>

              }
            </>
        )}

      </Grid>

    </>
  );
};

Profile.propTypes = {
  history: PropTypes.object,
};

export default Profile;