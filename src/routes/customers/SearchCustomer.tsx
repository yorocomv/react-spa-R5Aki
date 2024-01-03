import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
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
  const [latestCommunicationTime, setLatestCommunicationTime] = useState('0');
  const fetchSelectedCustomersQueryFn = async () => {
    // useSuspenseQuery には enabled オプションが無いので
    // コンポーネントのマウント時に queryFn が走ってしまう 👇一行はその対策
    if (searchString.length === 0) return [];
    // おまけ機能前処理🐢
    const preRunTime = performance.now();
    const result: AxiosResponse<CustomersTbRow[]> = await axiosInst.get(`/customers?search_name=${searchString}`);

    // おまけ機能でも useState() ひとつ使ってる😅💦
    const runTime = performance.now() - preRunTime;
    const runTimeString = runTime.toString();
    if (runTime < 1000) {
      setLatestCommunicationTime(`0.${runTimeString.padStart(3, '0')}`);
    } else {
      setLatestCommunicationTime(runTimeString.replace(/([0-9]{3})$/, '.$1'));
    }

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
          boxShadow: '0 0.125rem 0.25rem rgba(0,0,0,.02),0 1px 0 rgba(0,0,0,.06)',
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
        <div>
          <div>{latestCommunicationTime}</div>
          <ul>
            {data.length ? data.map((customer) => <li key={customer.id}>{customer.name1}</li>) : <div>Hit 0</div>}
          </ul>
        </div>
      </section>
    </>
  );
}
