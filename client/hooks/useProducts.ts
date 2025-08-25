import { productService } from "@/services/product.service";
import { Product } from "@/types/product";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: productService.getAll,
  });
};

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: productService.create,
  });
};

export const useUpdateProduct = () => {
  return useMutation({
    mutationFn: productService.update,
  });
};

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: productService.delete,
  });
};
