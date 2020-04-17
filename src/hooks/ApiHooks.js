import {useState, useEffect} from 'react';
const baseUrl = 'http://media.mw.metropolia.fi/wbma/';

const register = async (inputs)=>{
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inputs),
  };
  try {
    const resp = await fetch(baseUrl + 'login', fetchOptions);
    const json = await resp.json();
    if (!resp.ok) throw new Error(json.message + ':' + json.error);
    return json;
  } catch (e) {
    throw new Error(e.message);
  }
};

const login = async (inputs)=>{
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inputs),
  };
  try {
    const resp = await fetch(baseUrl + 'login', fetchOptions);
    const json = await resp.json();
    if (!resp.ok) throw new Error(json.message + ':' + json.error);
    return json;
  } catch (e) {
    throw new Error(e.message);
  }
};


const useMedia =() =>{
  const [data, setData]= useState([]);
  const fetchUrl = async ()=> {
    const resp = await fetch(baseUrl+'media');
    const json = await resp.json();
    console.log(json);
    setData(json);
  };
  useEffect(() => {
    fetchUrl();
  }, []);
  return data;
};


export {
  useMedia, login,
  register,
};
