// useOrders.js

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchOrders, createOrder, changeOrderToPaid ,fetchOrder ,deleteOrder } from "@/utils/apis/order";
import { useToast } from "@/components/ui/use-toast"

export const useOrders = (enable:boolean = false , Id:number|null = null) => {
  const queryClient = useQueryClient();
  const { toast } = useToast()

  // Fetch all orders
  const { data: orders, isLoading: ordersLoading , error} = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
    staleTime: 300000,
    enabled: !enable,

  });

  const {data:oneOrder , isLoading:singleLoading ,error:singleFetchError } = useQuery({
    queryKey :['order', Id],
    queryFn: () => fetchOrder(Id),
    staleTime: 300000,
  enabled: enable && Id !== null, // Disable the query by default, enable it only when needed
})
  // Mutation to create a new order
  const { mutate: createOrderMutation, isPending: isCreatingOrder } = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
      toast({
        title: "order registered",
        description: "...........",
      })
    },
    onError: (error) => {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      })
      // console.error("Error occurred during registration:", error);
    },
  });

  // Mutation to mark an order as paid
  const { mutate: changeOrderToPaidMutation, isPending: isChangingOrderToPaid } = useMutation({
    mutationFn: changeOrderToPaid,
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
      toast({
        title: "order paid successfully",
        description: "...........",
      })
    },
    onError: (error) => {
  
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      })
      // console.error("Error occurred during registration:", error);
    },
  });


  const {mutate:deleteOrderMutation, isPending:isDeletingOrder} = useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
        queryClient.invalidateQueries(["orders"])
        toast({
          title: "Order deleted",
          description: "...........",
        })
     
      },
      onError: (error) => {
    
        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        })
        // console.error("Error occurred during registration:", error);
      },
})


  
  const createNewOrder = async (orderData: any) => {
    await createOrderMutation(orderData);
  };

  const markOrderAsPaid = async (orderId: any) => {
    await changeOrderToPaidMutation(orderId);
  };

  const deletingOrder = async (id: any)=>{
    await  deleteOrderMutation(id); 
}

  return {
    orders,
    ordersLoading,
    error,
    createNewOrder,
    isCreatingOrder,
    markOrderAsPaid,
    oneOrder,
    isChangingOrderToPaid,
    deletingOrder ,
    singleLoading ,
singleFetchError
  };
};
