import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import axiosInstance from '../../../../util/axios-instance';
import { CustomersTbRow } from '../../customers.types';

interface UseCreateCustomerTsv {
  isSuccess: boolean;
  message: string;
}

// eslint-disable-next-line import/prefer-default-export
export const useCreateCustomerTsv = () => {
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
};
