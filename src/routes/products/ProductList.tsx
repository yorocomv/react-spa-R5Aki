import { useState } from 'react';

import { css } from 'styled-system/css';

import { useFetchProductImages } from './components/hooks/useFetchProductImages';
import { useFetchProductSkuDetails } from './components/hooks/useFetchProductSkuDetails';
import ProductBottomSheet from './components/ProductBottomSheet';
import ProductItem from './components/ProductItem';

export default function ProductList() {
  const { productSkuDetails } = useFetchProductSkuDetails();
  const { productImages } = useFetchProductImages();
  const [selectedItem, setSelectedItem] = useState(-1);
  console.log(selectedItem);

  return (
    <>
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
            setSelectedItem={setSelectedItem}
            imageUrl={detail.ulid_str ? productImages[detail.ulid_str]?.[0] : undefined}
            {...detail}
          />
        ))}
      </div>
      <ProductBottomSheet isOpen={selectedItem !== -1} setSelectedItem={setSelectedItem} {...productSkuDetails[selectedItem]} />
    </>
  );
}
