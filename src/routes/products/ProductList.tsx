import { Suspense, useState } from 'react';
import { Link } from 'react-router';

import SvgSpinnersLoader5 from '@/components/ui/elements/SvgSpinnersLoader5';
import { css } from 'styled-system/css';

import FloatingAddButton from './components/FloatingAddButton';
import { useFetchProductImages } from './components/hooks/useFetchProductImages';
import { useFetchProductOptions } from './components/hooks/useFetchProductOptions';
import { useFetchProductSkuDetails } from './components/hooks/useFetchProductSkuDetails';
import ProductBottomSheet from './components/ProductBottomSheet';
import ProductItem from './components/ProductItem';

export default function ProductList() {
  const { productSkuDetails } = useFetchProductSkuDetails();
  const { productImages } = useFetchProductImages();
  const { productOptions } = useFetchProductOptions();
  const [selectedItem, setSelectedItem] = useState(-1);

  return (
    <div className={css({ w: '100vw', minH: '100vh' })}>
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
          <div className={css({ display: 'flex', flexDir: 'column', gap: '0.5rem', '&>button': { textAlign: 'left' } })}>
            <button type="button">全て</button>
            {productOptions.product_categories.map(category => (
              <button key={category.id} type="button">{category.name}</button>
            ))}
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
        </div>
      </section>

      {/* ===================================================== */}
      {/* ② 下部：HTML フッター（UI はモーダル + 固定ボタン） */}
      {/* ===================================================== */}
      <footer
        className={css({
          w: '100vw',
          p: '1rem',
          mt: '2rem',
          display: 'flex',
          flexDir: 'column',
          alignItems: 'center',
          gap: '1rem',
        })}
      >
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
            images={selectedItem !== -1 ? productImages[productSkuDetails[selectedItem].ulid_str ?? ''] : undefined}
            {...productSkuDetails[selectedItem]}
          />
        </Suspense>
        <Link to="./new" relative="path">
          <FloatingAddButton text="新規登録" />
        </Link>
      </footer>
    </div>
  );
}
