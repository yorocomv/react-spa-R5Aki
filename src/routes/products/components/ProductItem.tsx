import { css } from 'styled-system/css';

import type { ViewSkuDetailsRow } from '../products.dbTable.types';

export default function ProductItem(p: ViewSkuDetailsRow & { index: number }) {
  return (
    <article className={css({
      bgColor: p.index % 2 ? 'lime.200' : 'yellow.200',
      color: p.index % 2 ? 'lime.950' : 'yellow.950',
      borderRadius: 'lg',
      shadow: 'xl',
    })}
    >
      <figure className={css({ boxShadow: 'inset 0 -1px #d6d3d1' })}>
        {p.index % 2
          ? (
              <dfn className={css({
                px: '0.5rem',
                py: '0.725rem',
                display: 'grid',
                fontSize: '3rem',
                fontWeight: 'bold',
                minH: '13rem',
                placeItems: 'center',
              })}
              >
                {p.sku_name}
              </dfn>
            )
          : (
              <div className={css({
                w: 'fit-content',
                mx: 'auto',
              })}
              >
                <img
                  src="http://192.168.10.35:8080/img/u3.webp"
                  alt="test"
                  className={css({ w: '16rem', h: '13rem', objectFit: 'cover', borderTopRadius: 'lg' })}
                />
              </div>
            )}
      </figure>
      <div className={css({
        px: '0.5rem',
        py: '0.725rem',
      })}
      >
        <h2 className={css({ fontSize: '1.25rem', fontWeight: 'bold' })}>
          {p.sku_name}
          <span className={css({ verticalAlign: 'super', fontSize: '0.625em', pl: '0.25em' })}>{p.category_name}</span>
        </h2>
        <p>{p.product_name}</p>
      </div>
    </article>
  );
}
