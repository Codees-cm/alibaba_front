import { useQuery } from "@tanstack/react-query";

import { getProductsAmount, getBarGraph, getInventoryStat, getProductCatInsight, getTopSellingReview, profit_per_day,profit_per_week , total_sales_per_week, total_sales_per_day,getUserRoleDistib } from "@/utils/apis/analysis";
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

    const { data: data_profit_per_day, isLoading: loading_profit_per_day } = useQuery({
        queryKey: ['analysis', 'profit_per_day'],
        queryFn: profit_per_day,
        staleTime: 300000,
    })
    const { data: data_profit_per_week, isLoading: loading_profit_per_week } = useQuery({
        queryKey: ['analysis', 'profit_per_week'],
        queryFn: profit_per_week,
        staleTime: 300000,
    })
    const { data: data_total_sales_per_day, isLoading: loading_total_sales_per_day } = useQuery({
        queryKey: ['analysis', 'total_sales_per_day'],
        queryFn: total_sales_per_day,
        staleTime: 300000,
    })
    const { data: data_total_sales_per_week, isLoading: loading_total_sales_per_week } = useQuery({
        queryKey: ['analysis', 'total_sales_per_week'],
        queryFn: total_sales_per_week,
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

        loading_profit_per_day,
        loading_profit_per_week,
        loading_total_sales_per_day,
        loading_total_sales_per_week,

        data_profit_per_day,
        data_profit_per_week,
        data_total_sales_per_day,
        data_total_sales_per_week,
        error,
        refetch
    }
}

