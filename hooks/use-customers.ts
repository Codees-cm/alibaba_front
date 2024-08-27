import { useQuery, useMutation,useQueryClient } from '@tanstack/react-query'; // Import useQueryClient
import { createCustomers, fetchCustomers } from '@/utils/apis/customers';
import React from 'react';
import { useToast } from "@/components/ui/use-toast"


export const useCustomer = (enable: boolean = false) => {
  const [isSuccess, setIsSuccess] = React.useState(false); // State to track registration success
  const { toast } = useToast()
  const queryClient = useQueryClient();

  const { data: customers, isLoading: allLoading, error: allFetchError, refetch } = useQuery({
    queryKey: ['customer'],
    queryFn: fetchCustomers,
    staleTime: 300000,
    enabled: !enable, // Disable the query by default, enables it only when needed

  })

  const { mutate: registerCustomerMutation, isPending: isRegisteringCustomer } = useMutation({
    mutationFn: createCustomers,
    onSuccess: () => {
      toast({
        title: "customer saved",
        description: "...........",
      })
      queryClient.invalidateQueries(["customer"])

      setIsSuccess(true); // Set success state to true after successful registration
    },
    onError: (error) => {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      })
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
