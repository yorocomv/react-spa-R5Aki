import type { AxiosResponse } from 'axios';

import { useSuspenseQuery } from '@tanstack/react-query';

import axiosInst from '@/util/axiosInstance';

import type { NotesTbRow } from '../../../notes/notes.types';

export function useFetchNotes(customerId: number) {
  const { data: notes } = useSuspenseQuery({
    queryKey: ['/notes', customerId],
    queryFn: async () => {
      const result: AxiosResponse<NotesTbRow[]> = await axiosInst.get(`/notes/${customerId}`).catch((err: string) => {
        console.error(`💥💥💥 /notes/${customerId} からのエラーをキャッチ❢ ${err} 💀💀💀`);
        return Promise.reject(new Error(err));
      });

      return result.data;
    },
  });

  return { notes };
}
