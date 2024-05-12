import { useQuery } from "@tanstack/react-query";

import { getProductsAmount, getBarGraph, getInventoryStat, getProductCatInsight, getTopSellingReview, getUserRoleDistib } from "@/utils/apis/analysis";
export const useAnalysis = () => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['analysis'],
        queryFn: getProductsAmount,
        staleTime: 300000,
    })
    const { data: data_bar, isLoading: loading_bar } = useQuery({
        queryKey: ['analysis', 'bar_chart'],
        queryFn: getBarGraph,
        staleTime: 300000,
    })

    const { data: data_inventStat, isLoading: loading_inventStat } = useQuery({
        queryKey: ['analysis', 'inventStat'],
        queryFn: getInventoryStat,
        staleTime: 300000,
    })

    const { data: data_catInsight, isLoading: loading_catInsight } = useQuery({
        queryKey: ['analysis', 'catInsight'],
        queryFn: getProductCatInsight,
        staleTime: 300000,
    })

    const { data: data_topSellingReview, isLoading: loading_topSellingReview } = useQuery({
        queryKey: ['analysis', 'topSellingReview'],
        queryFn: getTopSellingReview,
        staleTime: 300000,
    })

    // const { data: data_userRoleDistib, isLoading: loading_userRoleDistib } = useQuery({
    //     queryKey: ['analysis', 'userRoleDistib'],
    //     queryFn: getUserRoleDistib,
    //     staleTime: 300000,
    // })


    return {
        data,
        data_bar,
        loading_bar,
        isLoading,

        data_inventStat,
        loading_inventStat,
        data_catInsight,
        loading_catInsight,
        data_topSellingReview,
        loading_topSellingReview,
        // data_userRoleDistib,
        // loading_userRoleDistib,

        error,
        refetch
    }
}

