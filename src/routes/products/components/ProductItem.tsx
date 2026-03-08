import { css } from 'styled-system/css';

import type { ViewSkuDetailsRow } from '../products.dbTable.types';

export default function ProductItem(p: ViewSkuDetailsRow & { index: number }) {
  return (
    <article className={css({
      bgColor: p.index % 2 ? 'lime.300' : 'orange.300',
      color: p.index % 2 ? 'lime.950' : 'orange.950',
      borderRadius: 'lg',
      shadow: 'xl',
    })}
    >
      <figure>
        {p.index % 2
          ? (
              <dfn className={css({
                bgColor: p.index % 2 ? 'lime.200' : 'orange.200',
                color: p.index % 2 ? 'lime.950' : 'orange.950',
                borderTopRadius: 'lg',
                px: '0.5rem',
                py: '0.725rem',
                display: 'grid',
                placeItems: 'center',
                fontStyle: 'normal',
                fontSize: '3rem',
                fontWeight: 'bold',
                lineHeight: '3rem',
                textWrap: 'balance',
                textAlign: 'center',
                minH: '13rem',
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
                  onError={(e) => {
                    const img = e.currentTarget;
                    img.classList.add('is-load-error');
                  }}
                  className={css({
                    bgColor: 'orange.200',
                    w: '16rem',
                    h: '13rem',
                    objectFit: 'cover',
                    borderTopRadius: 'lg',

                    '&.is-load-error': {
                      pos: 'relative',
                      visibility: 'visible',
                      textIndent: '-100lvh',

                      '&::after': {
                        pos: 'absolute',
                        top: 0,
                        left: 0,
                        content: '"NO IMAGE"',
                        textIndent: 0,
                        w: '100%',
                        h: '100%',
                        display: 'grid',
                        placeItems: 'center',
                        fontFamily: '"Palatino Linotype"',
                        fontSize: '3rem',
                        fontWeight: 'bold',
                        lineHeight: '3rem',
                        textWrap: 'balance',
                        textAlign: 'center',
                      },
                    },
                  })}
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
          <span className={css({ bgColor: 'orange.200', verticalAlign: 'super', fontSize: '0.625em', ml: '0.25em', px: '0.25em', py: '0.125em' })}>{p.category_name}</span>
        </h2>
        <p>{p.product_name}</p>
      </div>
    </article>
  );
}
