import type { AxiosResponse } from 'axios';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { CustomerForm, CustomersTbRow } from '../../customers.types';

import axiosInstance from '../../../../util/axios-instance';

interface UseRegisterCustomerProps {
  mode: 'create' | number;
  values: CustomerForm;
}

async function registerCustomerMutationFn({ mode, values }: UseRegisterCustomerProps): Promise<CustomersTbRow> {
  let response: AxiosResponse<CustomersTbRow>;
  if (mode === 'create') {
    response = await axiosInstance.post('/customers', values).catch((err: string) => {
      console.error(`💥💥💥 /customers からのエラーをキャッチ❢ ${err} 💀💀💀`);
      return Promise.reject(new Error(err));
    });
  }
  else {
    response = await axiosInstance.put(`/customers/${mode}`, values).catch((err: string) => {
      console.error(`💥💥💥 /customers/${mode} からのエラーをキャッチ❢ ${err} 💀💀💀`);
      return Promise.reject(new Error(err));
    });
  }
  return response.data;
}

export function useRegisterCustomer() {
  const queryClient = useQueryClient();
  const { mutateAsync: registerCustomer } = useMutation({
    mutationFn: registerCustomerMutationFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['customers?search_name'] }),
  });

  return { registerCustomer };
}
