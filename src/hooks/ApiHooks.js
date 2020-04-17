import { useState, useEffect } from 'react';
const baseUrl = 'http://media.mw.metropolia.fi/wbma/';

const useMedia = () => {
  const [data, setData] = useState([]);
  const fetchUrl = async () => {
    const resp = await fetch(baseUrl + 'media');
    const json = await resp.json();
    console.log(json);
    setData(json);
  };
  useEffect(() => {
    fetchUrl();
  }, []);
  return data;
};

export { useMedia };
