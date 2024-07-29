import { useQuery, useMutation } from '@tanstack/react-query'; // Import useQueryClient
import { createCustomers, fetchCustomers } from '@/utils/apis/customers';
import React from 'react';

export const useCustomer = (enable: boolean = false) => {
  const [isSuccess, setIsSuccess] = React.useState(false); // State to track registration success

  const { data: customers, isLoading: allLoading, error: allFetchError, refetch } = useQuery({
    queryKey: ['customer'],
    queryFn: fetchCustomers,
    staleTime: 300000,
    enabled: !enable, // Disable the query by default, enables it only when needed

  })

  const { mutate: registerCustomerMutation, isPending: isRegisteringCustomer } = useMutation({
    mutationFn: createCustomers,
    onSuccess: () => {
      setIsSuccess(true); // Set success state to true after successful registration
    },
    onError: (error) => {
      console.error("Error occurred during registration:", error);
    },
  });

  const register = async (newUser) => {
    await registerCustomerMutation(newUser);
  };

  return {
    customers,
    allLoading,
    allFetchError,
    isSuccess,
    register,
    isRegisteringCustomer,
  };
};
