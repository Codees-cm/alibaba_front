import { useQuery, useMutation,useQueryClient } from '@tanstack/react-query'; // Import useQueryClient
import { createEmployees, fetchEmployees } from '@/utils/apis/employee';
import React from 'react';
import { useToast } from "@/components/ui/use-toast"

export const useEmployee = (enable: boolean = false) => {
  const [isSuccess, setIsSuccess] = React.useState(false); // State to track registration success
  const { toast } = useToast()
  const queryClient = useQueryClient();


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
      queryClient.invalidateQueries(["employee"])
      toast({
        title: "Employee  registered",
        description: "The person can now have access to labcraft employee panel",
      })
    },
    onError: (error) => {
      console.error("Error occurred during registration:", error);
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      })
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
