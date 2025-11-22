import { Outlet, ScrollRestoration } from 'react-router';

import { useSearchCustomer } from '@/routes/customers/components/hooks/useSearchCustomer';
import LinkNewRegistration from '@/routes/customers/components/LinkNewRegistration';
import SearchForm from '@/routes/customers/components/SearchForm';
import { css } from 'styled-system/css';

export default function SearchCustomer() {
  const { searchString, setSearchString, searchTrigger, setSearchTrigger, latestCommunicationTime, customers } =
    useSearchCustomer();

  return (
    <>
      <header
        className={css({
          pos: 'sticky',
          top: 0,
          zIndex: '1',
          backdropFilter: 'blur(6px)',
          px: 2,
          py: 2.5,
          boxShadow: '2xl',
        })}
      >
        <nav
          className={css({
            display: 'grid',
            alignItems: 'center',
            gridTemplateColumns: '1fr auto 1fr',
          })}
        >
          <div className={css({ gridColumn: '2/3' })}>
            <SearchForm
              searchString={searchString}
              setSearchString={setSearchString}
              searchTrigger={searchTrigger}
              setSearchTrigger={setSearchTrigger}
              placeholder="スペース区切りアンド検索、末尾に ：都道府県 or ：：市区町村 絞り込"
            />
          </div>
          <div className={css({ gridColumn: '3/4', justifySelf: 'end', mr: '0.75rem' })}>
            <LinkNewRegistration relativePath="/customers/register" height="1.875rem" />
          </div>
        </nav>
      </header>
      <Outlet context={{ latestCommunicationTime, customers }} />
      {/* ブラウザのスクロール復元をエミュレート */}
      <ScrollRestoration />
    </>
  );
}
