// hooks/useTodos.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'; // Import useQueryClient
// import { fetchTask,createTask,deleteTask } from '@/utils/apis/tasks';
import { loginUser } from '@/utils/apis/auth';
import React from 'react';

export const useLogin = async (email,password) => {
  const [isSuccess, setIsSuccess] = React.useState(false); // State to track registration success
  const { mutate: loginUserMutation, isPending: isLoginingUser } = useMutation({
    mutationFn:  await  loginUser(email,password),
    onSuccess: () => {
      setIsSuccess(true); // Set success state to true after successful registration
    },
    onError: (error) => {
      console.error("Error occurred during registration:", error);
    },
  });

  const login = async (email,password) => {
    await loginUserMutation(email,password);
  };

  return {
    isSuccess,
    login,
    isLoginingUser,
  };
};
