
import React from "react";
import { useQuery , useMutation , useQueryClient } from "@tanstack/react-query";

import { fetchTransactions, createTransactions , viewTransactions  } from "@/utils/apis/transactions";
import { useToast } from "@/components/ui/use-toast"

export const useTransactions = (enable:boolean = false , id:number|null = null) => {
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const queryClient = useQueryClient();
    const { toast } = useToast()


    const {data:transactions , isLoading :allLoading ,error:allFetchError , refetch} = useQuery({
        queryKey : ['transactions'],
        queryFn: fetchTransactions,
        staleTime: 300000,
        enabled: !enable
    })


    const {data:oneTransaction , isLoading:singleLoading ,error:singleFetchError } = useQuery({
        queryKey : ['viewTransaction',id],
        queryFn:  () =>  viewTransactions(id),
        staleTime: 300000,
        enabled: enable && id !== null, 


    })

    const {mutate:addTransactionMutation, isPending:isAddingTransaction} = useMutation({
        mutationFn: createTransactions,
        onSuccess: () => {
            queryClient.invalidateQueries(["transactions"])
            toast({
                title: "transaction saved",
                description: "...........",
              })
            setIsSuccess(true);
          },
          onError: (error) => {
            toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
              })
            setErrorMessage(error.message)
            // console.error("Error occurred during registration:", error);
          },
    })


    


    const addTransaction = async (newTransaction: any)=>{
            await  addTransactionMutation(newTransaction); 
    }


    return {
        transactions,
        allLoading,
        allFetchError,

        oneTransaction,
        singleLoading,
        singleFetchError,

        addTransaction,
        isAddingTransaction,

        isSuccess,
        errorMessage,
    }


}

