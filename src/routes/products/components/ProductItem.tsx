import { css } from 'styled-system/css';

import type { ViewSkuDetailsRow } from '../products.dbTable.types';

export default function ProductItem(p: ViewSkuDetailsRow) {
  return (
    <article className={css({
      p: '0.5rem',
      bgColor: 'violet.50',
      borderRadius: 'lg',
      shadow: 'xl',
    })}
    >
      <figure>
        <dfn className={css({
          fontSize: '3rem',
          fontWeight: 'bold',
        })}
        >
          {p.sku_name}
        </dfn>
      </figure>
      <div>
        <h2 className={css({ fontSize: '1.25rem', fontWeight: 'bold' })}>{p.sku_name}</h2>
        <p>{p.product_name}</p>
        <div>アクション</div>
      </div>
    </article>
  );
}
