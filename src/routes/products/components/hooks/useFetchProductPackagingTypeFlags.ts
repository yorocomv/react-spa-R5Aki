import type { AxiosResponse } from 'axios';

import { useSuspenseQuery } from '@tanstack/react-query';

import axiosInst from '@/util/axiosInstance';

import type { ProductPackagingTypeFlags } from '../../options/options.types';

async function fetchProductPackagingTypeFlagsQueryFn() {
  const result: AxiosResponse<ProductPackagingTypeFlags[]> = await axiosInst.get('/products/packaging-type-flags').catch((err: string) => {
    console.error(`💥💥💥 /products/packaging-type-flags からのエラーをキャッチ❢ ${err} 💀💀💀`);
    return Promise.reject(new Error(err));
  });

  return result.data;
}

export function useFetchProductPackagingTypeFlags() {
  const { data: productPackagingTypeFlags } = useSuspenseQuery({
    queryKey: ['/products/packaging-type-flags'],
    queryFn: fetchProductPackagingTypeFlagsQueryFn,
  });

  return { productPackagingTypeFlags };
}
