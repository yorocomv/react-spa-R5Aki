import type { AxiosResponse } from 'axios';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import axiosInstance from '@/util/axiosInstance';

import type { PostResNewProduct, ProductSkus } from '../../products.types';

async function registerQuantityVariantProductsMutationFn({ values }: { values: ProductSkus }) {
  const response: AxiosResponse<PostResNewProduct> = await axiosInstance.post('/products/sku', values).catch((err: string) => {
    console.error(`💥💥💥 /products/sku からのエラーをキャッチ❢ ${err} 💀💀💀`);
    return Promise.reject(new Error(err));
  });
  return response.data;
}

export function useRegisterQuantityVariantProducts() {
  const queryClient = useQueryClient();
  const { mutateAsync: registerProductsSku } = useMutation({
    mutationFn: registerQuantityVariantProductsMutationFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['post:/products/sku'] }),
  });

  return { registerProductsSku };
}
