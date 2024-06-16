import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import axiosInstance from '../../../../util/axios-instance';

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
