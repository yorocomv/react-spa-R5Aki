import axiosInstance from '@/util/axios-instance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const useDeletePrintHistory = ({ delivery_date, printed_at }: { delivery_date: string; printed_at: string }) => {
  const queryClient = useQueryClient();
  const { mutateAsync: deletePrintHistory } = useMutation({
    mutationFn: async () => {
      const response: AxiosResponse<{ command: string; rowCount: number }> = await axiosInstance
        .delete(
          `/shipping-instruction-printouts?delivery_date=${delivery_date}&printed_at=${encodeURIComponent(printed_at)}`,
        )
        .catch((err: string) => {
          console.error(
            `💥💥💥 /shipping-instruction-printouts?delivery_date=${delivery_date}&printed_at=${printed_at} からのエラーをキャッチ❢ ${err} 💀💀💀`,
          );
          return Promise.reject(new Error(err));
        });
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['shipping-instruction-printouts'] }),
  });

  return { deletePrintHistory };
};
