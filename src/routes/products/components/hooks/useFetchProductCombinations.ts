import type { AxiosResponse } from 'axios';

import { useSuspenseQuery } from '@tanstack/react-query';

import axiosInst from '@/util/axiosInstance';

import type { ViewProductCombinationsArray } from '../../products.dbTable.types';

export function useFetchProductCombinations({
  productId,
  earlyReturn = false,
}: {
  productId: number;
  earlyReturn: boolean;
}) {
  const { data: productCombinations } = useSuspenseQuery({
    queryKey: ['/products/:productId/combinations', productId, earlyReturn],
    queryFn: async () => {
      if (!productId || earlyReturn)
        return [];
      const result: AxiosResponse<ViewProductCombinationsArray> = await axiosInst.get(`/products/${productId}/combinations`).catch((err: string) => {
        console.error(`💥💥💥 /products/${productId}/combinations からのエラーをキャッチ❢ ${err} 💀💀💀`);
        return Promise.reject(new Error(err));
      });

      return result.data;
    },
  });

  return { productCombinations };
}
