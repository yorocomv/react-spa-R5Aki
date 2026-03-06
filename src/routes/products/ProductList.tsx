import { css } from 'styled-system/css';

import { useFetchProductSkuDetails } from './components/hooks/useFetchProductSkuDetails';
import ProductItem from './components/ProductItem';

export default function ProductList() {
  const { productSkuDetails } = useFetchProductSkuDetails();

  return (
    <div className={css({
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(13rem, 16rem))',
      justifyContent: 'center',
      gap: '1rem',
      p: '1rem',
    })}
    >
      {productSkuDetails.map((detail, i) => (
        <ProductItem
          key={detail.sku_id}
          index={i}
          {...detail}
        />
      ))}
    </div>
  );
}
