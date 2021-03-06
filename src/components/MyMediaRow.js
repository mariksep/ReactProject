import React, {useContext, useEffect} from 'react';
import {Grid, Typography} from '@material-ui/core';
import {useMediaByTag, userInformation} from '../hooks/ApiHooks';
import {MediaContext} from '../contexts/MediaContext';

import MyMediaFileRow from './MyMediaFileRow';



const MyMediaRow = () => {


  const [user, setUser] = useContext(MediaContext);
  useEffect(() => {
    const checkUser = async () => {
      const userdata = await userInformation(localStorage.getItem('token'));
      setUser(userdata);
      return userdata;
    };
    checkUser();
  }, [setUser]);

  const helper = useMediaByTag('nhahelper');
  const needhelp = useMediaByTag('nhaneedhelp');

  const helperMyRow = helper.filter((item) => item.user_id === user.user_id);
  const needhelpMyRow = needhelp.filter(
      (item) => item.user_id === user.user_id,
  );

  return (
    <>
      <Grid container justify='center'>
        <Grid item>
          <>
            {helperMyRow.length === 0 && needhelpMyRow.length === 0 && (
              <>
                <Typography variant='subtitle1'>
                  You have not posted any{' '}
                </Typography>
              </>
            )}
            {helperMyRow.length > 0 && (
              <Typography component='h4' variant='h4'>
                Helper Jobs
              </Typography>
            )}
            {helperMyRow.length > 0 &&
              helperMyRow.map((file, index) => {
                return (

                  <MyMediaFileRow
                    key={file.file_id}
                    file={file}
                    index={index}
                  />

                );
              })}
          </>
        </Grid>
        <Grid item>
          {needhelpMyRow.length > 0 && (
            <Typography component='h4' variant='h4'>
              Need help Jobs
            </Typography>
          )}
          {needhelpMyRow.length > 0 &&
            needhelpMyRow.map((file, index) => {
              return (
                <MyMediaFileRow
                  key={file.file_id}
                  file={file}
                  index={index}
                />
              );
            })}
        </Grid>
      </Grid>
    </>
  );
};

export default MyMediaRow;
