
import React from "react";
import { useQuery , useMutation , useQueryClient } from "@tanstack/react-query";
import { fetchSales,createSales , viewSales ,deleteSales } from "@/utils/apis/sale";

export const useSales = (enableQuery: boolean = false) => {
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const queryClient = useQueryClient();

    const {data:sale , isLoading :allLoading ,error:allFetchError , refetch} = useQuery({
        queryKey : ['sales'],
        queryFn: fetchSales,
        staleTime: 300000,
        enabled:enableQuery
    })


    const {data:oneSale , isLoading:singleLoading ,error:singleFetchError } = useQuery({
        queryKey : ['viewSale'],
        queryFn: viewSales,
        staleTime: 300000,
        enabled:false
    })

    const {mutate:addSaleMutation, isPending:isAddingSale} = useMutation({
        mutationFn: createSales,
        onSuccess: () => {
            queryClient.invalidateQueries(["sales"])
            setIsSuccess(true);
          },
          onError: (error) => {
            setErrorMessage(error.message)
            // console.error("Error occurred during registration:", error);
          },
    })


    

    const {mutate:deleteSaleMutation, isPending:isDeletingSale} = useMutation({
        mutationFn: deleteSales,
        onSuccess: () => {
            queryClient.invalidateQueries(["sales"])
            setIsSuccess(true);
          },
          onError: (error) => {
            setErrorMessage(error.message)
            // console.error("Error occurred during registration:", error);
          },
    })




    const addSale = async (newSales)=>{
        try {
            // Iterate over each sale in newSales array and send them for saving
            const promises = newSales.map(sale => addSaleMutation(sale));
            await Promise.all(promises); // Wait for all sales to be saved
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    const deletingSale = async (id)=>{
        await  deleteSaleMutation(id); 
    }

    return {
        sale,
        allLoading,
        allFetchError,

        oneSale,
        singleLoading,
        singleFetchError,

        addSale,
        isAddingSale,

       

        deletingSale,
        isDeletingSale,

        isSuccess,
        errorMessage,
    }


}

