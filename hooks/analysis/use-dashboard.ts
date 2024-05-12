import { useQuery } from "@tanstack/react-query";
// import { retrieveUser } from "@/utils/apis/auth";
import { getProductsAmount, getBarGraph } from "@/utils/apis/analysis";
export const useDashboard = () => {
    const {data , isLoading ,error , refetch} =  useQuery({
        queryKey : ['dashboard'],
        queryFn: getProductsAmount,
        staleTime: 300000,
    })
    const {data:data_bar  , isLoading:loading_bar} =  useQuery({
        queryKey : ['dashboard','bar_chart'],
        queryFn: getBarGraph,
        staleTime: 300000,
    })


    return {
        data,
        data_bar,
        loading_bar,
        isLoading,
        error,
        refetch
    }
}

