import { Suspense } from 'react';
import '@/components/ui/reactAriaModalOverlayBottomSheet.css';
import { Dialog, Heading, Modal, ModalOverlay } from 'react-aria-components';
import { FaStar } from 'react-icons/fa6';

import { css } from 'styled-system/css';

import type { ViewSkuDetailsRow } from '../products.dbTable.types';

import NIl from './NIl';
import ProductCompositionItems from './ProductCompositionItems';
import ProductImageIcons from './ProductImageIcons';

type ProductBottomSheetProps = ViewSkuDetailsRow & {
  setSelectedItem: React.Dispatch<React.SetStateAction<number>>;
  isOpen?: boolean;
} & {
  images?: string[];
};

export default function ProductBottomSheet(p: ProductBottomSheetProps) {
  const isOpen = p.isOpen ?? false;

  return (
    <ModalOverlay isDismissable isOpen={isOpen} onOpenChange={() => p.setSelectedItem(-1)}>
      <Modal>
        <div className={css({ pos: 'relative' })}>
          <div className={css({
            position: 'absolute',
            top: 'max(-3.125rem, calc(10dvh * -1 + 0.375rem))',
            right: '1rem',
            display: 'flex',
            gap: '0.75rem',
          })}
          >
            <button
              type="button"
              onClick={() => alert('hoge')}
              className={css({
                w: '2.5rem',
                h: '2.5rem',
                bg: 'slate.700',
                color: 'slate.50',
                borderRadius: 'full',
                shadow: 'lg',
                display: 'grid',
                placeItems: 'center',
              })}
            >
              ✎
            </button>
            <button
              type="button"
              onClick={() => alert('hoge')}
              className={css({
                w: '2.5rem',
                h: '2.5rem',
                bg: 'slate.50',
                color: 'slate.900',
                borderRadius: 'full',
                shadow: 'lg',
                display: 'grid',
                placeItems: 'center',
                fontWeight: 'bold',
              })}
            >
              ✕
            </button>
          </div>
          <Dialog className={css({
            w: '100vw',
            minH: '50dvh',
            maxH: '90dvh',
            px: '0.5rem',
            py: '0.725rem',
            bg: 'slate.400',
            color: 'yellow.200',
            fontFamily: '"Noto Sans JP", "BIZ UDPGothic", sans-serif',
            fontWeight: 'medium',
            textShadow: 'var(--colors-slate-600) 0.5px -1px',
            outline: 'none',
            borderTopRadius: '1rem',
            shadow: '0 -0.5rem 1.25rem rgba(0 0 0 / 0.1)',
            overflow: 'scroll',
            scrollbarWidth: 'none',
          })}
          >
            <section className={css({ display: 'grid', placeItems: 'center' })}>
              <Heading
                slot="title"
                className={css({
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '2xl',
                  fontWeight: 'black',

                  '& + :not(:has(img))': { mt: '2rem' },
                })}
              >
                {p.sku_name}
                <span className={css({ display: 'flex', alignItems: 'center', fontSize: '0.625em', ml: '1rem', color: 'yellow.300' })}>
                  (ＳＫＵ別・略称)
                  <span className={css({
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '1.125rem',
                    fontWeight: 'bold',
                    color: 'orange.400',
                    textShadow: 'none',
                  })}
                  >
                    <FaStar className={css({ ml: '0.5rem', mr: '0.125rem' })} />
                    {p.priority}
                  </span>
                </span>
              </Heading>
              {p.images ? <ProductImageIcons imageUrls={p.images} /> : null}
              <ul className={css({
                display: 'flex',
                flexWrap: 'wrap', // 溢れたら折り返す
                gap: '1.5rem',

                '&>li': {
                  maxW: '27rem',
                  mx: 'auto',
                  // 中身が1行に収まりきらなくなると、その要素が次の行へ落ちる
                  flex: 'auto', // flex-grow: 1, flex-shrink: 1, flex-basis: auto
                  color: 'yellow.400',
                },

                '& ul, & ol': {
                  pl: '2.125rem',

                  '&>li': {
                    color: 'yellow.300',

                    '&>ul>li, &>ol>li': { color: 'yellow.200' },
                  },
                },
                '& strong': { color: 'green.300', fontStyle: 'normal' },
              })}
              >
                <li>
                  単品詳細
                  <span className={css({ color: 'slate.600', fontSize: '0.75em', fontWeight: 'normal', ml: '0.75rem', textShadow: 'none' })}>
                    [
                    {` ${p.ulid_str} `}
                    ]
                  </span>
                  <ul>
                    <li>
                      商品カタログ掲載名
                      <ul><li>{p.product_name}</li></ul>
                    </li>
                    <li>
                      品番（発注コード）
                      <ul><li>{p.internal_code ?? '未登録'}</li></ul>
                    </li>
                    <li>
                      JAN コード
                      <ul><li>{p.jan_code ?? '未登録'}</li></ul>
                    </li>
                    <li>
                      製造販売タイプ
                      <ul><li>{p.sourcing_type}</li></ul>
                    </li>
                    <li>
                      商品カテゴリー
                      <ul>
                        <li>
                          {p.category_name}
                          {p.is_set_product ? <strong className={css({ ml: '1rem' })}>（セット商品）</strong> : null}
                        </li>
                      </ul>
                    </li>
                    <li>
                      商品パッケージタイプ
                      <ul><li>{p.packaging_type}</li></ul>
                    </li>
                    <li>
                      賞味期限（期間）
                      <ul>
                        <li>
                          {p.expiration_value ?? '未登録'}
                          {p.expiration_unit === 'Y'
                            ? '年'
                            : p.expiration_unit === 'M'
                              ? '月'
                              : '日'}
                        </li>
                      </ul>
                    </li>
                    <li>
                      先代商品ＩＤ
                      <ul><li>{p.predecessor_id ?? 'null'}</li></ul>
                    </li>
                    {/* ここで追加の Fetch */}
                    <Suspense fallback={
                      p.is_set_product
                        ? (
                            <li>
                              セット内容
                              <ol>
                                <li>Loading...</li>
                                <li>Loading...</li>
                              </ol>
                            </li>
                          )
                        : (
                            <li>
                              内容内訳
                              <ol>
                                <li>Loading...</li>
                              </ol>
                            </li>
                          )
                    }
                    >
                      <ProductCompositionItems productId={p.product_id} isSetProduct={p.is_set_product} />
                    </Suspense>
                  </ul>
                </li>
                <li>
                  荷姿・その他詳細
                  <ul>
                    <li>
                      発注先
                      <ul>
                        <li>
                          {p.supplier_name1 ? ` ${p.supplier_name1.trim()}` : '未登録'}
                          {p.supplier_name2 ? ` ${p.supplier_name2.trim()}` : null}
                        </li>
                      </ul>
                    </li>
                    <li>
                      発注方法／メモ
                      <ul><li>{p.supplier_note || 'なし'}</li></ul>
                    </li>
                    <NIl contents={p.height_mm}>
                      商品サイズ（
                      {p.diameter_mm ? '直径' : '縦・横'}
                      ・高さ）
                      <ul>
                        <li>
                          {p.diameter_mm
                            ? `${p.diameter_mm} mm × ${p.height_mm} mm`
                            : `${p.depth_mm} mm × ${p.width_mm} mm × ${p.height_mm} mm`}
                        </li>
                      </ul>
                    </NIl>
                    <NIl contents={p.weight_g}>
                      商品重量
                      <ul><li>{`${p.weight_g} g`}</li></ul>
                    </NIl>
                    <NIl contents={p.case_quantity}>
                      ケース入数
                      <ul><li>{p.case_quantity}</li></ul>
                    </NIl>
                    <NIl contents={p.itf_case_code}>
                      ＩＴＦコード（ケース）
                      <ul><li>{p.itf_case_code}</li></ul>
                    </NIl>
                    <NIl contents={p.case_depth_mm}>
                      ケースサイズ（縦・横・高さ）
                      <ul><li>{`${p.case_depth_mm} mm × ${p.case_width_mm} mm × ${p.case_height_mm} mm`}</li></ul>
                    </NIl>
                    <NIl contents={p.case_weight_g}>
                      ケース重量
                      <ul><li>{`${p.case_weight_g} g`}</li></ul>
                    </NIl>
                    <NIl contents={p.inner_carton_quantity}>
                      ボール入数
                      <ul><li>{p.inner_carton_quantity}</li></ul>
                    </NIl>
                    <NIl contents={p.itf_inner_carton_code}>
                      ＩＴＦコード（ボール）
                      <ul><li>{p.itf_inner_carton_code}</li></ul>
                    </NIl>
                    <NIl contents={p.inner_carton_depth_mm}>
                      ボールサイズ（縦・横・高さ）
                      <ul><li>{`${p.inner_carton_depth_mm} mm × ${p.inner_carton_width_mm} mm × ${p.inner_carton_height_mm} mm`}</li></ul>
                    </NIl>
                    <NIl contents={p.inner_carton_weight_g}>
                      ボール重量
                      <ul><li>{`${p.inner_carton_weight_g} g`}</li></ul>
                    </NIl>
                  </ul>
                </li>
              </ul>
            </section>
          </Dialog>
        </div>
      </Modal>
    </ModalOverlay>
  );
}
