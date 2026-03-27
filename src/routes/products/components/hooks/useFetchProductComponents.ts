import type { AxiosResponse } from 'axios';

import { useSuspenseQuery } from '@tanstack/react-query';

import axiosInst from '@/util/axiosInstance';

import type { ViewProductComponentsArray } from '../../products.dbTable.types';

export function useFetchProductComponents({
  productId,
  earlyReturn = false,
}: {
  productId: number;
  earlyReturn: boolean;
}) {
  const { data: productComponents } = useSuspenseQuery({
    queryKey: ['/products/:productId/components', productId, earlyReturn],
    queryFn: async () => {
      if (!productId || earlyReturn)
        return [];
      const result: AxiosResponse<ViewProductComponentsArray> = await axiosInst.get(`/products/${productId}/components`).catch((err: string) => {
        console.error(`💥💥💥 /products/${productId}/components からのエラーをキャッチ❢ ${err} 💀💀💀`);
        return Promise.reject(new Error(err));
      });

      return result.data;
    },
  });

  return { productComponents };
}
