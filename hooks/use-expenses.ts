
import React from "react";
import { useQuery , useMutation , useQueryClient } from "@tanstack/react-query";
// import { viewExpense } from "@/utils/api/expense";
import { fetchExpenses,createExpenses , editExpenses, viewExpenses ,deleteExpenses } from "@/utils/apis/expenses";
import { useToast } from "@/components/ui/use-toast"

export const useExpenses = (enable:boolean = false , id:number|null = null) => {
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const queryClient = useQueryClient();
    const { toast } = useToast()

    const {data:expenses , isLoading :allLoading ,error:allFetchError , refetch} = useQuery({
        queryKey : ['expenses'],
        queryFn: fetchExpenses,
        staleTime: 300000,
        enabled: !enable,
    })


    const {data:oneExpense , isLoading:singleLoading ,error:singleFetchError } = useQuery({
        queryKey : ['viewExpense',id],
        queryFn: viewExpenses,
        staleTime: 300000,
        enabled: !enable && id !== null,

    })

    const {mutate:addExpenseMutation, isPending:isAddingExpense} = useMutation({
        mutationFn: createExpenses,
        onSuccess: () => {
            queryClient.invalidateQueries(["expenses"])
            setIsSuccess(true);
            toast({
              title: "expense saved",
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


    
    const {mutate:editExpenseMutation, isPending:isEditingExpense} = useMutation({
        mutationFn: editExpenses,
        onSuccess: () => {
            queryClient.invalidateQueries(["expenses"])
            toast({
              title: "expense edited",
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


    const {mutate:deleteExpenseMutation, isPending:isDeletingExpense} = useMutation({
        mutationFn: deleteExpenses,
        onSuccess: () => {
            queryClient.invalidateQueries(["expenses"])
            toast({
              title: "expense deleted",
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




    const addExpense = async (newExpense: any)=>{
            await  addExpenseMutation(newExpense); 
    }

    const modifyExpense = async (editExpense: any)=>{
        await  editExpenseMutation(editExpense); 
    }

    const deletingExpense = async (id: any)=>{
        await  deleteExpenseMutation(id); 
    }

    return {
        expenses,
        allLoading,
        allFetchError,

        oneExpense,
        singleLoading,
        singleFetchError,

        addExpense,
        isAddingExpense,

        
        modifyExpense,
        isEditingExpense,

        deletingExpense,
        isDeletingExpense,

        isSuccess,
        errorMessage,
    }


}

