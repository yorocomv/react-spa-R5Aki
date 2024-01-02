import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense, useState } from 'react';
import { z } from 'zod';
import { AxiosResponse } from 'axios';
import { css } from '../../../styled-system/css';
import { vstack } from '../../../styled-system/patterns/vstack';
import SearchInput from '../../components/SearchInput';
import axiosInst from '../../util/axios-instance';
import { customersTbRowSchema } from './customers.schemas';

type CustomersTbRow = z.infer<typeof customersTbRowSchema>;

export default function SearchCustomer() {
  const [searchString, setSearchString] = useState('');
  const [searchTrigger, setSearchTrigger] = useState(false);
  const fetchSelectedCustomersQueryFn = async () => {
    // useSuspenseQuery には enabled オプションが無いので
    // コンポーネントのマウント時に queryFn が走ってしまう 👇一行はその対策
    if (searchString.length === 0) return [];
    const result: AxiosResponse<CustomersTbRow[]> = await axiosInst.get(`/customers?search_name=${searchString}`);

    return result.data;
  };
  const { data } = useSuspenseQuery({
    queryKey: ['customers?search_name', searchTrigger],
    queryFn: fetchSelectedCustomersQueryFn,
  });

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
        <SearchInput
          searchString={searchString}
          setSearchString={setSearchString}
          searchTrigger={searchTrigger}
          setSearchTrigger={setSearchTrigger}
        />
      </header>
      <section className={vstack()}>
        <Suspense fallback={<div>検索中。。</div>}>
          <div>
            <ul>
              {data.length ? data.map((customer) => <li key={customer.id}>{customer.name1}</li>) : <div>Hit 0</div>}
            </ul>
          </div>
        </Suspense>
        <h2 className={css({ mb: '90lvh' })}>ヒット数</h2>
        <div className={css({ mb: '90lvh' })}>検索結果 1</div>
      </section>
    </>
  );
}
