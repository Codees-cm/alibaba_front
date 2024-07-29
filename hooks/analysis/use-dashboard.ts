import { useQuery } from "@tanstack/react-query";
// import { retrieveUser } from "@/utils/apis/auth";
import { getProductsAmount, getBarGraph } from "@/utils/apis/analysis";
export const useDashboard = (admin: boolean = false) => {
    const {data , isLoading ,error , refetch} =  useQuery({
        queryKey : ['dashboard'],
        queryFn: getProductsAmount,
        staleTime: 300000,
        enabled: !admin,
    })

    const {data:data_employee , isLoading:loading ,error:err } =  useQuery({
        queryKey : ['dashboard'],
        queryFn: getProductsAmount,
        staleTime: 300000,
        enabled: !admin,
    })
    const {data:data_bar  , isLoading:loading_bar} =  useQuery({
        queryKey : ['dashboard','bar_chart'],
        queryFn: getBarGraph,
        staleTime: 300000,
        enabled: !admin,
    })


    return {
        data,
        data_bar,
        loading_bar,
        isLoading,
        error,
        refetch,
        data_employee,
        loading,
        err,
    }
}

