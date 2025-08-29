import type { AxiosResponse } from 'axios';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import axiosInstance from '@/util/axiosInstance';

import type { NewProductSummary, PostReqNewProduct, PostReqNewSetProduct } from '../../products.types';

type UseRegisterProductsProps =
  | {
    url: '';
    values: PostReqNewProduct;
  }
  | {
    url: '/set-item';
    values: PostReqNewSetProduct;
  };

async function registerProductsMutationFn({ url, values }: UseRegisterProductsProps) {
  const response: AxiosResponse<NewProductSummary> = await axiosInstance.post(`/products${url}`, values).catch((err: string) => {
    console.error(`💥💥💥 /products${url} からのエラーをキャッチ❢ ${err} 💀💀💀`);
    return Promise.reject(new Error(err));
  });
  return response.data;
}

export function useRegisterProducts() {
  const queryClient = useQueryClient();
  const { mutateAsync: registerProducts } = useMutation({
    mutationFn: registerProductsMutationFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['🐛!!!🐛 TODO FIXME 🐛!!!🐛'] }),
  });

  return { registerProducts };
}
