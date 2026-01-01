import type { AxiosResponse } from 'axios';

import { useSuspenseQuery } from '@tanstack/react-query';

import axiosInst from '@/util/axiosInstance';

import type { ViewSingleProductsRow } from '../../products.dbTable.types';

async function fetchSingleProductsQueryFn() {
  const result: AxiosResponse<ViewSingleProductsRow[]> = await axiosInst.get('/products/single-products').catch((err: string) => {
    console.error(`💥💥💥 /products/single-products からのエラーをキャッチ❢ ${err} 💀💀💀`);
    return Promise.reject(new Error(err));
  });

  return result.data;
}

export function useFetchSingleProducts() {
  const { data: singleProducts } = useSuspenseQuery({
    queryKey: ['/products/single-products'],
    queryFn: fetchSingleProductsQueryFn,
  });

  return { singleProducts };
}
