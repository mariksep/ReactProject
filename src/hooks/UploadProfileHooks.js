import {useState} from 'react';

const useUploadProfileForm = (callback) => {
  const [inputsPic, setInputsPic] = useState({
    title: '',
    description: '',
    file: null,
  });


  const handleSubmitPicture = (event) => {
    if (event) {
      event.preventDefault();
    }
    callback();
  };

  const handleFileChangePicture = (event) => {
    event.persist();
    setInputsPic((inputsPic) => {
      return {
        ...inputsPic,
        file: event.target.files[0],
      };
    });
  };


  return {
    inputsPic,
    setInputsPic,
    handleSubmitPicture,
    handleFileChangePicture,

  };
};

export default useUploadProfileForm;
