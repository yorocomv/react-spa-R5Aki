import { Suspense, useMemo, useState } from 'react';
import { CheckboxGroup, Label } from 'react-aria-components';
import { Link, useNavigate } from 'react-router';

import { Checkbox } from '@/components/ui/elements/Checkbox';
import Select from '@/components/ui/elements/Select';
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
  const navigate = useNavigate();
  const { productSkuDetails } = useFetchProductSkuDetails();
  const { productImages } = useFetchProductImages();
  const { productOptions } = useFetchProductOptions();
  const { productSkuTagsWithCounts } = useFetchAllProductSkuTagsWithCounts();
  const [selectedItem, setSelectedItem] = useState(-1);
  const { filteredProducts, filters, handleCheckboxChange } = useProductFilter(productSkuDetails, productSkuTagsWithCounts);

  const NOW = Date.now();

  const sortedProducts = useMemo(() => {
    const THREE_MINUTES = 3 * 60 * 1000; // ループ外で1回だけ定義

    return [...filteredProducts].sort((a, b) => {
      if (!a.updated_at || !b.updated_at)
        return 0;
      const timeA = new Date(a.updated_at).getTime();
      const timeB = new Date(b.updated_at).getTime();

      const isNewA = (NOW - timeA) <= THREE_MINUTES;
      const isNewB = (NOW - timeB) <= THREE_MINUTES;

      // 「両方3分以内」なら、より新しい方を前にし、
      // 「両方3分以上前」なら、現在の順番を維持
      if (isNewA === isNewB) {
        return isNewA ? timeB - timeA : 0;
      }

      // 片方だけが3分以内なら、それを前に出す
      return isNewA ? -1 : 1;
    });
  }, [NOW, filteredProducts]);

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

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    Promise.resolve(navigate(value)).catch((err: string) => {
      throw new Error(err);
    });
  };

  return (
    <div className={css({ w: '100vw', minH: '100lvh' })}>
      {/* ===================================================== */}
      {/* ① 上部：2 カラム構成（フィルター + 商品グリッド） */}
      {/* ===================================================== */}
      <section
        className={css({
          display: 'flex',
          flexDir: 'row',
          alignItems: 'flex-start',
          gap: '1.5rem',
          p: '1rem',
          w: '100%',
          maxW: '100vw',
          minH: '100lvh',

          '@media(width < 480px)': {
            flexDir: 'column',
          },
        })}
      >
        {/* 左カラム：フィルター（Sticky） */}
        <aside
          className={css({
            w: '16rem',
            flexShrink: 0,
            position: 'sticky',
            top: '1rem',
            alignSelf: 'flex-start',
            color: 'stone.950',
            textShadow: 'rgba(255, 255, 255, 0.3) 1px 1px',
            bgImage: 'linear-gradient(in oklch 90deg, {colors.stone.300/35}, {colors.slate.100/20})',
            backdropFilter: 'blur(4px)',
            borderRadius: 'lg',
            shadow: 'md',
            p: '1rem',

            '@media(width < 480px)': {
              w: '90vw',
              mx: 'auto',
              pos: 'relative',
              top: '0.5rem',
            },
          })}
        >
          <Select onChange={handleChange} className={css({ mb: '1rem' })}>
            <option>商品一覧</option>
            <hr />
            <option value="/shipping-instruction-printouts">🔗 印刷履歴ページへ</option>
          </Select>

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

            '@media(width < 480px)': {
              pt: '0.5rem',
            },
          })}
          >
            {sortedProducts.map((detail, i) => {
              const imgUrl = getSortedProductImages(productImages, detail.sku_ulid_str, detail.ulid_str);
              return (
                <ProductItem
                  key={detail.sku_id}
                  index={i}
                  setSelectedItem={setSelectedItem}
                  imageUrl={imgUrl.length ? imgUrl[0] : undefined}
                  now={NOW}
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
            images={selectedItem !== -1
              ? getSortedProductImages(
                  productImages,
                  sortedProducts[selectedItem].sku_ulid_str,
                  sortedProducts[selectedItem].ulid_str,
                )
              : undefined}
            {...sortedProducts[selectedItem]}
          />
        </Suspense>
        <Link to="./new" relative="path">
          <FloatingAddButton text="新規登録" />
        </Link>
      </footer>
    </div>
  );
}
