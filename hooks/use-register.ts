// hooks/useTodos.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'; // Import useQueryClient
// import { fetchTask,createTask,deleteTask } from '@/utils/apis/tasks';
import { registerUser } from '@/utils/apis/auth';
import React from 'react';

export const useRegister = () => {
  const [isSuccess, setIsSuccess] = React.useState(false); // State to track registration success
  const { mutate: registerUserMutation, isPending: isRegisteringUser } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      setIsSuccess(true); // Set success state to true after successful registration
    },
    onError: (error) => {
      console.error("Error occurred during registration:", error);
    },
  });

  const register = async (newUser) => {
    await registerUserMutation(newUser);
  };

  return {
    isSuccess,
    register,
    isRegisteringUser,
  };
};
