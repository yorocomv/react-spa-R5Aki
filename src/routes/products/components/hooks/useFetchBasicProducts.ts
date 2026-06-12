import type { AxiosResponse } from 'axios';

import { useSuspenseQuery } from '@tanstack/react-query';

import axiosInst from '@/util/axiosInstance';

import type { BasicProductsTbRow } from '../../products.dbTable.types';

export function useFetchBasicProducts(excludeId?: number) {
  const url = excludeId !== undefined ? `/products/basic-products?excludeId=${excludeId}` : '/products/basic-products';
  const { data: basicProducts } = useSuspenseQuery({
    queryKey: [url],
    queryFn: async () => {
      const result: AxiosResponse<BasicProductsTbRow[]> = await axiosInst.get(url).catch((err: string) => {
        console.error(`💥💥💥 ${url} からのエラーをキャッチ❢ ${err} 💀💀💀`);
        return Promise.reject(new Error(err));
      });

      return result.data;
    },
  });

  return { basicProducts };
}
