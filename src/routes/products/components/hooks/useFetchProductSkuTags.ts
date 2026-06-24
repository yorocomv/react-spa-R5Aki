import type { AxiosResponse } from 'axios';

import { useSuspenseQuery } from '@tanstack/react-query';

import axiosInst from '@/util/axiosInstance';

import type { ViewProductSkuTagsArray } from '../../products.dbTable.types';

export function useFetchProductSkuTags(skuId: number) {
  const { data: productSkuTags } = useSuspenseQuery({
    queryKey: ['/products/sku/:skuId/tags', skuId],
    queryFn: async () => {
      // SKU 選択前は早期リターン
      if (!skuId)
        return [];
      const result: AxiosResponse<ViewProductSkuTagsArray> = await axiosInst.get(`/products/sku/${skuId}/tags`).catch((err: string) => {
        console.error(`💥💥💥 /products/sku/${skuId}/tags からのエラーをキャッチ❢ ${err} 💀💀💀`);
        return Promise.reject(new Error(err));
      });

      return result.data;
    },
  });

  return { productSkuTags };
}
