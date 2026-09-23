import { atom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';

import type {
  ViewProductCombinationsArray,
  ViewProductComponentsArray,
  ViewSkuDetailsRow,
} from '@/routes/products/products.dbTable.types';

type ProductContents =
  | { is_set_product: false; components: ViewProductComponentsArray }
  | { is_set_product: true; combinations: ViewProductCombinationsArray };

/** 比較表示に必要な商品詳細。発注数量はFAX画面だけが設定する任意項目。 */
export type SelectedProduct = Omit<ViewSkuDetailsRow, 'is_set_product'>
  & ProductContents
  & { orderQuantity?: number };

const selectedProductsStorage = createJSONStorage<SelectedProduct[]>(() => window.sessionStorage);

/**
 * 同一タブ内では画面更新後も選択を維持し、ブラウザセッション終了時には破棄される。
 * sessionStorage を使うため、別タブとの同期は行わない。
 */
export const selectedProductsAtom = atomWithStorage<SelectedProduct[]>(
  'selected-products:v1',
  [],
  selectedProductsStorage,
  { getOnInit: true },
);

/** 選択済み商品の件数。比較画面・ヘッダーのバッジに使える。 */
export const selectedProductCountAtom = atom(get => get(selectedProductsAtom).length);

/** 同じSKUを再選択した場合は、比較用の詳細を最新の内容で置き換える。 */
export const selectProductAtom = atom(
  null,
  (_get, set, selectedProduct: SelectedProduct) => {
    set(selectedProductsAtom, (selectedProducts) => {
      const currentProduct = selectedProducts.find(product => product.sku_id === selectedProduct.sku_id);
      if (!currentProduct) {
        return [...selectedProducts, selectedProduct];
      }

      return selectedProducts.map(product => product.sku_id === selectedProduct.sku_id
        ? { ...selectedProduct, orderQuantity: currentProduct.orderQuantity }
        : product);
    });
  },
);

export const setSelectedProductOrderQuantityAtom = atom(
  null,
  (_get, set, { skuId, quantity }: { skuId: SelectedProduct['sku_id']; quantity?: number }) => {
    if (quantity !== undefined && (!Number.isSafeInteger(quantity) || quantity < 1)) {
      throw new RangeError('発注数量は 1 以上の安全な整数で指定してください。');
    }

    set(selectedProductsAtom, selectedProducts => selectedProducts.map((product) => {
      if (product.sku_id !== skuId) {
        return product;
      }

      return { ...product, orderQuantity: quantity };
    }));
  },
);

export const removeSelectedProductAtom = atom(
  null,
  (_get, set, skuId: SelectedProduct['sku_id']) => {
    set(selectedProductsAtom, selectedProducts => selectedProducts.filter(product => product.sku_id !== skuId));
  },
);

/** 比較を終了したとき、またはFAX送信成功後に使用する。 */
export const clearSelectedProductsAtom = atom(
  null,
  (_get, set) => set(selectedProductsAtom, []),
);
