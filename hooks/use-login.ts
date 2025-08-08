import { useMutation } from '@tanstack/react-query';
import { createJWT } from '@/utils/apis/auth';
import Cookies from 'js-cookie'; // Import Cookies library
import React from 'react';

export const useLogin = () => {
  const [isSuccess, setIsSuccess] = React.useState(false);
  const { mutate: loginUserMutation, isPending: isLoginingUser } = useMutation({
    mutationFn: createJWT,
    onSuccess: (data) => {
      Cookies.set('access', data.access); // Set access token in cookies
      Cookies.set('refresh', data.refresh); // Set refresh token in cookies
      setIsSuccess(true);
    },
    onError: (error) => {
      console.error("Error occurred during login:", error);
    },
  });

  const login = async (user_info) => {
    await loginUserMutation(user_info);
  };

  return {
    isSuccess,
    login,
    isLoginingUser,
  };
};

// {
//   "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxMjg3NTEzNywiaWF0IjoxNzEyNjE1OTM3LCJqdGkiOiI0Y2UxNWYwOTZiODk0YWNlODJlNDc5ZmJiZDg3NTljZCIsInVzZXJfaWQiOjJ9.S-z6UKYEhb89gXimgA2PDqj2u8qHnzSMte1JPkxzJkM",
//   "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEyNjE3NzM3LCJpYXQiOjE3MTI2MTU5MzcsImp0aSI6ImRkNjUzNTUyMmMyNjRiMGI4YTQ0Yzg3OTM0ODM2YjRlIiwidXNlcl9pZCI6Mn0.EOS3meozo_3TuI9RI-utIphrRbR2tVWoO1NSacWCcu0"
// }
