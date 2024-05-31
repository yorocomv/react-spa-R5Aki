import { useSuspenseQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import axiosInst from '../../../../util/axios-instance';
import { NotesTbRow } from '../../../notes/notes.types';

// eslint-disable-next-line import/prefer-default-export
export const useFetchNotes = (customerId: number) => {
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
};
