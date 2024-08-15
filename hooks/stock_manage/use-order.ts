// useOrders.js

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchOrders, createOrder, changeOrderToPaid } from "@/utils/apis/order";
import { useToast } from "@/components/ui/use-toast"

export const useOrders = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast()

  // Fetch all orders
  const { data: orders, isLoading: ordersLoading , error} = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
    staleTime: 300000,
  });

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

  const createNewOrder = async (orderData: any) => {
    await createOrderMutation(orderData);
  };

  const markOrderAsPaid = async (orderId: any) => {
    await changeOrderToPaidMutation(orderId);
  };

  return {
    orders,
    ordersLoading,
    error,
    createNewOrder,
    isCreatingOrder,
    markOrderAsPaid,
    isChangingOrderToPaid,
  };
};
