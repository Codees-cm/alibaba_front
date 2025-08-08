"use client"
import { useQuery } from "@tanstack/react-query";
import { retrieveUser } from "@/utils/apis/auth";
export const useMe = () => {
    const {data:me , isLoading ,error , refetch} =  useQuery({
        queryKey : ['me'],
        queryFn: retrieveUser,
        staleTime: 300000,
    })


    return {
        me: me ?? null,
        isLoading,
        error,
        refetch
    }
}

