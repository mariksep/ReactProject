import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { MediaContext } from '../contexts/MediaContext';

const Logout = () => {
  // User on pakko olla vaikka sitä ei käytetä
  const [user, setUser] = useContext(MediaContext);

  useEffect(() => {
    setUser(null);
    localStorage.clear();
  }, [setUser]);

  return <Redirect to={'/'} />;
};

export default Logout;
