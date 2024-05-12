// useOrders.js

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchOrders, createOrder, changeOrderToPaid } from "@/utils/apis/order";

export const useOrders = () => {
  const queryClient = useQueryClient();

  // Fetch all orders
  const { data: orders, isLoading: ordersLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
    staleTime: 300000,
  });

  // Mutation to create a new order
  const { mutate: createOrderMutation, isPending: isCreatingOrder } = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
    },
  });

  // Mutation to mark an order as paid
  const { mutate: changeOrderToPaidMutation, isPending: isChangingOrderToPaid } = useMutation({
    mutationFn: changeOrderToPaid,
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
    },
  });

  const createNewOrder = async (orderData) => {
    await createOrderMutation(orderData);
  };

  const markOrderAsPaid = async (orderId) => {
    await changeOrderToPaidMutation(orderId);
  };

  return {
    orders,
    ordersLoading,
    createNewOrder,
    isCreatingOrder,
    markOrderAsPaid,
    isChangingOrderToPaid,
  };
};
