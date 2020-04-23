import React from 'react';
import PropTypes from 'prop-types';
import {useSingleMedia} from '../hooks/ApiHooks';
import BackButton from '../components/BackButton';
const baseUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const SingleFile = ({history, match}) => {
  const file = useSingleMedia(match.params.id);
  console.log(file);
  let description = undefined;
  if (file !== null) {
    description = JSON.parse(file.description);
  }

  return (

    <>{file != null &&
      <>
        <BackButton/>
        <h2>{file.title}</h2>
        <p>{description.desc}</p>
        <p>{description.contact}</p>
        <img src={baseUrl + file.thumbnails.w160}/>
      </>
    }
    </>
  );
};

SingleFile.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
};

export default SingleFile;
