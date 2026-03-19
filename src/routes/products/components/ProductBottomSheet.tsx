import { Dialog, Modal, ModalOverlay } from 'react-aria-components';
import '@/components/ui/reactAriaModalOverlayBottomSheet.css';

import { css } from 'styled-system/css';

import type { ViewSkuDetailsRow } from '../products.dbTable.types';

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
          color: 'yellow.400',
          fontWeight: 'bold',
          textShadow: 'var(--colors-slate-600) 0.5px -1px',
          outline: 'none',
          borderTopRadius: '1rem',
          shadow: '0 -0.5rem 1.25rem rgba(0 0 0 / 0.1)',
          overflow: 'scroll',
          scrollbarWidth: 'none',

          '& ul': { pl: '40px' },
        })}
        >
          <section className={css({ display: 'grid', placeItems: 'center' })}>
            <h1 className={css({ fontSize: '2xl' })}>
              {p.sku_name}
              <span className={css({ fontSize: '0.625em', ml: '1rem' })}>(ＳＫＵ別・略称)</span>
            </h1>
            <ul className={css({ '& em': { color: 'green.300', fontStyle: 'normal' } })}>
              <li>
                単品詳細
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
                        {p.is_set_product ? <em className={css({ ml: '1rem' })}>（セット商品）</em> : null}
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
                  <li>
                    {p.is_set_product ? 'セット内容' : '内容内訳'}
                  </li>
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
