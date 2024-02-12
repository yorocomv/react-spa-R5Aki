import { useLocation } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { CustomersTbRow } from './customers.types';
import ChoiceCustomer from './components/ChoiceCustomer';
import PossiblyOverlapCustomers from './components/PossiblyOverlapCustomers';
import axiosInst from '../../util/axios-instance';

export default function ExamineCustomer() {
  const customer = useLocation().state as CustomersTbRow;
  const [isContinued, setIsContinued] = useState(false);

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

  if (customers.length >= 2 && !isContinued) {
    return <PossiblyOverlapCustomers id={customer.id} customers={customers} setIsContinued={setIsContinued} />;
  }

  return (
    <ChoiceCustomer
      tel={customer.tel}
      zip_code={customer.zip_code}
      address1={customer.address1}
      address2={customer.address2}
      address3={customer.address3}
      name1={customer.name1}
      name2={customer.name2}
      nja_city={customer.nja_city}
      invoice_type_id={customer.invoice_type_id}
      setIsContinued={setIsContinued}
    />
  );
}
