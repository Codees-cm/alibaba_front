
// import React from "react";
// import { useQuery , useMutation , useQueryClient } from "@tanstack/react-query";
// // import { viewpromoCode } from "@/utils/api/supplier";
// import { } from "@/utils/apis/supplier";
// import { useToast } from "@/components/ui/use-toast"
// import { fetchPromoCode,applyPromoCode,createPromoCode ,viewPromoCode, deletePromoCode} from "@/utils/apis/promo-code";
// export const usePromo = (enable:boolean = false , id:number|null = null) => {
//     const [isSuccess, setIsSuccess] = React.useState(false);
//     const [errorMessage, setErrorMessage] = React.useState("");
//     const queryClient = useQueryClient();
//     const { toast } = useToast()

//     const {data:promoccode , isLoading :allLoading ,error:allFetchError , refetch} = useQuery({
//         queryKey : ['promo-code'],
//         queryFn: fetchPromoCode,
//         staleTime: 300000,
//         enabled: !enable,
//     })


//     const {data:onepromoCode , isLoading:singleLoading ,error:singleFetchError } = useQuery({
//         queryKey : ['viewpromoCode',id],
//         queryFn: viewPromoCode,
//         staleTime: 300000,
//         enabled: !enable && id !== null,

//     })

//     const {mutate:addpromoCodeMutation, isPending:isAddingpromoCode} = useMutation({
//         mutationFn: ()=> createPromoCode(id),
//         onSuccess: () => {
//             queryClient.invalidateQueries(["promo-code"])
//             setIsSuccess(true);
//             toast({
//               title: "supplier saved",
//               description: "...........",
//             })
//           },
//           onError: (error) => {
//             setErrorMessage(error.message)
//             toast({
//               title: "Uh oh! Something went wrong.",
//               description: "There was a problem with your request.",
//             })
//             // console.error("Error occurred during registration:", error);
//           },
//     })


    
//     const {mutate:editpromoCodeMutation, isPending:isEditingpromoCode} = useMutation({
//         mutationFn: ,
//         onSuccess: () => {
//             queryClient.invalidateQueries(["promo-code"])
//             toast({
//               title: "supplier edited",
//               description: "...........",
//             })
//             setIsSuccess(true);
//           },
//           onError: (error) => {
//             setErrorMessage(error.message)
//             toast({
//               title: "Uh oh! Something went wrong.",
//               description: "There was a problem with your request.",
//             })
//             // console.error("Error occurred during registration:", error);
//           },
//     })


//     const {mutate:deletepromoCodeMutation, isPending:isDeletingpromoCode} = useMutation({
//         mutationFn: deletePromoCode,
//         onSuccess: () => {
//             queryClient.invalidateQueries(["promo-code"])
//             toast({
//               title: "supplier deleted",
//               description: "...........",
//             })
//             setIsSuccess(true);
//           },
//           onError: (error) => {
//             setErrorMessage(error.message)
//             toast({
//               title: "Uh oh! Something went wrong.",
//               description: "There was a problem with your request.",
//             })
//             // console.error("Error occurred during registration:", error);
//           },
//     })




//     const addpromoCode = async (newpromoCode: any)=>{
//             await  addpromoCodeMutation(newpromoCode); 
//     }

//     const modifypromoCode = async (editpromoCode: any)=>{
//         await  editpromoCodeMutation(editpromoCode); 
//     }

//     const deletingpromoCode = async (id: any)=>{
//         await  deletepromoCodeMutation(id); 
//     }

//     return {
//         promo-code,
//         allLoading,
//         allFetchError,

//         onepromoCode,
//         singleLoading,
//         singleFetchError,

//         addpromoCode,
//         isAddingpromoCode,

        
//         modifypromoCode,
//         isEditingpromoCode,

//         deletingpromoCode,
//         isDeletingpromoCode,

//         isSuccess,
//         errorMessage,
//     }


// }

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

