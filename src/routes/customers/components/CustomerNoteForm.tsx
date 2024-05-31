import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { css } from '../../../../styled-system/css';
import Select from './elements/Select';
import TextArea from './elements/TextArea';
import { NoteForm, NotesTbRow } from '../../notes/notes.types';
import { noteFormSchema } from '../../notes/notes.schemas';

export default function CustomerNoteForm({ notes }: { notes: NotesTbRow[] }): JSX.Element {
  const [searchParams] = useSearchParams();
  const currentRank = searchParams.get('rank') ?? 0;
  const defaultValues: NoteForm = {
    rank: notes.length + 1,
    body: '',
  };
  if (currentRank !== 0) {
    const iNum = notes.findIndex((note) => note.rank === parseInt(currentRank, 10));
    if (iNum !== -1) {
      defaultValues.rank = iNum + 1;
      defaultValues.body = notes[iNum].body;
    }
  }
  const {
    register,
    // handleSubmit,
    // reset,
    // formState: { errors, isSubmitting },
  } = useForm<NoteForm>({
    mode: 'all',
    defaultValues,
    resolver: zodResolver(noteFormSchema),
  });

  return (
    <form
      autoComplete="off"
      className={css({
        '&> label': {
          pl: '0.125rem',
        },
      })}
    >
      <label>
        表示順
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Select {...register('rank')}>
          {notes.length === 0 ? (
            <option value="1">1</option>
          ) : (
            (() => {
              const options = [];
              for (let i = 1; i <= notes.length + 1; i += 1) {
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
      <label htmlFor="customerNote">
        留意事項
        <TextArea
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('body')}
          name="customerNote"
          id="customerNote"
          className={css({
            w: '34.5rem',
            h: '8lh',
          })}
        />
      </label>
    </form>
  );
}
