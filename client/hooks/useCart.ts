import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { orderService } from "@/services/order.service";
import { Order } from "@/types/orders";

const CART_KEY = ["cart"];

export function useCart() {
  return useQuery<Order>({
    queryKey: CART_KEY,
    queryFn: () => orderService.get(),
    retry: false,
  });
}

type AddVars = void | { productId?: string; qty?: number; quantity?: number };

export function useAddToCartOrCheckout() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (vars?: AddVars) => {
      if (vars && (vars as any).productId) {
        const v = vars as {
          productId: string;
          qty?: number;
          quantity?: number;
        };
        const q =
          typeof v.qty === "number"
            ? v.qty
            : typeof v.quantity === "number"
            ? v.quantity
            : 1;
        return orderService.addItem(v.productId, q);
      }
      return orderService.finalize();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: CART_KEY }),
  });
}

export function useAddToCart() {
  return useAddToCartOrCheckout();
}

export function useUpdateCartItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: {
      productId: string;
      qty?: number;
      quantity?: number;
    }) => {
      const q =
        typeof vars.qty === "number"
          ? vars.qty
          : typeof vars.quantity === "number"
          ? vars.quantity
          : 1;
      return orderService.updateItem(vars.productId, q);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: CART_KEY }),
  });
}

export function useRemoveFromCart() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { productId: string }) =>
      orderService.removeItem(vars.productId),
    onSuccess: () => qc.invalidateQueries({ queryKey: CART_KEY }),
  });
}

export function useClearCart() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => orderService.clear(),
    onSuccess: () => qc.invalidateQueries({ queryKey: CART_KEY }),
  });
}
