import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import BackButton from '../components/BackButton';
import {MediaContext} from '../contexts/MediaContext';
import {userInformation, getAvatarImage} from '../hooks/ApiHooks';
import ProfileForm from '../components/ProfileForm';
import {Card, Button, Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import MyMediaRow from '../components/MyMediaRow';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import FaceIcon from '@material-ui/icons/Face';

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
        direction="row"
        justify="center"
        alignItems="center"
      >
        <h1>Profile</h1>
      </Grid>

      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >

        {(
          user != null&&
            <>

              <Card className={classes.card}>
                {avatar.length===0 &&
                  <img src='http://placekitten.com/200/300'alt='default profile picture'/>
                }
                {avatar.length > 0 &&
                  <img src={baseUrl+ avatar[profileIndex].filename}
                    alt='your profile picture'/>
                }


                <p><PersonOutlineIcon/>{user.username}</p>
                <p><AlternateEmailIcon/>{user.email}</p>
                <p><FaceIcon/>{user.full_name}</p>
                <Button onClick={showUpdate}>Change</Button>
                {show ?
                    <>
                      <Card><ProfileForm/></Card>

                    </> :
                    <></>

                }
              </Card>

              <Grid>
                <MyMediaRow/>
              </Grid>
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
