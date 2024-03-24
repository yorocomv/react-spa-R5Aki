import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import axiosInstance from '../../../../util/axios-instance';
import { CustomerForm, CustomersTbRow } from '../../customers.types';

interface UseRegisterCustomerProps {
  mode: 'create' | number;
  values: CustomerForm;
}

const registerCustomerMutationFn = async ({ mode, values }: UseRegisterCustomerProps): Promise<CustomersTbRow> => {
  let response: AxiosResponse<CustomersTbRow>;
  if (mode === 'create') {
    response = await axiosInstance.post('/customers', values).catch((err: string) => {
      console.error(`💥💥💥 /customers からのエラーをキャッチ❢ ${err} 💀💀💀`);
      return Promise.reject(new Error(err));
    });
  } else {
    response = await axiosInstance.put(`/customers/${mode}`, values).catch((err: string) => {
      console.error(`💥💥💥 /customers からのエラーをキャッチ❢ ${err} 💀💀💀`);
      return Promise.reject(new Error(err));
    });
  }
  return response.data;
};

// eslint-disable-next-line import/prefer-default-export
export const useRegisterCustomer = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: registerCustomer } = useMutation({
    mutationFn: registerCustomerMutationFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['customers?search_name'] }),
  });

  return { registerCustomer };
};
