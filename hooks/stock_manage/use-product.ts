
import React from "react";
import { useQuery , useMutation , useQueryClient } from "@tanstack/react-query";
import { fetchProducts,createProducts , createProductsMarkdown, viewProducts,update_markdown ,deleteProducts , productTransactions, updateProduct, editProductsMarkdown } from "@/utils/apis/product";
import { useToast } from "@/components/ui/use-toast"

export const useProducts = (enable:boolean = false , productId:number|null = null) => {
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [Product_Id, setProduct_Id] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");
    const queryClient = useQueryClient();
  const { toast } = useToast()


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

    // const {mutate:addProductMutation, isPending:isAddingProduct} = useMutation({
    //     mutationFn: createProducts,
    //     onSuccess: () => {
    //         queryClient.invalidateQueries(["products"])
    //         setIsSuccess(true);
    //         toast({
    //           title: "Product saved",
    //           description: "...........",
    //         })
    //       },
    //       onError: (error) => {
    //         setErrorMessage(error.message)
    //         toast({
    //           title: "Uh oh! Something went wrong.",
    //           description: "There was a problem with your request.",
    //         })
    //       },
    // })
    const { mutate: addProductMutation, isPending: isAddingProduct } = useMutation({
      mutationFn: createProducts,
      onSuccess: (productId) => {
          queryClient.invalidateQueries(["products"]);
          console.log(productId)
          setProduct_Id(productId); 
          setIsSuccess(true);
          toast({
              title: "Product saved",
              description: "The product was successfully created. <a>link</a>",
          });
      },
      onError: (error) => {
          setErrorMessage(error.message);
          toast({
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request.",
          });
      },
  });
  

    
    const {mutate:editProductMutation, isPending:isEditingProduct} = useMutation({
        mutationFn: updateProduct,
        onSuccess: () => {
            queryClient.invalidateQueries(["product",productId])
            toast({
              title: "Product Edited",
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



    const {mutate:UpdateMarkdownMutation, isPending:isEditingMarkdown} = useMutation({
      mutationFn: update_markdown,
      onSuccess: () => {
          queryClient.invalidateQueries(["product",productId])
          toast({
            title: "Product Edited",
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



    const {mutate:createProductsMarkdownMutation, isPending:isCreatingProductsMarkdown} = useMutation({
      mutationFn: createProductsMarkdown,
      onSuccess: () => {
          queryClient.invalidateQueries(["product",productId])
          toast({
            title: "Product Markdown saved",
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

    const {mutate:deleteProductMutation, isPending:isDeletingProduct} = useMutation({
        mutationFn: deleteProducts,
        onSuccess: () => {
            queryClient.invalidateQueries(["products"])
            toast({
              title: "Product deleted",
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




    const addProduct = async (newProduct: any)=>{
            await  addProductMutation(newProduct); 
    }

    const modifyProduct = async (product: any)=>{
     
        editProductMutation(product); 
    }

    const markdown_update_product = async (product: any)=>{
      UpdateMarkdownMutation(product); 
  }
  
    const createProductMarkdown = async (product: any)=>{
      createProductsMarkdownMutation(product); 
    }

    const deletingProduct = async (id: any)=>{
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
        Product_Id,
        isAddingProduct,

        
        modifyProduct,
        isEditingProduct,

        createProductMarkdown,
        isCreatingProductsMarkdown,

        deletingProduct,
        isDeletingProduct,

        markdown_update_product,
        isEditingMarkdown,

        isSuccess,
        errorMessage,
    }

}

