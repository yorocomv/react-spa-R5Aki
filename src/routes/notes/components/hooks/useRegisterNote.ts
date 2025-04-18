import type { AxiosResponse } from 'axios';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import axiosInstance from '@/util/axiosInstance';

import type { CustomersTbRow } from '../../../customers/customers.types';
import type { NoteForm, NotesTbRow } from '../../notes.types';

interface UseRegisterNoteProps {
  customerId: number;
  mode: 'add' | number;
  values: NoteForm;
}
interface UseRegisterNoteResponse {
  customer: CustomersTbRow;
  note: NotesTbRow;
}

async function registerNoteMutationFn({
  customerId,
  mode,
  values,
}: UseRegisterNoteProps): Promise<UseRegisterNoteResponse> {
  let response: AxiosResponse<UseRegisterNoteResponse>;
  if (mode === 'add') {
    response = await axiosInstance
      .post(`/notes/${customerId}`, { customer_id: customerId, ...values })
      .catch((err: string) => {
        console.error(`💥💥💥 /notes/${customerId} からのエラーをキャッチ❢ ${err} 💀💀💀`);
        return Promise.reject(new Error(err));
      });
  }
  else {
    response = await axiosInstance
      .put(`/notes/${customerId}/rank/${mode}`, { customer_id: customerId, ...values })
      .catch((err: string) => {
        console.error(`💥💥💥 /notes/${customerId}/rank/${mode} からのエラーをキャッチ❢ ${err} 💀💀💀`);
        return Promise.reject(new Error(err));
      });
  }
  return response.data;
}

export function useRegisterNote(customerId: number) {
  const queryClient = useQueryClient();
  const { mutateAsync: registerNote } = useMutation({
    mutationFn: registerNoteMutationFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['/notes', customerId] }),
  });

  return { registerNote };
}
