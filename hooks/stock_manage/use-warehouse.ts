
import React from "react";
import { useQuery , useMutation , useQueryClient } from "@tanstack/react-query";
// import { viewWarehouse } from "@/utils/api/warehouse";
import { fetchWarehouse,createWarehouse , editWarehouse, viewWarehouse ,deleteWarehouse } from "@/utils/apis/warehouse";

export const useWarehouses = () => {
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const queryClient = useQueryClient();

    const {data:warehouse , isLoading :allLoading ,error:allFetchError , refetch} = useQuery({
        queryKey : ['warehouses'],
        queryFn: fetchWarehouse,
        staleTime: 300000,
    })


    const {data:oneWarehouse , isLoading:singleLoading ,error:singleFetchError } = useQuery({
        queryKey : ['viewWarehouse'],
        queryFn: viewWarehouse,
        staleTime: 300000,
    })

    const {mutate:addWarehouseMutation, isPending:isAddingWarehouse} = useMutation({
        mutationFn: createWarehouse,
        onSuccess: () => {
            queryClient.invalidateQueries(["warehouses"])
            setIsSuccess(true);
          },
          onError: (error) => {
            setErrorMessage(error.message)
            // console.error("Error occurred during registration:", error);
          },
    })


    
    const {mutate:editWarehouseMutation, isPending:isEditingWarehouse} = useMutation({
        mutationFn: editWarehouse,
        onSuccess: () => {
            queryClient.invalidateQueries(["warehouses"])
            setIsSuccess(true);
          },
          onError: (error) => {
            setErrorMessage(error.message)
            // console.error("Error occurred during registration:", error);
          },
    })


    const {mutate:deleteWarehouseMutation, isPending:isDeletingWarehouse} = useMutation({
        mutationFn: deleteWarehouse,
        onSuccess: () => {
            queryClient.invalidateQueries(["warehouses"])
            setIsSuccess(true);
          },
          onError: (error) => {
            setErrorMessage(error.message)
            // console.error("Error occurred during registration:", error);
          },
    })




    const addWarehouse = async (newWarehouse)=>{
            await  addWarehouseMutation(newWarehouse); 
    }

    const modifyWarehouse = async (editWarehouse)=>{
        await  editWarehouseMutation(editWarehouse); 
    }

    const deletingWarehouse = async (id)=>{
        await  deleteWarehouseMutation(id); 
    }

    return {
        warehouse,
        allLoading,
        allFetchError,

        oneWarehouse,
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
    }


}

