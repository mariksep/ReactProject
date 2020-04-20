import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import BackButton from '../components/BackButton';
import {MediaContext} from '../contexts/MediaContext';
import {userInformation, userAvatar} from '../hooks/ApiHooks';

const baseUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';


const Profile = ({history}) => {
  const [user, setUser] = useContext(MediaContext);
  const [avatar, setAvatar] =useState([]);
  useEffect(() =>{
    const checkUser = async () => {
      const userdata= await userInformation(localStorage.getItem('token'));
      setUser(userdata);
      return userdata;
    };
    checkUser();
  }, [setUser]);
  useEffect(() => {
    (async () => {
      if (user !== null) {
        setAvatar(await userAvatar(user.user_id));
      }
    })();
  }, [user]);
  return (
    <>
      <BackButton/>
      <h1>Profile</h1>

      {user !==null && avatar.length > 0 &&
          <>
            <img
              src={baseUrl + avatar[0].filename}
              alt="Avatar image"
            />
            <p>{user.username}</p>
            <p>{user.email}</p>
            <p>{user.full_name}</p>

          </>
      }
    </>
  );
};

Profile.propTypes = {
  history: PropTypes.object,
};

export default Profile;

