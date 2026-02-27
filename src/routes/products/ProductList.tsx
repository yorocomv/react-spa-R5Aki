import { css } from 'styled-system/css';

import { useFetchProductSkuDetails } from './components/hooks/useFetchProductSkuDetails';
import ProductItem from './components/ProductItem';

export default function ProductList() {
  const { productSkuDetails } = useFetchProductSkuDetails();

  return (
    <div className={css({
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(17rem, 1fr))',
      gap: '1rem',
      p: '1rem',
    })}
    >
      {productSkuDetails.map(detail => (
        <ProductItem
          key={detail.sku_id}
          {...detail}
        />
      ))}
    </div>
  );
}
