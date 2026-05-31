import type { AxiosResponse } from 'axios';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import axiosInstance from '@/util/axiosInstance';

import type { PutReqUnifiedProduct, PutReqUnifiedProductWithNull } from '../../products.types';

interface UseUpdateProductsProps {
  url: '' | '/set-item';
  values: PutReqUnifiedProduct;
}

async function updateProductsMutationFn({ url, values }: UseUpdateProductsProps) {
  const response: AxiosResponse<PutReqUnifiedProductWithNull> = await axiosInstance.put(`/products${url}`, values).catch((err: string) => {
    console.error(`💥💥💥 /products${url} からのエラーをキャッチ❢ ${err} 💀💀💀`);
    return Promise.reject(new Error(err));
  });
  return response.data;
}

export function useUpdateProducts() {
  const queryClient = useQueryClient();
  const { mutateAsync: updateProducts } = useMutation({
    mutationFn: updateProductsMutationFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['put:/products'] }),
  });

  return { updateProducts };
}
