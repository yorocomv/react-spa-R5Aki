import type { AxiosResponse } from 'axios';

import { useSuspenseQuery } from '@tanstack/react-query';

import axiosInst from '@/util/axiosInstance';

import type { OptionTypes, ProductOptionsIdAndName } from '../../options/options.types';

async function fetchProductsOptionsQueryFn() {
  const result: AxiosResponse<Record<OptionTypes, ProductOptionsIdAndName[]>> = await axiosInst.get('/products/options').catch((err: string) => {
    console.error(`💥💥💥 /products/options からのエラーをキャッチ❢ ${err} 💀💀💀`);
    return Promise.reject(new Error(err));
  });

  return result.data;
}

export function useFetchProductsOptions() {
  const { data: productsOptions } = useSuspenseQuery({
    queryKey: ['/products/options'],
    queryFn: fetchProductsOptionsQueryFn,
  });

  return { productsOptions };
}
