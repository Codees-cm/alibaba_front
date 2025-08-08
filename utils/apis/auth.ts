import instance from '../api';

export const registerUser = async (user) => {
  const response = await instance.post('/users/', user);
  return response.data;
};

export const activate = async (datas:{uid:string,token:string}) => {
  const response = await instance.post('/users/activation/', {
    uid: datas.uid,
    token: datas.token,
  });
  return response.data;
};

export const retrieveUser = async () => {
  const response = await instance.get('/users/me/');
  return response.data;
};


export const createJWT = async (user_info) => {
  const response = await instance.post('/jwt/create/', {
    email: user_info.email,
    password: user_info.password,
  });
  return response.data;
};

