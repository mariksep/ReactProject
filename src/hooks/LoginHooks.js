import {useState} from 'react';

const useLoginForm = (callback) => {
  const [inputs, setInputs]= useState({
    username: 'kokeilu',
    password: 'kokeilu',
  });
  const handlesbmit = (event)=>{
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
    handlesbmit,
    inputs,
    handleInputChange,

  };
};

export default useLoginForm;
