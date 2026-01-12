import type { CalendarDate } from '@internationalized/date';
import type { AxiosResponse } from 'axios';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';

import axiosInst from '@/util/axiosInstance';

import type { ShippingInstructionHistoryTbRow } from '../../shippingInstructionPrintouts.types';

export interface useFetchPrintHistoryStates {
  category: 'delivery_date' | 'shipping_date' | 'printed_at';
  non_fk_customer_id: number | null;
  dateA: CalendarDate | null;
  dateB: CalendarDate | null;
}

export function useFetchPrintHistory() {
  const [customerId, setCustomerId] = useState<useFetchPrintHistoryStates['non_fk_customer_id']>(null);
  const [selectCategory, setSelectCategory] = useState<useFetchPrintHistoryStates['category']>('printed_at');
  const [dateA, setDateA] = useState<useFetchPrintHistoryStates['dateA']>(null);
  const [dateB, setDateB] = useState<useFetchPrintHistoryStates['dateB']>(null);

  const fetchPrintHistoryFn = async () => {
    // 印刷日時が選ばれたらカスタマーIDを強制的に null
    if (selectCategory === 'printed_at') {
      setCustomerId(null);
    }
    if (dateA && dateB) {
      const diff = dateB.toDate('Asia/Tokyo').getTime() - dateA.toDate('Asia/Tokyo').getTime();
      const rangeDays = customerId !== null && selectCategory !== 'printed_at' ? 731 : 31;
      if (Math.abs(diff) > rangeDays * 24 * 60 * 60 * 1000) {
        return [];
      }
    }
    const result: void | AxiosResponse<ShippingInstructionHistoryTbRow[]> = await axiosInst
      .get(
        `/shipping-instruction-printouts?category=${selectCategory}${
          dateA ? `&dateA=${dateA.toString()}` : ''
        }${
          dateB ? `&dateB=${dateB.toString()}` : ''
        }${
          customerId !== null && selectCategory !== 'printed_at' ? `&non_fk_customer_id=${customerId}` : ''
        }`,
      )
      .catch((err: string) => {
        console.error(
          `💥💥💥 /shipping-instruction-printouts?category=${selectCategory}${
            dateA ? `&dateA=${dateA.toString()}` : ''
          }${
            dateB ? `&dateB=${dateB.toString()}` : ''
          }${
            customerId !== null && selectCategory !== 'printed_at' ? `&non_fk_customer_id=${customerId}` : ''
          } からのエラーをキャッチ❢ ${err} 💀💀💀`,
        );
        return Promise.reject(new Error(err));
      });

    if (!result)
      return [];

    return result.data;
  };
  const { data: printHistories } = useSuspenseQuery({
    queryKey: ['shipping-instruction-printouts', customerId, selectCategory, dateA, dateB],
    queryFn: fetchPrintHistoryFn,
  });

  return { customerId, setCustomerId, selectCategory, setSelectCategory, dateA, setDateA, dateB, setDateB, printHistories };
}
