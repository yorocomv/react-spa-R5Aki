import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import axiosInstance from '../../../../util/axios-instance';

/**
 * The `useDeleteNote` function is a custom hook in TypeScript that handles deleting a note associated
 * with a customer ID and invalidating queries related to notes upon successful deletion.
 * @param {number} customerId - The `customerId` parameter in the `useDeleteNote` function represents
 * the unique identifier of a customer whose note is being deleted.
 * @returns The `useDeleteNote` custom hook is being returned, which contains a `deleteNote` function
 * that can be used to delete a note associated with a specific customer ID.
 *
 *** 呼び出し元で引数 customerId に 0 を渡すと、deleteCustomer はエラーを返す
 */
// eslint-disable-next-line import/prefer-default-export
export const useDeleteNote = (customerId: number) => {
  const queryClient = useQueryClient();
  const { mutateAsync: deleteNote } = useMutation({
    mutationFn: async (rank: number) => {
      if (customerId === 0) {
        throw new Error('Customer is Not Found !!');
      }
      const response: AxiosResponse<{ command: string; rowCount: number }> = await axiosInstance
        .delete(`/notes/${customerId}/rank/${rank}`)
        .catch((err: string) => {
          console.error(`💥💥💥 /notes/${customerId}/rank/${rank} からのエラーをキャッチ❢ ${err} 💀💀💀`);
          return Promise.reject(new Error(err));
        });
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['/notes', customerId] }),
  });

  return { deleteNote };
};
