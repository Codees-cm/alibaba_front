import { useQuery } from "@tanstack/react-query";
import { getDashboardOverview } from "@/utils/apis/analysis";
export const useDashboard = () => {
    const {data , isLoading ,error , refetch} =  useQuery({
        queryKey : ['dashboard'],
        queryFn: getDashboardOverview,
        staleTime: 300000,
    })


    return {
        data,
        isLoading,
        error,
        refetch
    }
}

