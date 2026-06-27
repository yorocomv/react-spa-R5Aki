import type { AxiosResponse } from 'axios';

import { useSuspenseQuery } from '@tanstack/react-query';

import axiosInst from '@/util/axiosInstance';

import type { ViewProductSkusTagCountsArray } from '../../products.dbTable.types';

export function useFetchAllProductSkuTagsWithCounts() {
  const { data: productSkuTagsWithCounts } = useSuspenseQuery({
    queryKey: ['/products/sku/tags'],
    queryFn: async () => {
      const result: AxiosResponse<ViewProductSkusTagCountsArray> = await axiosInst.get('/products/sku/tags').catch((err: unknown) => {
        if (err instanceof Error) {
          console.error(`💥💥💥 /products/sku/tags からのエラーをキャッチ❢ ${err.message} 💀💀💀`);
          return Promise.reject(new Error(err.message));
        }
        return Promise.reject(new Error(err as string));
      });

      return result.data;
    },
  });

  return { productSkuTagsWithCounts };
}
