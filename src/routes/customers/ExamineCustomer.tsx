import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { useSuspenseQuery } from '@tanstack/react-query';
import { CustomersTbRow } from './customers.types';
import axiosInst from '../../util/axios-instance';

export default function ExamineCustomer() {
  const navigate = useNavigate();
  const customer = useLocation().state as CustomersTbRow;

  if (!customer) throw new Error('不正なルートでのアクセスを検知しました❢');

  const fetchPossiblyOverlapCustomersQueryFn = async () => {
    const result: void | AxiosResponse<CustomersTbRow[]> = await axiosInst
      .get(
        `/customers/${customer.id}/checkingOverlap?name1=${customer.name1}&name2=${customer.name2}&address_sha1=${customer.address_sha1}&nja_pref=${customer.nja_pref}&searched_name=${customer.searched_name}`,
      )
      .catch((err: string) => {
        console.error(`💥💥💥 /customers/${customer.id}/checkingOverlap からのエラーをキャッチ❢ ${err} 💀💀💀`);
        return Promise.reject(new Error(err));
      });

    if (!result) throw new Error('不正なルートでのアクセスを検知しました❢');

    return result.data;
  };
  const { data: customers } = useSuspenseQuery({
    queryKey: [`/customers/${customer.id}/checkingOverlap`],
    queryFn: fetchPossiblyOverlapCustomersQueryFn,
  });

  useEffect(() => {
    // 遷移先からこのページにブラウザバックできなくなるが仕様とする❢
    if (customers.length >= 2) {
      navigate('./checking-overlap', { state: { id: customer.id, customers } });
    } else {
      navigate('./decide', { state: customer });
    }
  }, [customer, customers, navigate]);

  return <h1>意図せずこのページが見えていますか？</h1>;
}
