import React, {useState} from 'react';

const useProfileForm = (callback) => {
  const [inputs, setInputs]= useState({
    username: '',
    password: '',
    email: '',
    full_name: '',
  });
  const handleSubmitProfile = (event)=>{
    if (event) {
      event.preventDefault();
    }
    callback();
  };
  const handleInputChangeProfile = (event) => {
    event.persist();
    setInputs((inputs)=>{
      return {
        ...inputs,
        [event.target.name]: event.target.value,
      };
    });
  };

  return {
    handleSubmitProfile,
    inputs,
    setInputs,
    handleInputChangeProfile,

  };
};

export default useProfileForm;
