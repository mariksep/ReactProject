import { useState, useEffect } from 'react';

const baseUrl = 'http://media.mw.metropolia.fi/wbma/';

const register = async (inputs) => {
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inputs),
  };
  try {
    const resp = await fetch(baseUrl + 'users', fetchOptions);
    const json = await resp.json();
    if (!resp.ok) throw new Error(json.message + ':' + json.error);
    console.log(resp);
    return json;
  } catch (e) {
    throw new Error(e.message);
  }
};

const login = async (inputs) => {
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

const uploadFile = async (inputs, tag) => {
  console.log('api hook up file', tag);
  const fd = new FormData();
  fd.append('title', inputs.title);
  fd.append('description', inputs.description);
  fd.append('file', inputs.file);

  const fetchOptions = {
    method: 'POST',
    body: fd,
    headers: {
      'x-access-token': localStorage.getItem('token'),
    },
  };

  try {
    const response = await fetch(baseUrl + 'media', fetchOptions);
    const json = await response.json();
    if (!response.ok) throw new Error(json.message + ': ' + json.error);
    const tagJson = addTag(json.file_id, tag);
    return { json, tagJson };
  } catch (e) {
    throw new Error(e.message);
  }
};

const addTag = async (file_id, tag) => {
  const fetchOptionsTag = {
    method: 'POST',
    body: JSON.stringify({
      // Propertyn nimi on sama kuin muuttujan nimi,ei tartte kirjoittaa tag:tag
      file_id,
      tag,
    }),
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token'),
    },
  };

  try {
    const tagResponse = await fetch(baseUrl + 'tags', fetchOptionsTag);
    const tagJson = await tagResponse.json();
    console.log('jsontag', tagJson);
  } catch (e) {
    throw new Error(e.message);
  }
};

export { useMedia, login, register, uploadFile, addTag };
