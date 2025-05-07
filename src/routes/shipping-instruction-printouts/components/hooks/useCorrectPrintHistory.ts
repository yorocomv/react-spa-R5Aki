import type { AxiosResponse } from 'axios';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import axiosInstance from '@/util/axiosInstance';

import type { ShippingInstructionCorrection, ShippingInstructionHistoryTbRow } from '../../shippingInstructionPrintouts.types';

export function useCorrectPrintHistory({ delivery_date, printed_at }: { delivery_date: string; printed_at: string }) {
  const queryClient = useQueryClient();
  const { mutateAsync: correctPrintHistory } = useMutation({
    mutationFn: async (values: ShippingInstructionCorrection) => {
      const response: AxiosResponse<ShippingInstructionHistoryTbRow> = await axiosInstance.put(`/shipping-instruction-printouts?delivery_date=${delivery_date}&printed_at=${encodeURIComponent(printed_at)}`, values)
        .catch((err: string) => {
          console.error(
            `💥💥💥 /shipping-instruction-printouts?delivery_date=${delivery_date}&printed_at=${printed_at} からのエラーをキャッチ❢ ${err} 💀💀💀`,
          );
          return Promise.reject(new Error(err));
        });
      return response.data; ;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['shipping-instruction-printouts'] }),
  });

  return { correctPrintHistory };
}
