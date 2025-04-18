import type { AxiosResponse } from 'axios';

import { useSuspenseQuery } from '@tanstack/react-query';

import axiosInst from '@/util/axiosInstance';

import type InvoiceTypesIdAndName from '../../../invoice-types/invoiceTypes.types';

async function fetchInvoiceTypesQueryFn() {
  const result: AxiosResponse<InvoiceTypesIdAndName[]> = await axiosInst.get('/invoice-types').catch((err: string) => {
    console.error(`💥💥💥 /invoice-types からのエラーをキャッチ❢ ${err} 💀💀💀`);
    return Promise.reject(new Error(err));
  });

  return result.data;
}

export function useFetchInvoiceTypes() {
  const { data: invoiceTypes } = useSuspenseQuery({
    queryKey: ['/invoice-types'],
    queryFn: fetchInvoiceTypesQueryFn,
  });

  return { invoiceTypes };
}
