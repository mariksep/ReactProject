import {useState} from 'react';

const useRegisterForm = (callback) => {
  const [inputs, setInputs]= useState({
    username: '',
    password: '',
    confirm: '',
    email: '',
    full_name: '',
  });
  const handlesubmit = (event)=>{
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
    handlesubmit,
    inputs,
    handleInputChange,

  };
};

export default useRegisterForm;
