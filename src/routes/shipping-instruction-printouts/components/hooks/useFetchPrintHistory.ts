import type { CalendarDate } from '@internationalized/date';
import type { AxiosResponse } from 'axios';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import axiosInst from '@/util/axiosInstance';

import type { ShippingInstructionHistoryTbRow } from '../../shippingInstructionPrintouts.types';

export interface useFetchPrintHistoryStates {
  category: 'delivery_date' | 'shipping_date' | 'printed_at';
  non_fk_customer_id: number | null;
  dateA: CalendarDate | null;
  dateB: CalendarDate | null;
  _lastOpenedPrintHistory?: string | null;
}

export function useFetchPrintHistory() {
  // 最後に確認や編集した履歴の printed_at を管理
  // 直接データ取得とは関係ないがセットで利用されるのでここで定義したほうが便利
  const [_lastOpenedPrintHistory, set_LastOpenedPrintHistory] = useState<useFetchPrintHistoryStates['_lastOpenedPrintHistory']>(null);

  const [customerId, setCustomerId] = useState<useFetchPrintHistoryStates['non_fk_customer_id']>(null);
  const [selectCategory, setSelectCategory] = useState<useFetchPrintHistoryStates['category']>('printed_at');

  // UI表示用の即時ステート
  const [dateA, setDateA] = useState<useFetchPrintHistoryStates['dateA']>(null);
  const [dateB, setDateB] = useState<useFetchPrintHistoryStates['dateB']>(null);

  // キーボード入力を考慮したデータ取得用のデバウンス（遅延）ステート
  const [debouncedDateA, setDebouncedDateA] = useState<useFetchPrintHistoryStates['dateA']>(dateA);
  const [debouncedDateB, setDebouncedDateB] = useState<useFetchPrintHistoryStates['dateB']>(dateB);

  // マウス操作用、即時更新用関数（カレンダー選択用）
  // UI上の日付(dateA)と、クエリ用日付(debouncedDateA)を同時に更新することで、待機時間をスキップします
  const setDateAImmediate = (date: CalendarDate | null) => {
    setDateA(date);
    setDebouncedDateA(date);
  };
  const setDateBImmediate = (date: CalendarDate | null) => {
    setDateB(date);
    setDebouncedDateB(date);
  };

  // dateA, dateB が変更されたら、一定ミリ秒待ってから debounced 側を更新する
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedDateA(dateA);
      setDebouncedDateB(dateB);
    }, 2500); // 遅延時間（ミリ秒）

    return () => {
      clearTimeout(timer);
    };
  }, [dateA, dateB]);

  const fetchPrintHistoryFn = async () => {
    const dateAString = debouncedDateA?.toString();
    const dateBString = debouncedDateB?.toString();
    // React Aria の CalendarDate 型は
    // （特にパースで文字列から作られた場合）リロードで壊れることがある
    if (dateAString === '[object Object]' || dateBString === '[object Object]') {
      return [];
    }
    // 印刷日時が選ばれたらカスタマーIDを強制的に null
    if (selectCategory === 'printed_at') {
      setCustomerId(null);
    }

    if (debouncedDateA && debouncedDateB) {
      const diff = debouncedDateB.toDate('Asia/Tokyo').getTime() - debouncedDateA.toDate('Asia/Tokyo').getTime();
      const rangeDays = customerId !== null && selectCategory !== 'printed_at' ? 731 : 31;
      if (Math.abs(diff) > rangeDays * 24 * 60 * 60 * 1000) {
        return [];
      }
    }
    const result: void | AxiosResponse<ShippingInstructionHistoryTbRow[]> = await axiosInst
      .get(
        `/shipping-instruction-printouts?category=${selectCategory}${
          debouncedDateA ? `&dateA=${dateAString}` : ''
        }${
          debouncedDateB ? `&dateB=${dateBString}` : ''
        }${
          customerId !== null && selectCategory !== 'printed_at' ? `&non_fk_customer_id=${customerId}` : ''
        }`,
      )
      .catch((err: string) => {
        console.error(
          `💥💥💥 /shipping-instruction-printouts?category=${selectCategory}${
            debouncedDateA ? `&dateA=${dateAString}` : ''
          }${
            debouncedDateB ? `&dateB=${dateBString}` : ''
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
    // queryKey には即時反映の dateA/B ではなく、デバウンス済みの変数を使用する
    queryKey: ['shipping-instruction-printouts', customerId, selectCategory, debouncedDateA, debouncedDateB],
    queryFn: fetchPrintHistoryFn,
  });

  // UI側には即時更新用の setDateA / setDateB を渡す
  return { customerId, setCustomerId, selectCategory, setSelectCategory, dateA, setDateA, setDateAImmediate, dateB, setDateB, setDateBImmediate, printHistories, _lastOpenedPrintHistory, set_LastOpenedPrintHistory };
}
