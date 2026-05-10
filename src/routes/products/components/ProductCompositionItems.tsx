import { css } from 'styled-system/css';

import type { ViewProductCombinationsArray, ViewProductComponentsArray } from '../products.dbTable.types';

export default function ProductCompositionItems({
  isSetProduct,
  productCombinations,
  productComponents,
}: {
  isSetProduct: boolean;
  productCombinations: ViewProductCombinationsArray;
  productComponents: ViewProductComponentsArray;
}) {
  return (
    <li>
      {isSetProduct ? 'セット内容' : '内容内訳'}
      <ol>
        {isSetProduct
          ? productCombinations.map(item => (
              <li key={item.combination_id}>
                {/* 商品名が全角カッコで終わった場合余分なスペースを出力しない */}
                {item.item_product_name.endsWith('）') ? `${item.item_product_name}× ${item.quantity}` : `${item.item_product_name} × ${item.quantity}`}
                <span className={css({ color: 'slate.600', fontWeight: 'normal', ml: '0.75rem', textShadow: 'none' })}>
                  {`(${item.item_product_short_name})`}
                </span>
              </li>
            ))
          : productComponents.map(comp => (
              <li key={comp.component_id}>
                {`${comp.title} ${comp.amount.replace(/\.00$/, '')} ${comp.unit_name} × ${comp.pieces}`}
                <span className={css({ color: 'slate.600', fontWeight: 'normal', ml: '0.75rem', textShadow: 'none' })}>
                  {`(内装：${comp.inner_packaging_type})`}
                </span>
              </li>
            ))}
      </ol>
    </li>
  );
}
