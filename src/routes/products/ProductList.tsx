import { css } from 'styled-system/css';

import { useFetchProductImages } from './components/hooks/useFetchProductImages';
import { useFetchProductSkuDetails } from './components/hooks/useFetchProductSkuDetails';
import ProductItem from './components/ProductItem';

export default function ProductList() {
  const { productSkuDetails } = useFetchProductSkuDetails();
  const { productImages } = useFetchProductImages();

  return (
    <div className={css({
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(13rem, 16rem))',
      justifyContent: 'center',
      gap: '1rem',
      p: '1rem',
    })}
    >
      {productSkuDetails.map(detail => (
        <ProductItem
          key={detail.sku_id}
          imageUrl={detail.ulid_str ? productImages[detail.ulid_str]?.[0] : undefined}
          {...detail}
        />
      ))}
    </div>
  );
}
