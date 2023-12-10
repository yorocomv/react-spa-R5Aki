import { css } from '../../../styled-system/css';
import { vstack } from '../../../styled-system/patterns/vstack';

export default function SearchCustomer() {
  return (
    <>
      <header
        className={css({
          position: 'sticky',
          top: 0,
          backdropFilter: 'blur(8px)',
          px: 2,
          py: 2.5,
          boxShadow: '0 2px 4px rgba(0,0,0,.02),0 1px 0 rgba(0,0,0,.06)',
        })}
      >
        <nav className={css({ display: 'grid', placeItems: 'center' })}>
          <form>
            <div className={css({ position: 'relative', display: 'inline-block' })}>
              <label htmlFor="input-search-form">
                検索
                <input id="input-search-form" type="text" />
              </label>
              <button
                type="button"
                disabled
                className={css({
                  display: 'flex',
                  position: 'absolute',
                  p: 0,
                  m: 0,
                  borderRadius: '50%',
                  background: 'none',
                  boxShadow: 'none',
                  top: '0.625rem',
                  right: '0.625rem',
                  '&:disabled > svg': {
                    display: 'none',
                  },
                })}
              >
                <svg
                  className={css({
                    width: '1.25rem',
                    height: '1.25rem',
                    _active: { color: 'red.500' },
                  })}
                >
                  <path
                    d="M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z"
                    stroke="currentColor"
                    fill="none"
                  />
                </svg>
              </button>
            </div>
            <button type="submit">検索</button>
          </form>
        </nav>
      </header>
      <section className={vstack()}>
        <h2 className={css({ mb: '90lvh' })}>ヒット数</h2>
        <div className={css({ mb: '90lvh' })}>検索結果 1</div>
      </section>
    </>
  );
}
