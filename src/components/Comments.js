import React, {useContext, useEffect, useState} from 'react';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {Avatar, Button, Grid, Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PropTypes from 'prop-types';
import {
  useFileComments,
  addComment,
  userInformation,
  FileComments,
} from '../hooks/ApiHooks';
import useCommentForm from '../hooks/CommentHooks';
import {MediaContext} from '../contexts/MediaContext';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: 600,
    margin: `${theme.spacing(1)}px auto`,

  },

  container: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },

  modal: {


    'margin': '1em',
    'borderRadius': '15px',
    'backgroundColor': 'white',
    'display': 'flex',
    'justifyContent': 'center',
    'alignItems': 'center',
    'flexDirection': 'column',
    'maxHeight': '90vh',


  },

  content: {
    'overflow': 'auto',
    'width': '70vw',
  },

  commentelse: {
    'color': 'white',
    'margin': '0.1em',
    'padding': '1em',
    'backgroundColor': '#0084ff',
    'borderRadius': '15px',
    '@media (max-width:600px)': {
    //  width: '40vw',
    },
  },
  commentmy: {
    'color': 'white',
    'margin': '0.1em',
    'padding': '1em',
    'backgroundColor': 'grey',
    'borderRadius': '15px',
    '@media (max-width:600px)': {
      //   width: '40vw',
    },

  },
  nocomments: {
    width: '40vw',
    margin: '0.1em',
    padding: '1em',
    borderRadius: '15px',
  },
  avatar: {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '3rem',
    height: '3rem',
  },

}));

const Comments = ({file}) => {
  const [user, setUser] = useContext(MediaContext);
  // eslint-disable-next-line new-cap
  const [comments, setcomment] = useState([]);


  // setcomment( FileComments(file.file_id));


  const classes = useStyles();

  const doComment=async ()=>{
    try {
      const id =file.file_id;
      await addComment( id, inputs.comment);
      inputs.comment='';
    } catch (e) {
      console.log(e.message);
    }
  };
  const {
    handleSubmitComment,
    inputs,
    setInputs,
    handleInputChangeComment,
  }=useCommentForm(doComment);

  useEffect(() => {
    const checkUser = async () => {
      const userdata = await userInformation(localStorage.getItem('token'));
      setUser(userdata);
      return userdata;
    };
    checkUser();
    const checkComments = async () => {
      // eslint-disable-next-line new-cap
      const comment = await FileComments(file.file_id);
      setcomment(comment);
      return comment;
    };
    checkComments();
  }, [setUser, setcomment]);
  // comments


  const reload = () =>{
    window.location.reload();
  };

  console.log(comments);
  return (
    <Grid className={classes.container}>
      <Grid
        className={classes.modal}>
        <Grid
          container>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={reload}>Back</Button>
        </Grid>

        <div className={classes.content}>
          {Object.keys(comments).length===0 &&
          <div className={classes.root}>
            <div className={classes.paper}>
              <Grid container wrap='wrap' spacing={1}>
                <Grid
                  className={classes.nocomments}>
                   no messages
                </Grid>
              </Grid>
            </div>
          </div>

          }

          {comments.length>0 &&
            comments.map((item) => (

              <div key={item.comment_id} className={classes.root}>
                <div className={classes.paper}>
                  <Grid container
                    alignItems='center'
                    wrap='wrap'
                    spacing={1}>
                    <Grid >
                      <Grid
                        container
                        alignItems='center'
                        className={classes.username}>
                        {item.avatar.length>0&&
                        <Avatar
                          aria-label='user'
                          style={{
                            backgroundImage: `url(${mediaUrl +
                                item.avatar[item.avatar.length - 1].filename})`,
                          }}
                          className={classes.avatar}

                        ></Avatar>
                        }

                        {item.avatar.length==0&&
                        <Avatar
                          aria-label='user'
                          style={{
                            backgroundImage: `url(http://placekitten.com/200/300)`,
                          }}
                          className={classes.avatar}

                        ></Avatar>
                        }
                        {user.user_id===item.user.user_id ?
                          <Grid> Me</Grid>:
                          <Grid>{item.user.username}</Grid>
                        }

                      </Grid>


                      {user.user_id===item.user.user_id ?

                            <Grid
                              className={classes.commentmy}>
                              {item.comment}
                            </Grid> :

                            <Grid
                              className={classes.commentelse}>
                              {item.comment}
                            </Grid>


                      }
                    </Grid>
                  </Grid>
                </div>
              </div>


            ))
          }
        </div>


        <div className={classes.addcomment}>
          <ValidatorForm
            onSubmit={handleSubmitComment}
            instantValidate={false}
            noValidate
          >
            <TextValidator
              className={classes.input}
              type="text"
              name="comment"
              placeholder=" message"
              onChange={handleInputChangeComment}
              value={inputs.comment}
              validators={
                ['minStringLength:1',
                  'maxStringLength:35',
                  'matchRegexp:^[a-öA-Ö]+(([\',. -][a-ÖA-Ö ])?[a-öA-Ö]*)*$']
              }
              errorMessages={[
                'min length 1 characters',
                'max length 35 characters', 'text only']}
            />
            <Button
              fullWidth
              type='submit' >send</Button>
          </ValidatorForm>
        </div >

      </Grid>
    </Grid>
  );
};
Comments.propTypes = {
  match: PropTypes.object,
};


export default Comments;
