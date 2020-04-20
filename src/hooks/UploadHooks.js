import {useState} from 'react';

const useUploadForm = (callback) => {
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    file: null,
    dataUrl: '',
    type: '',
  });

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }

    callback();
  };

  const handleInputChange = (event, value) => {
    event.persist();
    setInputs((inputs) => {
      return {
        ...inputs,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleFileChange = (event) => {
    event.persist();
    console.log('file up', event.target.files[0]);
    setInputs((inputs) => {
      return {
        ...inputs,
        file: event.target.files[0],
      };
    });
  };

  const handleRadioChange = (event) => {
    event.persist();
    setInputs((inputs) => {
      return {
        ...inputs,
        type: event.target.value,
      };
    });
  };

  return {
    handleSubmit,
    handleInputChange,
    handleFileChange,
    handleRadioChange,
    inputs,
    setInputs,
  };
};

export default useUploadForm;
