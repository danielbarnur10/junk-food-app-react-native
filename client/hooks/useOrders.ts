import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { orderService } from "@/services/order.service";
import { Order } from "@/types/orders";

const ORDER_KEY = ["order"];

export const useOrder = () =>
  useQuery<Order>({
    queryKey: ORDER_KEY,
    queryFn: orderService.get,
  });

export const useAddOrder = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: orderService.create,
    onSuccess: () => {
      // refresh "my orders" after creating a new one
      qc.invalidateQueries({ queryKey: ORDER_KEY });
    },
  });
};

export const useUpdateOrderItem = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ productId, qty }: { productId: string; qty: number }) =>
      orderService.updateItem(productId, qty),
    onSuccess: () => qc.invalidateQueries({ queryKey: ORDER_KEY }),
  });
};

export const useRemoveOrderItem = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (productId: string) => orderService.removeItem(productId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ORDER_KEY }),
  });
};

export const useClearOrder = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: orderService.clear,
    onSuccess: () => qc.invalidateQueries({ queryKey: ORDER_KEY }),
  });
};