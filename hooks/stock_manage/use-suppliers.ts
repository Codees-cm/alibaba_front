
import React from "react";
import { useQuery , useMutation , useQueryClient } from "@tanstack/react-query";
// import { viewSupplier } from "@/utils/api/supplier";
import { fetchSuppliers,createSuppliers , editSuppliers, viewSuppliers ,deleteSuppliers } from "@/utils/apis/supplier";
import { useToast } from "@/components/ui/use-toast"

export const useSuppliers = () => {
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const queryClient = useQueryClient();
    const { toast } = useToast()

    const {data:suppliers , isLoading :allLoading ,error:allFetchError , refetch} = useQuery({
        queryKey : ['suppliers'],
        queryFn: fetchSuppliers,
        staleTime: 300000,
    })


    const {data:oneSupplier , isLoading:singleLoading ,error:singleFetchError } = useQuery({
        queryKey : ['viewSupplier'],
        queryFn: viewSuppliers,
        staleTime: 300000,
      enabled: false, // Disable the query by default, enable it only when needed

    })

    const {mutate:addSupplierMutation, isPending:isAddingSupplier} = useMutation({
        mutationFn: createSuppliers,
        onSuccess: () => {
            queryClient.invalidateQueries(["suppliers"])
            setIsSuccess(true);
            toast({
              title: "supplier saved",
              description: "...........",
            })
          },
          onError: (error) => {
            setErrorMessage(error.message)
            toast({
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request.",
            })
            // console.error("Error occurred during registration:", error);
          },
    })


    
    const {mutate:editSupplierMutation, isPending:isEditingSupplier} = useMutation({
        mutationFn: editSuppliers,
        onSuccess: () => {
            queryClient.invalidateQueries(["suppliers"])
            toast({
              title: "supplier edited",
              description: "...........",
            })
            setIsSuccess(true);
          },
          onError: (error) => {
            setErrorMessage(error.message)
            toast({
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request.",
            })
            // console.error("Error occurred during registration:", error);
          },
    })


    const {mutate:deleteSupplierMutation, isPending:isDeletingSupplier} = useMutation({
        mutationFn: deleteSuppliers,
        onSuccess: () => {
            queryClient.invalidateQueries(["suppliers"])
            toast({
              title: "supplier deleted",
              description: "...........",
            })
            setIsSuccess(true);
          },
          onError: (error) => {
            setErrorMessage(error.message)
            toast({
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request.",
            })
            // console.error("Error occurred during registration:", error);
          },
    })




    const addSupplier = async (newSupplier: any)=>{
            await  addSupplierMutation(newSupplier); 
    }

    const modifySupplier = async (editSupplier: any)=>{
        await  editSupplierMutation(editSupplier); 
    }

    const deletingSupplier = async (id: any)=>{
        await  deleteSupplierMutation(id); 
    }

    return {
        suppliers,
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

