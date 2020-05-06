import {useState, useEffect} from 'react';

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

const useSingleMedia = (id) => {
  const [data, setData] = useState(null);
  const fetchUrl = async (fileid) => {
    const response = await fetch(baseUrl + 'media/' + fileid);
    const item = await response.json();
    const userResponse = await getUser(
        item.user_id,
        localStorage.getItem('token'),
    );
    item.user = userResponse;
    console.log(item);
    setData(item);
  };
  useEffect(() => {
    fetchUrl(id);
  }, [id]);
  return data;
};

const getUser = async (id, token) => {
  const fetchOptions = {
    headers: {
      'x-access-token': token,
    },
  };
  try {
    const response = await fetch(baseUrl + 'users/'+id, fetchOptions);
    const json = await response.json();
    if (!response.ok) throw new Error(json.message + ':' + json.error);
    return json;
  } catch (e) {
    throw new Error(e.message);
  }
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
    return {json, tagJson};
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
    method: 'GET',
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


const useFileComments = (id) => {
  const [data, setData] = useState([]);
  const fetchUrl = async (id) => {
    const response = await fetch(baseUrl + 'comments/file/'+id);
    const json = await response.json();
    const items = await Promise.all(
        json.map(async (item) => {
          // Lisää käyttäjän tiedot ja avatar
          const userResponse = await getUser(
              item.user_id,
              localStorage.getItem('token'),
          );
          item.user = userResponse;
          const avatarFile = await getAvatarImage(
              item.user_id,
              localStorage.getItem('token'),
          );
          item.avatar = avatarFile;
          return await item;
        }),
    );
    setData(items);
  };

  useEffect(() => {
    fetchUrl(id);
  }, [id]);

  return data;
};
const FileComments =async (id) => {
  const response = await fetch(baseUrl + 'comments/file/'+id);
  let palautus;
  const json = await response.json();
  const items = await Promise.all(
      json.map(async (item) => {
        // Lisää käyttäjän tiedot ja avatar
        const userResponse = await getUser(
            item.user_id,
            localStorage.getItem('token'),
        );
        item.user = userResponse;
        const avatarFile = await getAvatarImage(
            item.user_id,
        );
        item.avatar = avatarFile;
        return await item;
      }),

  );
  palautus=items;
  return palautus;
};


const addComment = async (file_id, comment) => {
  const fetchOptionsComment = {
    method: 'POST',
    body: JSON.stringify({
      file_id: file_id,
      comment: comment,
    }),
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token'),
    },
  };
  console.log(fetchOptionsComment.body);

  try {
    const Response = await fetch(baseUrl + 'comments', fetchOptionsComment);
    console.log(Response);
    await Response.json();
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
          // Lisää käyttäjän tiedot ja avatar
          const itemi = await response.json();
          const userResponse = await getUser(
              itemi.user_id,
              localStorage.getItem('token'),
          );
          itemi.user = userResponse;
          const avatarFile = await getAvatarImage(
              itemi.user_id,
              localStorage.getItem('token'),
          );
          itemi.avatar = avatarFile;
          return await itemi;
        }),
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
    return {json, tagJson};
  } catch (e) {
    throw new Error(e.message);
  }
};

const modifyFile = async (inputs, id) => {
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token'),
    },
    body: JSON.stringify(inputs),
  };
  try {
    const response = await fetch(baseUrl + 'media/' + id, fetchOptions);
    const json = response.json();
    if (!response.ok) throw new Error(json.message + json.error);
  } catch (e) {
    throw new Error(e.message);
  }
};

const deleteFile = async (id) => {
  const fetchOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token'),
    },
  };
  try {
    const response = await fetch(baseUrl + 'media/' + id, fetchOptions);
    const json = response.json();
    if (!response.ok) throw new Error(json.message + json.error);
  } catch (e) {
    throw new Error(e.message);
  }
};

export {
  useSingleMedia,
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
  modifyFile,
  deleteFile,
  useFileComments,
  addComment,
  FileComments,
};
