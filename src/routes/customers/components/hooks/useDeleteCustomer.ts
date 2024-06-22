import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import axiosInstance from '../../../../util/axios-instance';

/**
 * The useDeleteCustomer function is a custom hook in TypeScript that handles deleting a customer by
 * making a DELETE request to the server and invalidating the customers query cache upon success.
 * @param {number} customerId - The `useDeleteCustomer` function you provided is a custom hook that
 * handles deleting a customer based on the `customerId` parameter passed to it. The function uses
 * React Query's `useQueryClient` and `useMutation` hooks to perform the deletion operation.
 * @returns The `useDeleteCustomer` hook is returning an object with a `deleteCustomer` function
 * inside. This function is responsible for deleting a customer with the specified `customerId`.
 *
 *** 呼び出し元で引数 customerId に 0 を渡すと、deleteCustomer はエラーを返す
 */
// eslint-disable-next-line import/prefer-default-export
export const useDeleteCustomer = (customerId: number) => {
  const queryClient = useQueryClient();
  const { mutateAsync: deleteCustomer } = useMutation({
    mutationFn: async () => {
      if (customerId === 0) {
        throw new Error('Customer is Not Found !!');
      }
      const response: AxiosResponse<{ command: string; rowCount: number }> = await axiosInstance
        .delete(`/customers/${customerId}`)
        .catch((err: string) => {
          console.error(`💥💥💥 /customers/${customerId} からのエラーをキャッチ❢ ${err} 💀💀💀`);
          return Promise.reject(new Error(err));
        });
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['customers?search_name'] }),
  });

  return { deleteCustomer };
};
