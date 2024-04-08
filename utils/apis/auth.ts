import axiosInstance from '../api';
// import signIn
import { signIn } from 'next-auth/react';

export const registerUser = async (user) => {
  const response = await axiosInstance.post('/api/auth/users/register',user).then((data)=>{
    console.log(data)
  });
  // return response.data;
};

export const loginUser = async (email,password) => {
  const response = await  signIn("credentials", {
    email,password,
    redirect: false,
  }).then((data)=>{
    console.log(data)
  })
  // return response.data;
};

