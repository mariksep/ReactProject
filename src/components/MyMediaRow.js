import React, {useContext, useEffect} from 'react';
import {Card, Button, Grid} from '@material-ui/core';
import {useMediaByTag, userInformation} from '../hooks/ApiHooks';
import {MediaContext} from '../contexts/MediaContext';
const baseUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const MyMediaRow = (props) => {
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

  const helperMyRow= helper.filter((item)=>item.user_id===user.user_id);
  const needhelpMyRow= needhelp.filter((item)=>item.user_id===user.user_id);

  console.log(helperMyRow);
  return (
    <div>
      <h1>Helper Jobs</h1>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center">
        {helperMyRow.length>0&&
        helperMyRow.map((file, index)=>{
          return <img key={index} src={baseUrl +file.thumbnails.w160}/>;
        })
        }
      </Grid>
      <h1>Need help Jobs</h1>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center">
        {needhelpMyRow.length>0&&
        needhelpMyRow.map((file, index)=>{
          return <img key={index} src={baseUrl +file.thumbnails.w160}/>;
        })
        }
      </Grid>
    </div>
  );
};


export default MyMediaRow;
