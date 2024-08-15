"use client"
import {useState} from "react";
import { useQuery , useMutation , useQueryClient } from "@tanstack/react-query";
import { fetchWarehouse,createWarehouse , editWarehouse, viewWarehouse ,deleteWarehouse } from "@/utils/apis/warehouse";
import { useToast } from "@/components/ui/use-toast"


export const useWarehouses = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const queryClient = useQueryClient();
  const { toast } = useToast()

  // Fetch all warehouses
  const { data: warehouses, isLoading: allLoading, error: allFetchError, refetch: refetchWarehouses } = useQuery({
      queryKey: ['warehouses'],
      queryFn: fetchWarehouse,
      staleTime: 300000,
  });

  // Fetch a single warehouse
  const { data: warehouse, isLoading: singleLoading, error: singleFetchError } = useQuery({
      queryKey: ['viewWarehouse'], // Use a different query key for fetching a single warehouse
      queryFn: viewWarehouse,
      staleTime: 300000,
      enabled: false, // Disable the query by default, enable it only when needed
  });

//   Mutations for adding, editing, and deleting warehouses
  const { mutate: addWarehouseMutation, isPending: isAddingWarehouse } = useMutation({
      mutationFn: createWarehouse,
      onSuccess: () => {
          queryClient.invalidateQueries(["warehouses"]);
          toast({
            title: "warehouse saved",
            description: "...........",
          })
          setIsSuccess(true);
      },
      onError: (error) => {
        toast({
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
          })
          setErrorMessage(error.message);
      },
  });

  const { mutate: editWarehouseMutation, isPending: isEditingWarehouse } = useMutation({
      mutationFn: editWarehouse,
      onSuccess: () => {
          queryClient.invalidateQueries(["warehouses"]);
          toast({
            title: "warehouse edited",
            description: "...........",
          })
          setIsSuccess(true);
      },
      onError: (error) => {
        toast({
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
          })
          setErrorMessage(error.message);
      },
  });

  const { mutate: deleteWarehouseMutation, isPending: isDeletingWarehouse } = useMutation({
      mutationFn: deleteWarehouse,
      onSuccess: () => {
          queryClient.invalidateQueries(["warehouses"]);
          toast({
            title: "warehouse deleted",
            description: "...........",
          })
          setIsSuccess(true);
      },
      onError: (error) => {
        toast({
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
          })
          setErrorMessage(error.message);
      },
  });

  const addWarehouse = async (newWarehouse) => {
      await addWarehouseMutation(newWarehouse);
  };

  const modifyWarehouse = async (editWarehouse) => {
      await editWarehouseMutation(editWarehouse);
  };

  const deletingWarehouse = async (id) => {
      await deleteWarehouseMutation(id);
  };

  return {
      warehouses,
      allLoading,
      allFetchError,

      warehouse,
      singleLoading,
      singleFetchError,

      addWarehouse,
      isAddingWarehouse,

      modifyWarehouse,
      isEditingWarehouse,

      deletingWarehouse,
      isDeletingWarehouse,

      isSuccess,
      errorMessage,
      refetchWarehouses, // Expose refetch function for fetching all warehouses
  };
};


