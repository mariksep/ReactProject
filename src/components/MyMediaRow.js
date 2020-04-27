import React, {useContext, useEffect} from 'react';
import {Grid, GridListTile} from '@material-ui/core';
import {useMediaByTag, userInformation} from '../hooks/ApiHooks';
import {MediaContext} from '../contexts/MediaContext';
import {makeStyles} from '@material-ui/core/styles';


import MyMediaFileRow from './MyMediaFileRow';

const useStyles = makeStyles({

  media: {

    display: 'flex',



  },


});

const MyMediaRow = () => {
  const classes = useStyles();

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

  return (

    <div className={classes.media}>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center">
        <Grid item >
          <h1>Helper Jobs</h1>
        </Grid>
        <Grid
          item
          className={classes.container}>
          {helperMyRow.length>0&&
        helperMyRow.map((file, index)=>{
          return (

            <MyMediaFileRow

              key={file.file_id}
              file={file} index={index}/>

          );
        })
          }
        </Grid>
      </Grid>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
      >
        <Grid item>
          <h1>Need help Jobs</h1>
        </Grid>
        <Grid
          item
          className={classes.container}>
          {needhelpMyRow.length>0&&
        needhelpMyRow.map((file, index)=>{
          return (<MyMediaFileRow

            key={file.file_id}
            file={file} index={index}/>);
        })
          }
        </Grid>
      </Grid>
    </div>

  );
};


export default MyMediaRow;
