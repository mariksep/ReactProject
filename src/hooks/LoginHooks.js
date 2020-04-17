import { useState } from 'react';

const useLoginForm = (callback) => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });
  const handlesubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    callback();
  };

  const handleInputChange = (event) => {
    event.persist();
    setInputs((inputs) => {
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

export default useLoginForm;
