import { Suspense, useState } from 'react';
import { CheckboxGroup, Label } from 'react-aria-components';
import { Link } from 'react-router';

import { Checkbox } from '@/components/ui/elements/Checkbox';
import SvgSpinnersLoader5 from '@/components/ui/elements/SvgSpinnersLoader5';
import { css } from 'styled-system/css';

import FloatingAddButton from './components/FloatingAddButton';
import { useFetchProductImages } from './components/hooks/useFetchProductImages';
import { useFetchProductOptions } from './components/hooks/useFetchProductOptions';
import { useFetchProductSkuDetails } from './components/hooks/useFetchProductSkuDetails';
import { useProductFilter } from './components/hooks/useProductFilter';
import ProductBottomSheet from './components/ProductBottomSheet';
import ProductItem from './components/ProductItem';

export default function ProductList() {
  const { productSkuDetails } = useFetchProductSkuDetails();
  const { productImages } = useFetchProductImages();
  const { productOptions } = useFetchProductOptions();
  const [selectedItem, setSelectedItem] = useState(-1);
  const { filteredProducts, filters, handleCheckboxChange } = useProductFilter(productSkuDetails);

  return (
    <div className={css({ w: '100vw', minH: '100lvh' })}>
      {/* ===================================================== */}
      {/* ① 上部：2 カラム構成（フィルター + 商品グリッド） */}
      {/* ===================================================== */}
      <section
        className={css({
          display: 'flex',
          flexDir: { base: 'column', md: 'row' },
          alignItems: 'flex-start',
          gap: '1.5rem',
          p: '1rem',
          w: '100%',
          maxW: '100vw',
          minH: { md: '100lvh' },
        })}
      >
        {/* 左カラム：フィルター（Sticky） */}
        <aside
          className={css({
            w: { base: '100%', md: '16rem' },
            flexShrink: 0,
            position: { md: 'sticky' },
            top: { md: '6rem' },
            alignSelf: 'flex-start',
            bgColor: 'white',
            borderRadius: 'lg',
            shadow: 'md',
            p: '1rem',
          })}
        >
          <h2 className={css({ fontWeight: 'bold', mb: '1rem' })}>フィルター</h2>

          {/* フィルター UI */}
          <div className={css({ display: 'flex', flexDir: 'column', gap: '0.5rem' })}>
            <CheckboxGroup
              value={filters.categories}
              onChange={handleCheckboxChange('categories')}
              className={css({ display: 'flex', flexDir: 'column', gap: '0.375rem' })}
            >
              <Label className={css({ fontSize: 'sm', fontWeight: 'bold', color: 'gray.700', mb: '0.25rem' })}>カテゴリフィルター</Label>
              <Checkbox value="0">全て</Checkbox>
              {productOptions.product_categories.map(category => (
                <Checkbox key={category.id} value={String(category.id)}>
                  {category.name}
                </Checkbox>
              ))}
            </CheckboxGroup>
          </div>
          {/* デバッグ用：現在のステートの確認 */}
          <pre style={{ background: '#f4f4f4', padding: '12px', borderRadius: '4px' }}>
            {JSON.stringify(filters, null, 2)}
          </pre>
        </aside>

        {/* 右カラム：商品グリッド */}
        <div className={css({ flex: 1, w: '100%' })}>
          <div className={css({
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(13rem, 16rem))',
            justifyContent: 'center',
            gap: '1rem',
            p: '1rem',
          })}
          >
            {filteredProducts.map((detail, i) => {
              const skuImagesExists = detail.sku_ulid_str in productImages;
              const productImagesExists = detail.ulid_str in productImages;
              let imgUrl: string[] = [];
              if (skuImagesExists)
                imgUrl = [...productImages[detail.sku_ulid_str]].sort();
              if (productImagesExists)
                imgUrl = [...productImages[detail.ulid_str]].sort();
              console.log(imgUrl);
              return (
                <ProductItem
                  key={detail.sku_id}
                  index={i}
                  setSelectedItem={setSelectedItem}
                  imageUrl={imgUrl ? imgUrl[0] : undefined}
                  {...detail}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* ② 下部：HTML フッター（UI はモーダル + 固定ボタン） */}
      {/* ===================================================== */}
      <footer>
        {/* モーダルとして表示される BottomSheet */}
        <Suspense fallback={(
          <div className={css({
            pos: 'absolute',
            top: 'calc(50dvh - 4.5rem)',
            left: 'calc(50dvw - 4.5rem)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'violet.500',
          })}
          >
            <SvgSpinnersLoader5 size="9rem" />
          </div>
        )}
        >
          <ProductBottomSheet
            isOpen={selectedItem !== -1}
            setSelectedItem={setSelectedItem}
            images={selectedItem !== -1 ? productImages[filteredProducts[selectedItem].ulid_str ?? ''] : undefined}
            {...filteredProducts[selectedItem]}
          />
        </Suspense>
        <Link to="./new" relative="path">
          <FloatingAddButton text="新規登録" />
        </Link>
      </footer>
    </div>
  );
}
