import React, {useState} from 'react';

const useProfileForm = (callback) => {
  const [inputs, setInputs]= useState({
    username: '',
    password: '',
    email: '',
    full_name: '',
  });
  const handleSubmit = (event)=>{
    if (event) {
      event.preventDefault();
    }
    callback();
  };
  const handleInputChange = (event) => {
    event.persist();
    setInputs((inputs)=>{
      return {
        ...inputs,
        [event.target.name]: event.target.value,
      };
    });
  };

  return {
    handleSubmit,
    inputs,
    setInputs,
    handleInputChange,

  };
};

export default useProfileForm;
