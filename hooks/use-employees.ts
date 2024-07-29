import { useQuery, useMutation } from '@tanstack/react-query'; // Import useQueryClient
import { createEmployees, fetchEmployees } from '@/utils/apis/employee';
import React from 'react';

export const useEmployee = (enable: boolean = false) => {
  const [isSuccess, setIsSuccess] = React.useState(false); // State to track registration success

  const { data: employees, isLoading: allLoading, error: allFetchError, refetch } = useQuery({
    queryKey: ['employee'],
    queryFn: fetchEmployees,
    staleTime: 300000,
    enabled: !enable, // Disable the query by default, enables it only when needed

  })

  const { mutate: registerEmployeeMutation, isPending: isRegisteringEmployee } = useMutation({
    mutationFn: createEmployees,
    onSuccess: () => {
      setIsSuccess(true); // Set success state to true after successful registration
    },
    onError: (error) => {
      console.error("Error occurred during registration:", error);
    },
  });

  const register = async (newUser: any) => {
    await registerEmployeeMutation(newUser);
  };

  return {
    employees,
    allLoading,
    allFetchError,
    isSuccess,
    register,
    isRegisteringEmployee,
  };
};
