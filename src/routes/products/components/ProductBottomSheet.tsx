import { Suspense } from 'react';
import '@/components/ui/reactAriaModalOverlayBottomSheet.css';
import { Dialog, Heading, Modal, ModalOverlay } from 'react-aria-components';
import { FaStar } from 'react-icons/fa6';

import { css } from 'styled-system/css';

import type { ViewSkuDetailsRow } from '../products.dbTable.types';

import ProductCompositionItems from './ProductCompositionItems';

type ProductBottomSheetProps = ViewSkuDetailsRow & {
  setSelectedItem: React.Dispatch<React.SetStateAction<number>>;
  isOpen?: boolean;
};

export default function ProductBottomSheet(p: ProductBottomSheetProps) {
  const isOpen = p.isOpen ?? false;

  return (
    <ModalOverlay isDismissable isOpen={isOpen} onOpenChange={() => p.setSelectedItem(-1)}>
      <Modal>
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
            <Heading slot="title" className={css({ display: 'flex', alignItems: 'center', fontSize: '2xl', fontWeight: 'black', mb: '2rem' })}>
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
            <ul className={css({
              display: 'flex',
              flexWrap: 'wrap', // 溢れたら折り返す
              gap: '1.5rem',

              '&>li': {
                maxW: '25rem',
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
                  <li>
                    商品サイズ mm（縦・横・高さ）
                    <ul><li>{p.depth_mm ? `${p.depth_mm} × ${p.width_mm} × ${p.height_mm}` : '未登録'}</li></ul>
                  </li>
                  <li>
                    商品重量 g
                    <ul><li>{p.weight_g ? `${p.weight_g}g` : '未登録'}</li></ul>
                  </li>
                  <li>
                    ケース入数
                    <ul><li>{p.case_quantity}</li></ul>
                  </li>
                  <li>
                    ＩＴＦコード（ケース）
                    <ul><li>{p.itf_case_code}</li></ul>
                  </li>
                  <li>
                    ケースサイズ mm（縦・横・高さ）
                    <ul><li>{p.case_depth_mm ? `${p.case_depth_mm} × ${p.case_width_mm} × ${p.case_height_mm}` : '未登録'}</li></ul>
                  </li>
                  <li>
                    ケース重量 g
                    <ul><li>{p.case_weight_g ? `${p.case_weight_g}g` : '未登録'}</li></ul>
                  </li>
                  <li>
                    ボール入数
                    <ul><li>{p.inner_carton_quantity}</li></ul>
                  </li>
                  <li>
                    ＩＴＦコード（ボール）
                    <ul><li>{p.itf_inner_carton_code}</li></ul>
                  </li>
                  <li>
                    ボールサイズ mm（縦・横・高さ）
                    <ul><li>{p.inner_carton_depth_mm ? `${p.inner_carton_depth_mm} × ${p.inner_carton_width_mm} × ${p.inner_carton_height_mm}` : '未登録'}</li></ul>
                  </li>
                  <li>
                    ボール重量 g
                    <ul><li>{p.inner_carton_weight_g ? `${p.inner_carton_weight_g}g` : '未登録'}</li></ul>
                  </li>
                </ul>
              </li>
            </ul>
          </section>
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}
