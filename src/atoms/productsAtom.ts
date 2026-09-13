import { atom } from 'jotai';

import type { ViewProductCombinationsArray, ViewProductComponentsArray, ViewSkuDetailsRow } from '@/routes/products/products.dbTable.types';

type ProductContents =
  | { is_set_product: false; components: ViewProductComponentsArray }
  | { is_set_product: true; combinations: ViewProductCombinationsArray };
type SelectedProducts = Omit<ViewSkuDetailsRow, 'is_set_product'> & ProductContents;

export const selectedProductsAtom = atom<SelectedProducts[]>([]);
