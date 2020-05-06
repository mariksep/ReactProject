import { useState } from 'react';

const useRatingForm = (callback) => {
  const [inputs, setInputs] = useState({
    rating: '',
  });

  const [error, setError] = useState(false);

  const handleSubmit = (event) => {
    if (event) {
      if (inputs.rating === '') {
        setError(true);
        event.preventDefault();
      } else {
        event.preventDefault();
        callback();
      }
    }
  };

  const handleRadioChange = (event) => {
    event.persist();
    setInputs((inputs) => {
      return {
        ...inputs,
        rating: parseInt(event.target.value),
      };
    });
  };

  return {
    handleSubmit,
    handleRadioChange,
    inputs,
    setInputs,
    error,
    setError,
  };
};

export default useRatingForm;
