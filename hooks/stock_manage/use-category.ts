"use client"
import React from "react";
import { useQuery , useMutation , useQueryClient } from "@tanstack/react-query";
import { fetchCategories,createCategories , editCategories, viewCategories ,deleteCategories } from "@/utils/apis/category";
import { useToast } from "@/components/ui/use-toast"

export const useCategories = (enable:boolean = false , categoryId:number|null = null) => {
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const queryClient = useQueryClient();
    const { toast } = useToast()

    const {data:categories , isLoading :allLoading ,error:allFetchError , refetch} = useQuery({
        queryKey : ['categories'],
        queryFn: fetchCategories,
        staleTime: 300000,
        enabled: !enable ,

    })


    const {data:oneCategorie , isLoading:singleLoading ,error:singleFetchError } = useQuery({
        queryKey : ['viewCategorie',categoryId],
        queryFn:  () =>  viewCategories(categoryId),
        staleTime: 300000,
        enabled: enable && categoryId !== null, 
    })

    const {mutate:addCategorieMutation, isPending:isAddingCategorie} = useMutation({
        mutationFn: createCategories,
        onSuccess: () => {
            queryClient.invalidateQueries(["categories"])
            toast({
              title: "Category saved",
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


    
    const {mutate:editCategorieMutation, isPending:isEditingCategorie} = useMutation({
        mutationFn: editCategories,
        onSuccess: () => {
            queryClient.invalidateQueries(["categories"])

            toast({
              title: "Category Edited",
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


    const {mutate:deleteCategorieMutation, isPending:isDeletingCategorie} = useMutation({
        mutationFn: deleteCategories,
        onSuccess: () => {
            queryClient.invalidateQueries(["categories"])
            toast({
              title: "Category deleted",
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

