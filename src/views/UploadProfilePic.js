import React, {useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import {ValidatorForm} from 'react-material-ui-form-validator';
import useUploadProfileForm from '../hooks/UpdateProfileHooks';
import {uploadProfilePic, userInformation} from '../hooks/ApiHooks';
import {MediaContext} from '../contexts/MediaContext';
import {withRouter} from 'react-router-dom';
import {Button} from '@material-ui/core';


const UploadProfilePic = ({history}) => {
  const [user, setUser] = useContext(MediaContext);

  // 'nha_profile'
  useEffect(() => {
    const checkUser = async () => {
      const userdata = await userInformation(localStorage.getItem('token'));
      setUser(userdata);
      return userdata;
    };
    checkUser();
  }, [setUser]);

  const tag = 'nha_profile'+ user.user_id;
  const doUpload = async () =>{
    const uploadObject={
      title: 'kok',
      description: 'kok',
      file: inputsPic.file,

    };
    const result = await uploadProfilePic(uploadObject,
        tag, user.user_id);
    window.location.reload();
  };

  const {
    inputsPic,
    setInputsPic,
    handleSubmitPicture,
    handleFileChangePicture,
  }= useUploadProfileForm(doUpload);

  return (
    <>
      <h1>Update your profile picture</h1>
      <ValidatorForm onSubmit={handleSubmitPicture}>
        <input
          type='file'
          name='file'
          accept='image/*,video/*,audio/*'
          onChange={handleFileChangePicture}
        />
        <Button type='submit'>save</Button>
      </ValidatorForm>
    </>
  );
};

UploadProfilePic.propTypes = {
  history: PropTypes.object,

};

export default withRouter( UploadProfilePic);
