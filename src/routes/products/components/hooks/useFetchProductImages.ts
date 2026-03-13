import type { AxiosResponse } from 'axios';

import { useSuspenseQuery } from '@tanstack/react-query';

import axiosInst from '@/util/axiosInstance';

async function fetchProductImagesQueryFn() {
  const result: AxiosResponse<Record<string, string[]>> = await axiosInst.get('/products/images').catch((err: string) => {
    console.error(`💥💥💥 /products/images からのエラーをキャッチ❢ ${err} 💀💀💀`);
    return Promise.reject(new Error(err));
  });

  return result.data;
}

export function useFetchProductImages() {
  const { data: productImages } = useSuspenseQuery({
    queryKey: ['/products/images'],
    queryFn: fetchProductImagesQueryFn,
  });

  return { productImages };
}
