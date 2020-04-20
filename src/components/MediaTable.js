import React from 'react';
import {useMediaByTag} from '../hooks/ApiHooks';
const baseUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';


const MediaTable = ()=> {

  const mediaHelper = useMediaByTag('nhahelper');
  const medianeedHelp = useMediaByTag('nhaneedhelp');


  return (
    <>
      {
        mediaHelper.map((file, index)=>{
          return <img key={index} src={baseUrl +file.thumbnails.w160}/>;
        })
      }
      {
        medianeedHelp.map((file, index)=>{
          return <img key={index} src={baseUrl +file.thumbnails.w160}/>;
        })
      }
    </>
  );
};

export default MediaTable;
