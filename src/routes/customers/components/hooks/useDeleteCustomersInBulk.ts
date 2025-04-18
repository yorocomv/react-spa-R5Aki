import type { AxiosResponse } from 'axios';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import axiosInstance from '@/util/axiosInstance';

export function useDeleteCustomersInBulk() {
  const [deleteFlaggedNumbers, setDeleteFlaggedNumbers] = useState<number[]>([]);

  const queryClient = useQueryClient();
  const { mutateAsync: deleteCustomersInBulk } = useMutation({
    // customersIds には deleteFlaggedNumbers のコピーを指定
    mutationFn: async (customersIds: number[]) => {
      if (customersIds.length === 0) {
        throw new Error('Customer is Not Found !!');
      }
      const response: AxiosResponse<{ command: string; rowCount: number }> = await axiosInstance
        .post('/customers/delete', { deleteIds: customersIds })
        .catch((err: string) => {
          console.error(`💥💥💥 /customers/delete からのエラーをキャッチ❢ ${err} 💀💀💀`);
          return Promise.reject(new Error(err));
        });
      return response.data;
    },
    onSuccess: () => queryClient.removeQueries({ queryKey: ['/customers/checkingOverlap'] }),
  });

  return { deleteFlaggedNumbers, setDeleteFlaggedNumbers, deleteCustomersInBulk };
}
