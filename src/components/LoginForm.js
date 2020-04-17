import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import useLoginForm from '../hooks/LoginHooks';
import {login} from '../hooks/ApiHooks';
import {MediaContext} from '../contexts/MediaContext';
import {withRouter} from 'react-router-dom';


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
      throw new Error(e.message);
    }
  };

  const {inputs, handlesubmit,
    handleInputChange} = useLoginForm(doLogin);
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handlesubmit}>
        <input
          onChange={handleInputChange}
          type='text'
          name='username'
          className='username'
          placeholder="username"
          value={inputs.username}
        />
        <input
          onChange={handleInputChange}
          type='password'
          name='password'
          placeholder="password"
          value={inputs.password}

        />
        <button type="submit" >Login</button>
      </form>
    </>
  );
};
LoginForm.propTypes = {
  history: PropTypes.object,
};


export default withRouter(LoginForm);
