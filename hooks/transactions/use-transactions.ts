
import React from "react";
import { useQuery , useMutation , useQueryClient } from "@tanstack/react-query";

import { fetchTransactions, createTransactions , viewTransactions  } from "@/utils/apis/transactions";

export const useTransactions = (enable: boolean = false) => {
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const queryClient = useQueryClient();

    const {data:transactions , isLoading :allLoading ,error:allFetchError , refetch} = useQuery({
        queryKey : ['transactions'],
        queryFn: fetchTransactions,
        staleTime: 300000,
        enabled: enable
    })


    const {data:oneTransaction , isLoading:singleLoading ,error:singleFetchError } = useQuery({
        queryKey : ['viewTransaction'],
        queryFn: viewTransactions,
        staleTime: 300000,
        enabled: !enable

    })

    const {mutate:addTransactionMutation, isPending:isAddingTransaction} = useMutation({
        mutationFn: createTransactions,
        onSuccess: () => {
            queryClient.invalidateQueries(["transactions"])
            setIsSuccess(true);
          },
          onError: (error) => {
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

