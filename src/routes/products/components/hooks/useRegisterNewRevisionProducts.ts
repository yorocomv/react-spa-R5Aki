import type { AxiosResponse } from 'axios';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import axiosInstance from '@/util/axiosInstance';

import type { PostReqUnifiedRevision, PostResNewProduct } from '../../products.types';

async function registerNewRevisionProductsMutationFn({ values }: { values: PostReqUnifiedRevision }) {
  const response: AxiosResponse<PostResNewProduct> = await axiosInstance.post('/products/revision', values).catch((err: string) => {
    console.error(`💥💥💥 /products/revision からのエラーをキャッチ❢ ${err} 💀💀💀`);
    return Promise.reject(new Error(err));
  });
  return response.data;
}

export function useRegisterNewRevisionProducts() {
  const queryClient = useQueryClient();
  const { mutateAsync: registerNewRevisionProducts } = useMutation({
    mutationFn: registerNewRevisionProductsMutationFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['post:/products/revision'] }),
  });

  return { registerNewRevisionProducts };
}
