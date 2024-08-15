
import React from "react";
import { useQuery , useMutation , useQueryClient } from "@tanstack/react-query";
// import { viewProduct } from "@/utils/api/product";
// import { fetchProducts,createProducts , editProducts, viewProducts ,deleteProducts } from "@/utils/apis/product";
import { fetchItemsInWarehouse,stockProductInWarehouse,removeProductInWarehouse } from "@/utils/apis/stock_item";
import { useToast } from "@/components/ui/use-toast"

export const useStockItem = (warehouseId=null) => {
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const queryClient = useQueryClient();
  const { toast } = useToast()


    const {data:warehouseproducts , isLoading :allLoading ,error:allFetchError , refetch} = useQuery({
        queryKey : ['warehouseproduct'],
        queryFn: ()=> fetchItemsInWarehouse(warehouseId),
        staleTime: 300000,
        // enabled: false, 
    })


  

    const {mutate:productsInWarehouse, isPending:isLoadingProductToWarehouse} = useMutation({
        mutationFn: fetchItemsInWarehouse,
        onSuccess: () => {
            queryClient.invalidateQueries(["warehouseproduct"])
            toast({
              title: "producr added to warehouse",
              description: "...........",
            })
            setIsSuccess(true);
          },
          onError: (error) => {
            toast({
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request.",
            })
            setErrorMessage(error.message)
            // console.error("Error occurred during registration:", error);
          },
    })

    const {mutate:addProductToWarehouseMutation, isPending:isAddingProductToWarehouse} = useMutation({
        mutationFn: stockProductInWarehouse,
        onSuccess: () => {
            queryClient.invalidateQueries(["warehouseproduct"])
            toast({
              title: "warehouse added",
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
            // console.error("Error occurred during registration:", error);
          },
    })




    const {mutate:deleteProductToWarehouseMutation, isPending:isDeletingProductToWarehouse} = useMutation({
        mutationFn: removeProductInWarehouse,
        onSuccess: () => {
            queryClient.invalidateQueries(["warehouseproduct"])
            toast({
              title: "warehouse deleted",
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
            // console.error("Error occurred during registration:", error);
          },
    })




    const addProductToWarehouse = async (newProduct)=>{
            await  addProductToWarehouseMutation(newProduct); 
    }

    const fetchProductsInWare = async (id)=>{
        await  productsInWarehouse(id); 
    }

    const deletingProductToWarehouse = async (id)=>{
        await  deleteProductToWarehouseMutation(id); 
    }

    return {
        warehouseproducts,
        allLoading,
        allFetchError,

        addProductToWarehouse,
        isAddingProductToWarehouse,

        
        fetchProductsInWare,
        isLoadingProductToWarehouse,

        deletingProductToWarehouse,
        isDeletingProductToWarehouse,

        isSuccess,
        errorMessage,
    }


}

