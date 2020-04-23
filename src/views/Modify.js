import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import BackButton from '../components/BackButton';
import {
  Button,
  Grid,
} from '@material-ui/core/';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {modifyFile, useSingleMedia} from '../hooks/ApiHooks';
import useModifyFileForm from '../hooks/ModifyFileHooks';



const Modify = ({history, match}) => {

  const file = useSingleMedia(match.params.id);

  const doModify = async () =>{
    try {
      const modifyObject =
      {
        title: inputs.title,
        description: JSON.stringify({
          desc: inputs.description,
          contact: inputs.contact,
        }),
        file: inputs.file,
      };
      const result = await modifyFile(modifyObject, match.params.id);
      console.log(result);
      history.push('/Profile');
    } catch (e) {
      console.log(e.message);
    }
  };
  const {
    inputs,
    setInputs,
    handleSubmit,
    handleInputChange,
  } =
      useModifyFileForm(doModify);

  useEffect(() => {
    (async () => {
      if (file !== null) {
        console.log(file);
        const description = JSON.parse(file.description);
        setInputs((inputs) => {
          return {
            title: file.title,
            description: description.desc,
            contact: description.contact,
            file: file.file,
          };
        });
      }
    })();
  }, [file, setInputs]);


  return (

    <>
      <BackButton/>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <h1>Modify you post</h1>
        <ValidatorForm
          onSubmit={handleSubmit}
          instantValidate={false}
          noValidate
        >
          <Grid container
            direction="column"
            justify="center"
            alignItems="center">


            <TextValidator
              name='title'
              onChange={handleInputChange}
              type='text'
              placeholder='title'
              value={inputs.title}

            />
            <TextValidator
              name='description'
              onChange={handleInputChange}
              type='text'
              placeholder='description'
              value={inputs.description}

            />
            <TextValidator
              name='contact'
              onChange={handleInputChange}
              type='text'
              placeholder='contact'
              value={inputs.contact}

            />
            <Button type="submit">Save</Button>

          </Grid>


        </ValidatorForm>


      </Grid>

    </>
  );
};

Modify.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
};

export default Modify;
