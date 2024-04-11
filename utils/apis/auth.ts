import axiosInstance from '../api';

export const registerUser = async (user) => {
  const response = await axiosInstance.post('https://fnmalic.pythonanywhere.com/api/users/',user).then((data)=>{
    console.log(data)
    return data;
  });
  console.log(response)
  return response;
};

export const activate = async (datas:{uid:string,token:string}) => {
  console.log(datas)
  const response = await axiosInstance.post('https://fnmalic.pythonanywhere.com/api/users/activation/',{
    uid: datas.uid ,
    token: datas.token
  }).then((data)=>{
    console.log(data)
    return data;
  });
  console.log(response)
  return response;
};

export const retrieveUser = async () => {
  // console.log(datas)
  const response = await axiosInstance.get('https://fnmalic.pythonanywhere.com/api/users/me/').then((data)=>{
    // console.log(data)
    return data;
  });
  // console.log(response)
  return response;
};


export const createJWT = async (user_info) => {
  const response = await  axiosInstance.post("https://fnmalic.pythonanywhere.com/api/jwt/create/", {
    email : user_info.email,
    password : user_info.password,
    redirect: false,
  }).then((data)=>{
    console.log("hello world")
    return data;
  })
  return response;
};

