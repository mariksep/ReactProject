import { useState } from 'react';

const useModifyFileForm = (callback) => {
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    file: null,
    dataUrl: '',
    type: '',
    contact: '',
    coords: '',
  });
  const handleSubmit = (event) => {
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
  const handleCoordsChange = (event) => {
    setInputs((inputs) => {
      return {
        ...inputs,
        coords: { lat: event.latlng.lat, lng: event.latlng.lng },
      };
    });
  };

  return {
    inputs,
    setInputs,
    handleSubmit,
    handleInputChange,
    handleCoordsChange,
  };
};

export default useModifyFileForm;
