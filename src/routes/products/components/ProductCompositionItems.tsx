import { css } from 'styled-system/css';

import { useFetchProductCombinations } from './hooks/useFetchProductCombinations';
import { useFetchProductComponents } from './hooks/useFetchProductComponents';

export default function ProductCompositionItems({
  productId,
  isSetProduct,
}: {
  productId: number;
  isSetProduct: boolean;
}) {
  const { productCombinations } = useFetchProductCombinations({ productId, earlyReturn: !isSetProduct });
  const { productComponents } = useFetchProductComponents({ productId, earlyReturn: isSetProduct });

  return (
    <li>
      {isSetProduct ? 'セット内容' : '内容内訳'}
      <ol>
        {isSetProduct
          ? productCombinations.map(item => (
              <li key={item.combination_id}>
                {`${item.item_product_name} × ${item.quantity}`}
                <span className={css({ color: 'slate.600', fontWeight: 'normal', ml: '0.75rem', textShadow: 'none' })}>
                  {`(${item.item_product_short_name})`}
                </span>
              </li>
            ))
          : productComponents.map(comp => (
              <li key={comp.component_id}>
                {`${comp.title} ${comp.amount.replace(/\.00$/, '')}${comp.unit_name} × ${comp.pieces}`}
                <span className={css({ color: 'slate.600', fontWeight: 'normal', ml: '0.75rem', textShadow: 'none' })}>
                  {`(内装：${comp.inner_packaging_type})`}
                </span>
              </li>
            ))}
      </ol>
    </li>
  );
}
