import type { AxiosResponse } from 'axios';

import { useMutation } from '@tanstack/react-query';

import type { CustomersTbRow } from '../../customers.types';

import axiosInstance from '../../../../util/axios-instance';

interface UseCreateCustomerTsv {
  isSuccess: boolean;
  message: string;
}

export function useCreateCustomerTsv() {
  const { mutateAsync: createCustomerTsv } = useMutation({
    mutationFn: async (sourceOfBody: CustomersTbRow) => {
      const response: AxiosResponse<UseCreateCustomerTsv> = await axiosInstance
        .post('/customers/output', sourceOfBody)
        .catch((err: string) => {
          console.error(`💥💥💥 /customers/output からのエラーをキャッチ❢ ${err} 💀💀💀`);
          return Promise.reject(new Error(err));
        });
      return response.data;
    },
  });

  return { createCustomerTsv };
}
