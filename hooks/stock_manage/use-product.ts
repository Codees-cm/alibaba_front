
import React from "react";
import { useQuery , useMutation , useQueryClient } from "@tanstack/react-query";
// import { viewProduct } from "@/utils/api/product";
import { fetchProducts,createProducts , createProductsMarkdown, viewProducts ,deleteProducts , productTransactions, updateProduct, editProductsMarkdown } from "@/utils/apis/product";

export const useProducts = (enable:boolean = false , productId:number|null = null) => {
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const queryClient = useQueryClient();

    const {data:products , isLoading :allLoading ,error:allFetchError , refetch} = useQuery({
        queryKey : ['products'],
        queryFn: fetchProducts,
        staleTime: 300000,
        enabled: !enable,
    })


    const {data:oneProduct , isLoading:singleLoading ,error:singleFetchError } = useQuery({
        queryKey :['product', productId],
        queryFn: () => viewProducts(productId),
        staleTime: 300000,
      enabled: enable && productId !== null, // Disable the query by default, enable it only when needed
    })

    const {data:productTrans , isLoading:loadingProdTrans ,error:errorProdTrans } = useQuery({
      queryKey : ['productTransactions', productId],
      queryFn: () => productTransactions(productId),
      staleTime: 300000,
    enabled: enable && productId !== null, // Disable the query by default, enable it only when needed
  })

    const {mutate:addProductMutation, isPending:isAddingProduct} = useMutation({
        mutationFn: createProducts,
        onSuccess: () => {
            queryClient.invalidateQueries(["products"])
            setIsSuccess(true);
          },
          onError: (error) => {
            setErrorMessage(error.message)
            // console.error("Error occurred during registration:", error);
          },
    })


    
    const {mutate:editProductMutation, isPending:isEditingProduct} = useMutation({
        mutationFn: updateProduct,
        onSuccess: () => {
            queryClient.invalidateQueries(["product",productId])
            setIsSuccess(true);
          },
          onError: (error) => {
            setErrorMessage(error.message)
            // console.error("Error occurred during registration:", error);
          },
    })


    const {mutate:createProductsMarkdownMutation, isPending:isCreatingProductsMarkdown} = useMutation({
      mutationFn: createProductsMarkdown,
      onSuccess: () => {
          queryClient.invalidateQueries(["product",productId])
          setIsSuccess(true);
        },
        onError: (error) => {
          setErrorMessage(error.message)
          // console.error("Error occurred during registration:", error);
        },
  })

    const {mutate:deleteProductMutation, isPending:isDeletingProduct} = useMutation({
        mutationFn: deleteProducts,
        onSuccess: () => {
            queryClient.invalidateQueries(["products"])
            setIsSuccess(true);
          },
          onError: (error) => {
            setErrorMessage(error.message)
            // console.error("Error occurred during registration:", error);
          },
    })




    const addProduct = async (newProduct)=>{
            await  addProductMutation(newProduct); 
    }

    const modifyProduct = async (product)=>{
      console.log(product)
        editProductMutation(product); 
    }

    const createProductMarkdown = async (product)=>{
      // console.log(product)
      createProductsMarkdownMutation(product); 
    }

    const deletingProduct = async (id)=>{
        await  deleteProductMutation(id); 
    }

    return {
        products,
        allLoading,
        allFetchError,

        oneProduct,
        singleLoading,
        singleFetchError,

        productTrans,
        loadingProdTrans,
        errorProdTrans,

        addProduct,
        isAddingProduct,

        
        modifyProduct,
        isEditingProduct,

        createProductMarkdown,
        isCreatingProductsMarkdown,

        deletingProduct,
        isDeletingProduct,

        isSuccess,
        errorMessage,
    }


}

