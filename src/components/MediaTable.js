import React from 'react';
import {useMedia} from '../hooks/ApiHooks';

const MediaTable = () => {
  const kokeilu= useMedia();
  return (
    <div>
      {/* Tähän erillinen komponentti vielä
      median haulle kubnhan tietää mistä backendiin
      tallennetaan tiedot */}
      {
        kokeilu.map((file, index)=>{
          return <li key={index}> {file.file_id}</li>;
        })
      }
    </div>
  );
};

export default MediaTable;
