import type { AxiosResponse } from 'axios';

import { useSuspenseQuery } from '@tanstack/react-query';

import axiosInst from '@/util/axiosInstance';

import type { ViewSkuDetailsRow } from '../../products.dbTable.types';

async function fetchProductSkuDetailsQueryFn() {
  const result: AxiosResponse<ViewSkuDetailsRow[]> = await axiosInst.get('/products').catch((err: string) => {
    console.error(`💥💥💥 /products からのエラーをキャッチ❢ ${err} 💀💀💀`);
    return Promise.reject(new Error(err));
  });

  return result.data;
}

export function useFetchProductSkuDetails() {
  const { data: productSkuDetails } = useSuspenseQuery({
    queryKey: ['/products'],
    queryFn: fetchProductSkuDetailsQueryFn,
  });

  return { productSkuDetails };
}
