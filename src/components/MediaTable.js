import React, {useState, useEffect} from 'react';
import {useMedia} from '../hooks/ApiHooks';
import {Button} from '@material-ui/core/';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const MediaTable = ()=> {
  const [List, setList]= useState(true);
  const [tag, setTag] = useState('nhaneedhelp');

  const fileList = () =>{
    setList(!List);
    if (tag==='nhaneedhelp') {
      setTag('nhahelper');
    } else {
      setTag('nhaneedhelp');
    }
  };
  const Media = useMedia(tag);

  console.log(tag);

  return (
    <>
      <Button
        variant="outlined" size="large"
        onClick={fileList}>{List ? 'needhelp' : 'helper'}
      </Button>
      {
        Media.map((file, index)=>{
          return <img key={index} src={mediaUrl+ file.thumbnails.w160}/>;
        })
      }
    </>
  );
};

export default MediaTable;
