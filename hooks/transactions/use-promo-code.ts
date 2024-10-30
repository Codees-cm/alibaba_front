"use client"
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPromoCodes, createPromoCode, applyPromoCode, deletePromoCode, generatePromoCode, editPromoCode } from "@/utils/apis/promo-code";
import { useToast } from "@/components/ui/use-toast"
// import { applyPromoCode } from "@/utils/apis/promo-code";
export const usePromoCode = (enable = false, promoCodeId = null) => {
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const queryClient = useQueryClient();
    const { toast } = useToast()

    const { data: promoCodes, isLoading: allLoading, error: allFetchError, refetch } = useQuery({
        queryKey: ['promoCodes'],
        queryFn: fetchPromoCodes,
        staleTime: 300000,
        enabled: !enable, 
    });

    const { mutate: generatePromoCodeMutation, isPending: isGeneratingPromoCode } = useMutation({
        mutationFn: generatePromoCode,
        onSuccess: (data) => {
            toast({
                title: "Promo code generated",
                description: `Promo code ${data.code} has been successfully generated.`,
            });
            setIsSuccess(true);
        },
        onError: (error) => {
            setErrorMessage(error.message);
            toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            });
        },
    });

    const { mutate: addPromoCodeMutation, isPending: isAddingPromoCode } = useMutation({
        mutationFn: createPromoCode,
        onSuccess: () => {
            queryClient.invalidateQueries(["promoCodes"])
            toast({
                title: "Promo code created",
                description: "Promo code has been successfully added.",
            });
            setIsSuccess(true);
        },
        onError: (error) => {
            setErrorMessage(error.message)
            toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            });
        },
    });

    const { mutate: applyPromoCodeMutation, isPending: isApplyingPromoCode } = useMutation({
        mutationFn: applyPromoCode,
        onSuccess: () => {
            toast({
                title: "Promo code applied",
                description: "Promo code applied successfully.",
            });
            setIsSuccess(true);
        },
        onError: (error) => {
            setErrorMessage(error.message)
            toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            });
        },
    });

    const { mutate: deletePromoCodeMutation, isPending: isDeletingPromoCode } = useMutation({
        mutationFn: deletePromoCode,
        onSuccess: () => {
            queryClient.invalidateQueries(["promoCodes"])
            toast({
                title: "Promo code deleted",
                description: "Promo code has been successfully deleted.",
            });
            setIsSuccess(true);
        },
        onError: (error) => {
            setErrorMessage(error.message)
            toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            });
        },
    });

    const {mutate:editPromoCodeMutation, isPending:isEditingPromo} = useMutation({
        mutationFn: editPromoCode,
        onSuccess: () => {
            queryClient.invalidateQueries(["promo-code",promoCodeId])

            toast({
              title: "Promo Edited",
              description: "...........",
            })
            setIsSuccess(true);
          },
          onError: (error) => {
            setErrorMessage(error.message)
            toast({
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request.",
            })
          },
    })




    const addPromoCode = async (newPromoCode: any) => {
        await addPromoCodeMutation(newPromoCode);
    }

    const applyPromoCodes = async (code: any) => {
        await applyPromoCodeMutation(code);
    }

    const modifyPromoCode = async (editCategorie)=>{
        await  editPromoCodeMutation(editCategorie); 
    }

    const deletePromoCodes = async (id: any) => {
        await deletePromoCodeMutation(id);
    }

    return {
        promoCodes,
        allLoading,
        allFetchError,

        addPromoCode,
        isAddingPromoCode,

        generatePromoCode,
        isGeneratingPromoCode,

        modifyPromoCode,
        isEditingPromo,

        applyPromoCodes,
        isApplyingPromoCode,

        deletePromoCodes,
        isDeletingPromoCode,

        isSuccess,
        errorMessage,
    }
}

