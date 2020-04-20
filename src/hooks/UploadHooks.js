import {useState} from 'react';

const useUploadForm = (callback) => {
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    file: null,
    dataUrl: '',
    type: '',
    contact: '',
  });

  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  const handleSubmit = (event) => {
    if (event) {
      if (inputs.type === '') {
        setError(true);
        return false;
      }
      if (inputs.file === null) {
        setHelperText('Remember to add file!');
        return false;
      }
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
    error,
    setError,
    helperText,
    setHelperText,
  };
};

export default useUploadForm;
