import { useQuery } from "@tanstack/react-query";
// import { retrieveUser } from "@/utils/apis/auth";
import { getProductsAmount } from "@/utils/apis/analysis";
export const useDashboard = () => {
    const {data , isLoading ,error , refetch} =  useQuery({
        queryKey : ['dashboard'],
        queryFn: getProductsAmount,
        staleTime: 300000,
    })


    return {
        data,
        isLoading,
        error,
        refetch
    }
}

