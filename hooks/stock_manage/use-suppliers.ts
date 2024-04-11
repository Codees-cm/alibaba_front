
import React from "react";
import { useQuery , useMutation , useQueryClient } from "@tanstack/react-query";
// import { viewSupplier } from "@/utils/api/supplier";
import { fetchSuppliers,createSuppliers , editSuppliers, viewSuppliers ,deleteSuppliers } from "@/utils/apis/supplier";

export const useSuppliers = () => {
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const queryClient = useQueryClient();

    const {data:supplier , isLoading :allLoading ,error:allFetchError , refetch} = useQuery({
        queryKey : ['suppliers'],
        queryFn: fetchSuppliers,
        staleTime: 300000,
    })


    const {data:oneSupplier , isLoading:singleLoading ,error:singleFetchError } = useQuery({
        queryKey : ['viewSupplier'],
        queryFn: viewSuppliers,
        staleTime: 300000,
    })

    const {mutate:addSupplierMutation, isPending:isAddingSupplier} = useMutation({
        mutationFn: createSuppliers,
        onSuccess: () => {
            queryClient.invalidateQueries(["suppliers"])
            setIsSuccess(true);
          },
          onError: (error) => {
            setErrorMessage(error.message)
            // console.error("Error occurred during registration:", error);
          },
    })


    
    const {mutate:editSupplierMutation, isPending:isEditingSupplier} = useMutation({
        mutationFn: editSuppliers,
        onSuccess: () => {
            queryClient.invalidateQueries(["suppliers"])
            setIsSuccess(true);
          },
          onError: (error) => {
            setErrorMessage(error.message)
            // console.error("Error occurred during registration:", error);
          },
    })


    const {mutate:deleteSupplierMutation, isPending:isDeletingSupplier} = useMutation({
        mutationFn: deleteSuppliers,
        onSuccess: () => {
            queryClient.invalidateQueries(["suppliers"])
            setIsSuccess(true);
          },
          onError: (error) => {
            setErrorMessage(error.message)
            // console.error("Error occurred during registration:", error);
          },
    })




    const addSupplier = async (newSupplier)=>{
            await  addSupplierMutation(newSupplier); 
    }

    const modifySupplier = async (editSupplier)=>{
        await  editSupplierMutation(editSupplier); 
    }

    const deletingSupplier = async (id)=>{
        await  deleteSupplierMutation(id); 
    }

    return {
        supplier,
        allLoading,
        allFetchError,

        oneSupplier,
        singleLoading,
        singleFetchError,

        addSupplier,
        isAddingSupplier,

        
        modifySupplier,
        isEditingSupplier,

        deletingSupplier,
        isDeletingSupplier,

        isSuccess,
        errorMessage,
    }


}

