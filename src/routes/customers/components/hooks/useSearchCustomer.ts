import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { AxiosResponse } from 'axios';
import axiosInst from '@/util/axios-instance';
import { CustomersTbRow } from '../../customers.types';

// eslint-disable-next-line import/prefer-default-export
export const useSearchCustomer = () => {
  const [searchString, setSearchString] = useState('');
  const [searchTrigger, setSearchTrigger] = useState(false);
  const [latestCommunicationTime, setLatestCommunicationTime] = useState('0');

  const fetchSelectedCustomersQueryFn = async () => {
    // useSuspenseQuery には enabled オプションが無いので
    // コンポーネントのマウント時に queryFn が走ってしまう 👇一行はその対策
    if (searchString.length === 0) return [];
    // おまけ機能（データ取得時間計測⏱）の前処理🐢
    const preRunTime = performance.now();
    const result: void | AxiosResponse<CustomersTbRow[]> = await axiosInst
      .get(`/customers?search_name=${searchString}`)
      .catch((err: string) => {
        console.error(`💥💥💥 /customers?search_name=${searchString} からのエラーをキャッチ❢ ${err} 💀💀💀`);
        return Promise.reject(new Error(err));
      });

    // おまけ機能で useState() をひとつ使ってる😅💦
    const runTime = performance.now() - preRunTime;
    let runTimeString = runTime.toString();
    // 小数点付きミリ秒か否かを記録
    const index = runTimeString.indexOf('.');
    // ミリ秒の小数点（0.000.00秒）を取る
    runTimeString = runTimeString.replace('.', '');
    // 一秒未満
    if (runTime < 1000) {
      runTimeString = `0.${runTimeString.padStart(3, '0')}`;
      // 一秒以上かつ精度はミリ秒まで
    } else if (index === -1) {
      runTimeString = runTimeString.replace(/([0-9]{3})$/, '.$1');
      // 一秒以上かつ小数点付きミリ秒
    } else {
      const patternStr = `^([0-9]{${index - 3}})`;
      runTimeString = runTimeString.replace(new RegExp(patternStr), '$1.');
    }
    // 切り捨て
    const matches = runTimeString.match(/([0-9]+.[0-9]{3})[0-9]+/);
    setLatestCommunicationTime(matches ? matches[1] : runTimeString);

    if (!result) return [];

    return result.data;
  };
  const { data: customers } = useSuspenseQuery({
    queryKey: ['customers?search_name', searchTrigger],
    queryFn: fetchSelectedCustomersQueryFn,
  });

  return { searchString, setSearchString, searchTrigger, setSearchTrigger, latestCommunicationTime, customers };
};
