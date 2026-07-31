import { Suspense, useState } from 'react';
import { CheckboxGroup, Label } from 'react-aria-components';
import { Link } from 'react-router';

import { Checkbox } from '@/components/ui/elements/Checkbox';
import SvgSpinnersLoader5 from '@/components/ui/elements/SvgSpinnersLoader5';
import { css } from 'styled-system/css';

import FloatingAddButton from './components/FloatingAddButton';
import { useFetchAllProductSkuTagsWithCounts } from './components/hooks/useFetchAllProductSkuTagsWithCounts';
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
  const { productSkuTagsWithCounts } = useFetchAllProductSkuTagsWithCounts();
  const [selectedItem, setSelectedItem] = useState(-1);
  const { filteredProducts, filters, handleCheckboxChange } = useProductFilter(productSkuDetails, productSkuTagsWithCounts);

  const getSortedProductImages = (
    productImages: Record<string, string[]>,
    skuUlid: string,
    productUlid: string,
  ): string[] => {
    const collected: string[] = [];

    if (skuUlid in productImages) {
      collected.push(...productImages[skuUlid]);
    }
    if (productUlid in productImages) {
      collected.push(...productImages[productUlid]);
    }

    if (collected.length === 0)
      return [];

    const filename = (url: string) => {
      const idx = url.lastIndexOf('/');
      return idx === -1 ? url.toLowerCase() : url.substring(idx + 1).toLowerCase();
    };

    return collected
      .slice()
      .sort((a, b) => filename(a).localeCompare(filename(b), undefined, { numeric: true, sensitivity: 'base' }));
  };

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
            color: 'stone.950',
            textShadow: 'rgba(255, 255, 255, 0.3) 1px 1px',
            bgImage: 'linear-gradient(in oklch 90deg, {colors.stone.300/35}, {colors.slate.100/20})',
            backdropFilter: 'blur(4px)',
            borderRadius: 'lg',
            shadow: 'md',
            p: '1rem',
          })}
        >
          <h2 className={css({ fontWeight: 'bold', mb: '1rem' })}>フィルター</h2>

          {/* フィルター UI */}
          <div className={css({
            display: 'flex',
            flexDir: 'column',
            gap: '0.5rem',

            '&>div': {
              display: 'flex',
              flexDir: 'column',
              gap: '0.375rem',

              '&>span': {
                fontSize: 'sm',
                fontWeight: 'bold',
                color: 'stone.900',
                mb: '0.25rem',
              },

              '& label': { color: 'stone.950' },
            },
          })}
          >
            <CheckboxGroup
              value={filters.categories}
              onChange={handleCheckboxChange('categories')}
            >
              <Label>カテゴリフィルター</Label>
              <Checkbox value="0">全て</Checkbox>
              {productOptions.product_categories.map(category => (
                <Checkbox key={category.id} value={String(category.id)}>
                  {category.name}
                </Checkbox>
              ))}
            </CheckboxGroup>
            <CheckboxGroup
              value={filters.maxPieceWeight}
              onChange={handleCheckboxChange('maxPieceWeight')}
            >
              <Label>内容量フィルター</Label>
              <Checkbox value="0">全て</Checkbox>
              <Checkbox value="1">２ｇ以下</Checkbox>
              <Checkbox value="2">２．１ｇ～２９９．９ｇ</Checkbox>
              <Checkbox value="3">３００ｇ以上</Checkbox>
            </CheckboxGroup>
            <CheckboxGroup
              value={filters.tagIds}
              onChange={handleCheckboxChange('tagIds')}
            >
              <Label>タグフィルター</Label>
              <Checkbox value="0">フィルター無し</Checkbox>
              {productSkuTagsWithCounts.map(tag => (
                <Checkbox key={tag.tag_id} value={String(tag.tag_id)}>
                  {`${tag.label} (${tag.tagged_skus_count}) `}
                </Checkbox>
              ))}
            </CheckboxGroup>
          </div>
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
              const imgUrl = getSortedProductImages(productImages, detail.sku_ulid_str, detail.ulid_str);
              return (
                <ProductItem
                  key={detail.sku_id}
                  index={i}
                  setSelectedItem={setSelectedItem}
                  imageUrl={imgUrl.length ? imgUrl[0] : undefined}
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
            color: 'stone.500',
          })}
          >
            <SvgSpinnersLoader5 size="9rem" />
          </div>
        )}
        >
          <ProductBottomSheet
            isOpen={selectedItem !== -1}
            setSelectedItem={setSelectedItem}
            images={selectedItem !== -1
              ? getSortedProductImages(
                  productImages,
                  filteredProducts[selectedItem].sku_ulid_str,
                  filteredProducts[selectedItem].ulid_str,
                )
              : undefined}
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
