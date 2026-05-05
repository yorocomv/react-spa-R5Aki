import { css } from 'styled-system/css';

import type { ViewSkuDetailsRow } from '../products.dbTable.types';

export default function ProductItem(p: ViewSkuDetailsRow & {
  index: number;
  setSelectedItem: React.Dispatch<React.SetStateAction<number>>;
  imageUrl?: string;
}) {
  return (
    <article
      className={css({
        bgColor: 'var(--cat-color)',
        bgImage: 'linear-gradient(90deg in oklch, var(--cat-color), oklch(from var(--cat-color) calc(l + 0.1) c h))',
        borderRadius: 'lg',
        shadow: 'xl',
      })}
      style={{
        '--cat-color': `var(--colors-${p.category_color}-${p.category_color_shade})`,
        '--cat-color-light': `var(--colors-${p.category_color}-${Number(p.category_color_shade) - 100})`,
        '--cat-text-color': `var(--colors-${p.category_color}-950)`,
      } as React.CSSProperties}
    >
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded="false"
        onClick={() => p.setSelectedItem(p.index)}
        onKeyDown={() => p.setSelectedItem(p.index)}
        className={css({ display: 'block', textAlign: 'left', w: '100%', h: 'fit-content', p: 0, cursor: 'pointer' })}
      >
        <figure>
          {p.imageUrl?.startsWith('http')
            ? (
                <div className={css({ w: 'fit-content', mx: 'auto' })}>
                  <img
                    src={p.imageUrl}
                    alt={p.product_name}
                    onError={(e) => {
                      const img = e.currentTarget;
                      img.classList.add('is-load-error');
                    }}
                    className={css({
                      bgColor: 'var(--cat-color-light)',
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
              )
            : (
                <dfn className={css({
                  bgColor: 'var(--cat-color-light)',
                  borderTopRadius: 'lg',
                  display: 'grid',
                  placeItems: 'center',
                  fontStyle: 'normal',
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  lineHeight: '3rem',
                  textWrap: 'balance',
                  textAlign: 'center',
                  minH: '13rem',
                },
                )}
                >
                  <div className={css({
                    px: '0.5rem',
                    py: '0.725rem',
                    color: 'transparent',
                    bgImage: 'radial-gradient(oklch(from var(--cat-color) l calc(c + 0.025) h), var(--cat-text-color))',
                    bgClip: 'text',
                  })}
                  >
                    {p.sku_name}
                  </div>
                </dfn>
              )}
        </figure>
        <div className={css({
          px: '0.5rem',
          py: '0.725rem',
        })}
        >
          <h2 className={css({ fontSize: '1.25rem', fontWeight: 'bold' })}>
            {p.sku_name}
            <span className={css({ bgColor: 'var(--cat-color-light)', verticalAlign: 'super', fontSize: '0.625em', ml: '0.25em', px: '0.25em', py: '0.125em' })}>{p.display_category_name}</span>
          </h2>
          <p>{p.product_name}</p>
        </div>
      </button>
    </article>
  );
}
