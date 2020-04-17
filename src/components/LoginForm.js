import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import useLoginForm from '../hooks/LoginHooks';
import {login} from '../hooks/ApiHooks';
import {MediaContext} from '../contexts/MediaContext';
import {withRouter} from 'react-router-dom';
import {TextField, Button} from '@material-ui/core/';

const LoginForm =({history}) => {
  const [user, setUser] = useContext(MediaContext);
  const doLogin = async () =>{
    try {
      // hakee käyttäjän tiedot Apihooksista
      const userData = await login(inputs);
      // tallenta ne ylhäällä olevaan user muuttujaan
      setUser(userData.user);
      // tallentaa token
      localStorage.setItem('token', userData.token);
      // siirtyy media sivulle
      history.push('/media');
    } catch (e) {
      console.log(e.message);
      // throw new Error(e.message);
    }
  };

  const {inputs, handlesubmit,
    handleInputChange} = useLoginForm(doLogin);
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handlesubmit}>
        <TextField
          fullWidth
          variant="outlined"
          onChange={handleInputChange}
          type='text'
          name='username'
          className='username'
          label="username"
          value={inputs.username}
        />
        <TextField
          fullWidth
          variant="outlined"
          onChange={handleInputChange}
          type='password'
          name='password'
          label="password"
          value={inputs.password}

        />
        <Button
          variant="outlined" size="large"
          type="submit" >Login</Button>
      </form>
    </>
  );
};
LoginForm.propTypes = {
  history: PropTypes.object,
};

export default withRouter(LoginForm);
