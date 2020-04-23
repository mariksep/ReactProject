import React, {useState} from 'react';

const useModifyFileForm = (callback) => {
  const [inputs, setInputs]=useState(
      {
        title: '',
        description: '',
        file: null,
        dataUrl: '',
        type: '',
        contact: '',
      },
  );
  const handleSubmit = (event) =>{
    if (event) {
      event.preventDefault();
    }
    callback();
  };
  const handleInputChange = (event)=>{
    event.persist();
    setInputs((inputs)=>{
      return {
        ...inputs,
        [event.target.name]: event.target.value,
      };
    });
  };



  return {
    inputs,
    setInputs,
    handleSubmit,
    handleInputChange,

  };
};

export default useModifyFileForm;
