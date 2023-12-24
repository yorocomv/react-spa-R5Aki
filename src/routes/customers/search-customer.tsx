import { css } from '../../../styled-system/css';
import { vstack } from '../../../styled-system/patterns/vstack';
import SearchInput from '../../components/SearchInput';

export default function SearchCustomer() {
  return (
    <>
      <header
        className={css({
          pos: 'sticky',
          top: 0,
          backdropFilter: 'blur(8px)',
          px: 2,
          py: 2.5,
          boxShadow: '0 2px 4px rgba(0,0,0,.02),0 1px 0 rgba(0,0,0,.06)',
        })}
      >
        <SearchInput />
      </header>
      <section className={vstack()}>
        <h2 className={css({ mb: '90lvh' })}>ヒット数</h2>
        <div className={css({ mb: '90lvh' })}>検索結果 1</div>
      </section>
    </>
  );
}
