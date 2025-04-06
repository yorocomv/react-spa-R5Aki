import type { SubmitHandler } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router';

import Select from '@/components/ui/elements/Select';

import type { NoteForm, NotesTbRow } from '../../notes/notes.types';
import type { CustomersTbRow } from '../customers.types';

import { css } from '../../../../styled-system/css';
import { useRegisterNote } from '../../notes/components/hooks/useRegisterNote';
import { noteFormSchema } from '../../notes/notes.schemas';
import Button from './elements/Button';
import TextArea from './elements/TextArea';
import FormErrorMessage from './elementSwitchers/FormErrorMessage';
import FloatingDeleteButton from './FloatingDeleteButton';

export default function CustomerNoteForm({
  customer,
  notes,
}: {
  customer: CustomersTbRow;
  notes: NotesTbRow[];
}): JSX.Element {
  const notesLength = notes.length;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultValues: NoteForm = {
    rank: notesLength + 1,
    body: '',
  };
  const currentRank = searchParams.get('rank') ?? 0;
  let optionsLength = notesLength + 1;
  if (currentRank !== 0) {
    const iNum = notes.findIndex(note => note.rank === Number.parseInt(currentRank, 10));
    if (iNum !== -1) {
      defaultValues.rank = iNum + 1;
      defaultValues.body = notes[iNum].body;
      optionsLength = notesLength;
    }
  }
  const { registerNote } = useRegisterNote(customer.id);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteForm>({
    mode: 'all',
    defaultValues,
    resolver: zodResolver(noteFormSchema),
  });

  // https://zenn.dev/catnose99/scraps/30c623ba72d6b5
  // コンポーネント初回マウント時には setValue() しない
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
    else {
      setValue('rank', defaultValues.rank);
      setValue('body', defaultValues.body);
    }
  }, [defaultValues.body, defaultValues.rank, setValue]);

  const onSubmit: SubmitHandler<NoteForm> = async (values): Promise<void> => {
    try {
      let response: { customer: CustomersTbRow; note: NotesTbRow };
      if (currentRank) {
        response = await registerNote({ customerId: customer.id, mode: Number.parseInt(currentRank, 10), values });
      }
      else {
        response = await registerNote({ customerId: customer.id, mode: 'add', values });
      }
      // https://github.com/remix-run/react-router/issues/12348
      Promise.resolve(navigate(`/customers/${response.customer.id}/decide`, { state: response.customer })).catch(
        (err: string) => {
          throw new Error(err);
        },
      );
    }
    catch (err: unknown) {
      console.error('💥💥💥 ', err, ' 💀💀💀');
    }
  };
  // https://github.com/orgs/react-hook-form/discussions/8020#discussioncomment-2584580
  function onPromise<T>(promise: (event: React.SyntheticEvent) => Promise<T>) {
    return (event: React.SyntheticEvent) => {
      if (promise) {
        promise(event).catch((error) => {
          console.error('Unexpected error', error);
        });
      }
    };
  }
  const handleReset: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setValue('rank', defaultValues.rank);
    setValue('body', defaultValues.body);
  };

  return (
    <>
      <form
        onSubmit={onPromise(handleSubmit(onSubmit))}
        autoComplete="off"
        className={css({
          '&> label': {
            pl: '0.125rem',
          },
        })}
      >
        <label>
          表示順
          <Select {...register('rank')}>
            {notes.length === 0
              ? (
                  <option value="1">1</option>
                )
              : (
                  (() => {
                    const options = [];
                    for (let i = 1; i <= optionsLength; i += 1) {
                      options.push(
                        <option value={i} key={i}>
                          {i}
                        </option>,
                      );
                    }
                    return options;
                  })()
                )}
          </Select>
        </label>
        <FormErrorMessage message={errors.rank?.message} />
        <label htmlFor="body">
          留意事項
          <TextArea
            {...register('body')}
            id="body"
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            className={css({
              w: '34.5rem',
              h: '8lh',
            })}
          />
        </label>
        <FormErrorMessage message={errors.body?.message} />
        <div
          className={css({
            mt: 4,
          })}
        >
          <Button disabled={isSubmitting} type="submit">
            {currentRank ? '修正' : '登録'}
          </Button>
          <Button
            onClick={handleReset}
            disabled={isSubmitting}
            variant="redo"
            className={css({
              ml: 1,
            })}
          >
            {currentRank ? 'リセット' : 'クリア'}
          </Button>
        </div>
      </form>
      {currentRank ? <FloatingDeleteButton customer={customer} label={`メモ ${defaultValues.rank} を削除`} /> : null}
    </>
  );
}
