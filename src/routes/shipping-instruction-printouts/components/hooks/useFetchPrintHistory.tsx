import type { CalendarDate } from '@internationalized/date';
import type { AxiosResponse } from 'axios';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';

import axiosInst from '@/util/axios-instance';

import type {
  FindShippingInstructionsQueryCategory,
  ShippingInstructionPrintHistoryTbRow,
} from '../../shippingInstructionPrintouts.types';

export function useFetchPrintHistory() {
  const [selectCategory, setSelectCategory] = useState<FindShippingInstructionsQueryCategory>('printed_at');
  const [dateA, setDateA] = useState<CalendarDate | null>(null);
  const [dateB, setDateB] = useState<CalendarDate | null>(null);

  const fetchPrintHistoryFn = async () => {
    if (dateA && dateB) {
      const diff = dateB.toDate('Asia/Tokyo').getTime() - dateA.toDate('Asia/Tokyo').getTime();
      // ７日間を超える問い合わせはしない
      if (Math.abs(diff) > 7 * 24 * 60 * 60 * 1000) {
        return [];
      }
    }
    const result: void | AxiosResponse<ShippingInstructionPrintHistoryTbRow[]> = await axiosInst
      .get(
        `/shipping-instruction-printouts?category=${selectCategory}${dateA ? `&dateA=${dateA.toString()}` : ''}${
          dateB ? `&dateB=${dateB.toString()}` : ''
        }`,
      )
      .catch((err: string) => {
        console.error(
          `💥💥💥 /shipping-instruction-printouts?category=${selectCategory}${
            dateA ? `&dateA=${dateA.toString()}` : ''
          }${dateB ? `&dateB=${dateB.toString()}` : ''} からのエラーをキャッチ❢ ${err} 💀💀💀`,
        );
        return Promise.reject(new Error(err));
      });

    if (!result)
      return [];

    return result.data;
  };
  const { data: printHistories } = useSuspenseQuery({
    queryKey: ['shipping-instruction-printouts', selectCategory, dateA, dateB],
    queryFn: fetchPrintHistoryFn,
  });

  return { selectCategory, setSelectCategory, dateA, setDateA, dateB, setDateB, printHistories };
}
