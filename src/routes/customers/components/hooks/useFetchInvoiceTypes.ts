import { useSuspenseQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import axiosInst from '../../../../util/axios-instance';
import InvoiceTypesIdAndName from '../../../invoice-types/invoiceTypes.types';

const fetchInvoiceTypesQueryFn = async () => {
  const result: AxiosResponse<InvoiceTypesIdAndName[]> = await axiosInst.get('/invoice-types').catch((err: string) => {
    console.error(`💥💥💥 /invoice-types からのエラーをキャッチ❢ ${err} 💀💀💀`);
    return Promise.reject(new Error(err));
  });

  return result.data;
};

// eslint-disable-next-line import/prefer-default-export
export const useFetchInvoiceTypes = () => {
  const { data: invoiceTypes } = useSuspenseQuery({
    queryKey: ['/invoice-types'],
    queryFn: fetchInvoiceTypesQueryFn,
  });

  return { invoiceTypes };
};
