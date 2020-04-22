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
    const response = await fetch(baseUrl + 'users', fetchOptions);
    const json = await response.json();
    if (!response.ok) throw new Error(json.message + ':' + json.error);
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
    const response = await fetch(baseUrl + 'tags/mpjakk');
    const json = await response.json();
    // haetaan yksittäiset kuvat, jotta saadan thumbnailit
    const items = await Promise.all(
      json.map(async (item) => {
        const response = await fetch(baseUrl + 'media/' + item.file_id);
        return await response.json();
      })
    );
    console.log(items);
    setData(items);
  };

  useEffect(() => {
    fetchUrl();
  }, []);

  return data;
};

const uploadFile = async (inputs, tag) => {
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
    await tagResponse.json();
  } catch (e) {
    throw new Error(e.message);
  }
};

const userInformation = async (token) => {
  const fetchOptions = {
    headers: {
      'x-access-token': token,
    },
  };
  try {
    const response = await fetch(baseUrl + 'users/user', fetchOptions);
    const json = await response.json();
    if (!response.ok) throw new Error(json.message + ':' + json.error);
    return json;
  } catch (e) {
    throw new Error(e.message);
  }
};

const useMediaByTag = (tag) => {
  const [data, setData] = useState([]);
  const fetchUrl = async (tag) => {
    // Hae kaikki kuvat -> saadaan selville kuvan id
    const response = await fetch(baseUrl + 'tags/' + tag);
    const json = await response.json();
    // Haetaan yksittäiset kuvat, jotta saadaan thumbnailit
    const items = await Promise.all(
      json.map(async (item) => {
        const response = await fetch(baseUrl + 'media/' + item.file_id);
        return await response.json();
      })
    );
    setData(items);
  };

  useEffect(() => {
    fetchUrl(tag);
  }, [tag]);

  return data;
};

const updateProfile = async (inputs, token) => {
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify(inputs),
  };
  try {
    const response = await fetch(baseUrl + 'users', fetchOptions);
    const json = response.json();
    if (!response.ok) throw new Error(json.message + json.error);
  } catch (e) {
    throw new Error(e.message);
  }
};

const checkUserAvailable = async (username) => {
  try {
    const response = await fetch(baseUrl + 'users/username/' + username);
    const json = await response.json();
    if (!response.ok) throw new Error(json.message + ':' + json.error);
    return json;
  } catch (e) {
    throw new Error(e.message);
  }
};

const getAvatarImage = async (id) => {
  const response = await fetch(baseUrl + 'tags/nha_profile' + id);
  return await response.json();
};

const uploadProfilePic = async (inputs, tag) => {
  console.log(inputs, tag);
  const fd = new FormData();
  fd.append('title', '');
  fd.append('description', '');
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

export {
  useMedia,
  login,
  register,
  uploadFile,
  addTag,
  useMediaByTag,
  userInformation,
  updateProfile,
  checkUserAvailable,
  getAvatarImage,
  uploadProfilePic,
};
