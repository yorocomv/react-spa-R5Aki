import { useAtomValue } from 'jotai';

import { selectedProductsAtom } from '@/atoms/productsAtom';

export default function SelectedProducts() {
  const selectedProducts = useAtomValue(selectedProductsAtom);

  return (
    <div>
      {selectedProducts.map((product) => {
        return (
          <div key={product.sku_id}>{product.sku_name}</div>
        );
      })}
    </div>
  );
}
