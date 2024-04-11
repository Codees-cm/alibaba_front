
import React from "react";
import { useQuery , useMutation , useQueryClient } from "@tanstack/react-query";
// import { viewSale } from "@/utils/api/sale";
import { fetchSales,createSales , viewSales ,deleteSales } from "@/utils/apis/sale";

export const useSales = () => {
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const queryClient = useQueryClient();

    const {data:sale , isLoading :allLoading ,error:allFetchError , refetch} = useQuery({
        queryKey : ['sales'],
        queryFn: fetchSales,
        staleTime: 300000,
    })


    const {data:oneSale , isLoading:singleLoading ,error:singleFetchError } = useQuery({
        queryKey : ['viewSale'],
        queryFn: viewSales,
        staleTime: 300000,
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




    const addSale = async (newSale)=>{
            await  addSaleMutation(newSale); 
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

