"use client"
import React from "react";
import { useQuery , useMutation , useQueryClient } from "@tanstack/react-query";
// import { viewCategorie } from "@/utils/api/categorie";
import { fetchCategories,createCategories , editCategories, viewCategories ,deleteCategories } from "@/utils/apis/category";

export const useCategories = () => {
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const queryClient = useQueryClient();

    const {data:categories , isLoading :allLoading ,error:allFetchError , refetch} = useQuery({
        queryKey : ['categories'],
        queryFn: fetchCategories,
        staleTime: 300000,
    })


    const {data:oneCategorie , isLoading:singleLoading ,error:singleFetchError } = useQuery({
        queryKey : ['viewCategorie'],
        queryFn: viewCategories,
        staleTime: 300000,
        enabled: false, // Disable the query by default, enable it only when needed
    })

    const {mutate:addCategorieMutation, isPending:isAddingCategorie} = useMutation({
        mutationFn: createCategories,
        onSuccess: () => {
            queryClient.invalidateQueries(["categories"])
            setIsSuccess(true);
          },
          onError: (error) => {
            setErrorMessage(error.message)
            // console.error("Error occurred during registration:", error);
          },
    })


    
    const {mutate:editCategorieMutation, isPending:isEditingCategorie} = useMutation({
        mutationFn: editCategories,
        onSuccess: () => {
            queryClient.invalidateQueries(["categories"])
            setIsSuccess(true);
          },
          onError: (error) => {
            setErrorMessage(error.message)
            // console.error("Error occurred during registration:", error);
          },
    })


    const {mutate:deleteCategorieMutation, isPending:isDeletingCategorie} = useMutation({
        mutationFn: deleteCategories,
        onSuccess: () => {
            queryClient.invalidateQueries(["categories"])
            setIsSuccess(true);
          },
          onError: (error) => {
            setErrorMessage(error.message)
            // console.error("Error occurred during registration:", error);
          },
    })




    const addCategorie = async (newCategorie)=>{
            await  addCategorieMutation(newCategorie); 
    }

    const modifyCategorie = async (editCategorie)=>{
        await  editCategorieMutation(editCategorie); 
    }

    const deletingCategorie = async (id)=>{
        await  deleteCategorieMutation(id); 
    }

    return {
        categories,
        allLoading,
        allFetchError,

        oneCategorie,
        singleLoading,
        singleFetchError,

        addCategorie,
        isAddingCategorie,

        
        modifyCategorie,
        isEditingCategorie,

        deletingCategorie,
        isDeletingCategorie,

        isSuccess,
        errorMessage,
    }


}

