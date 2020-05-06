import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { MediaContext } from '../contexts/MediaContext';
import { userInformation, getAvatarImage } from '../hooks/ApiHooks';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Typography,
  makeStyles,
  CardHeader,
  Avatar,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CloseIcon from '@material-ui/icons/Close';
import JobIcon from '../assets/job.png';
import HelperIcon from '../assets/helper.png';
import MapIcon from '../assets/map.png';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    margin: '2rem 4rem',
    borderBottom: '2px solid #FEEAE6',
  },
  drawerIcons: {
    fontSize: '2.7rem',
    color: 'black',
  },
  drawerItem: {
    paddingLeft: '3rem',
    marginBottom: '2rem',
  },
  drawerText: {
    fontSize: '1.2rem',
    fontFamily: 'Roboto, sans-serif',
  },
  icon: {
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    width: '2.7rem',
    height: '2.7rem',
    marginLeft: '2rem',
    marginRight: '0.7rem',
  },
  appbar: {
    boxShadow: 'none',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '0.5rem',
  },
  closeIcon: {
    color: 'black',
    fontSize: '2rem',
    cursor: 'pointer',
    '&:hover': {
      background: '#f1f1f1',
      color: '#b6b6b6',
    },
  },
  picIcons: {
    marginBottom: '2rem',
  },
  avatar: {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '5rem',
    height: '5rem',
    marginRight: '1rem',
  },
  cardHeader: {
    fontSize: '1.5rem',
    marginBottom: '2rem',
    marginLeft: '1rem',
  },
}));

const Nav = ({ history }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useContext(MediaContext);
  const [avatar, setAvatar] = useState([]);
  const [headerColor, setHeaderColor] = useState('transparent');

  // Get user information and check token
  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await userInformation(localStorage.getItem('token'));
        setUser(userData);
      } catch (e) {
        // Send to login-page if there is no token
        history.push('/');
      }
    };
    checkUser();
  }, [history, setUser]);

  // Get avatar image
  useEffect(() => {
    (async () => {
      if (user !== null) {
        setAvatar(await getAvatarImage(user.user_id));
      }
    })();
  }, [user]);

  const profileIndex = avatar.length - 1;
  let profilePicture = 'http://via.placeholder.com/320x200.png?text=User';
  if (avatar.length > 0) {
    profilePicture = mediaUrl + avatar[profileIndex].filename;
  }

  // Change the navbar color on scroll
  const listenScrollEvent = () => {
    window.scrollY > 100
      ? setHeaderColor('#FED8D0')
      : setHeaderColor('transparent');
  };

  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);
  });

  const toggleDrawer = (opener) => () => {
    setOpen(opener);
  };

  return (
    <>
      {user !== null && (
        <>
          <AppBar
            className={classes.appbar}
            style={{ backgroundColor: headerColor }}
          >
            <Toolbar className={classes.toolbar}>
              <IconButton
                edge='start'
                aria-label='menu'
                onClick={toggleDrawer(true)}
              >
                <MenuIcon fontSize='large' />
              </IconButton>
              <Button
                startIcon={
                  <AddCircleOutlineIcon style={{ fontSize: '2.5rem' }} />
                }
                component={RouterLink}
                to='/upload'
              >
                Make new task
              </Button>
            </Toolbar>
          </AppBar>

          <Drawer open={open} onClose={toggleDrawer(false)}>
            <List>
              <ListItem>
                <Typography variant='h4' className={classes.title}>
                  Neighbor Help Application
                </Typography>
                <ListItemIcon onClick={toggleDrawer(false)}>
                  <CloseIcon className={classes.closeIcon} />
                </ListItemIcon>
              </ListItem>
              <ListItem>
                <CardHeader
                  avatar={
                    <Avatar
                      aria-label='user'
                      style={{
                        backgroundImage: `url(${profilePicture})`,
                      }}
                      className={classes.avatar}
                    ></Avatar>
                  }
                  title={user.username}
                  disableTypography={true}
                  className={classes.cardHeader}
                />
              </ListItem>
              <ListItem
                button
                component={RouterLink}
                onClick={toggleDrawer(false)}
                to='/helpers'
                className={classes.picIcons}
              >
                <div
                  style={{
                    backgroundImage: `url(${HelperIcon})`,
                  }}
                  className={classes.icon}
                ></div>
                <ListItemText
                  primary='Helpers'
                  disableTypography={true}
                  className={classes.drawerText}
                />
              </ListItem>
              <ListItem
                button
                component={RouterLink}
                onClick={toggleDrawer(false)}
                to='/helpwanted'
                className={classes.picIcons}
              >
                <div
                  style={{
                    backgroundImage: `url(${JobIcon})`,
                  }}
                  className={`${classes.icon}`}
                ></div>
                <ListItemText
                  primary='Help Wanted'
                  disableTypography={true}
                  className={classes.drawerText}
                />
              </ListItem>
              <ListItem
                button
                component={RouterLink}
                onClick={toggleDrawer(false)}
                to='/media'
                className={classes.picIcons}
              >
                <div
                  style={{
                    backgroundImage: `url(${MapIcon})`,
                  }}
                  className={classes.icon}
                ></div>
                <ListItemText
                  primary='Tasks on the map'
                  disableTypography={true}
                  className={classes.drawerText}
                />
              </ListItem>
              <ListItem
                button
                component={RouterLink}
                onClick={toggleDrawer(false)}
                to='/profile'
                className={classes.drawerItem}
              >
                <ListItemIcon>
                  <AccountCircleIcon className={classes.drawerIcons} />
                </ListItemIcon>
                <ListItemText
                  primary='Profile'
                  disableTypography={true}
                  className={classes.drawerText}
                />
              </ListItem>

              <ListItem
                button
                component={RouterLink}
                onClick={toggleDrawer(false)}
                to='/logout'
                className={classes.drawerItem}
              >
                <ListItemIcon>
                  <ExitToAppIcon className={classes.drawerIcons} />
                </ListItemIcon>
                <ListItemText
                  primary='Logout'
                  disableTypography={true}
                  className={classes.drawerText}
                />
              </ListItem>
            </List>
          </Drawer>
        </>
      )}
    </>
  );
};

Nav.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Nav);
