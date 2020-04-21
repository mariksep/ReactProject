import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import BackButton from '../components/BackButton';
import {MediaContext} from '../contexts/MediaContext';
import {userInformation, userAvatar} from '../hooks/ApiHooks';
import ProfileForm from '../components/ProfileForm';
import {Button} from '@material-ui/core';

const baseUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const Profile = ({history}) => {
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


  const showUpdate = () => {
    setShow(!show);
    // lisäää vielä että button katoaa clickistä
  };
  console.log(user);
  return (
    <>
      <BackButton />
      <h1>Profile</h1>
      <Button onClick={showUpdate}>Change</Button>

      {
        show ?
            <ProfileForm/> :
       (
        user !== null &&

        <>
          <p>{user.username}</p>
          <p>{user.email}</p>
          <p>{user.full_name}</p>
        </>
       )
      }

    </>
  );
};

Profile.propTypes = {
  history: PropTypes.object,
};

export default Profile;
