import { useSearchParams } from 'react-router-dom';
import { css } from '../../../../styled-system/css';
import { SystemStyleObject } from '../../../../styled-system/types';
import { NotesTbRow } from '../../notes/notes.types';
import { CustomersTbRow } from '../customers.types';

export default function ListOfSummaryNotesAboutCustomer({
  notes,
  customer,
  mergeStyles = undefined,
}: {
  notes: NotesTbRow[];
  customer: CustomersTbRow;
  mergeStyles?: SystemStyleObject;
}): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
  const [_, setSearchParams] = useSearchParams();
  const strLen = 30;
  const olStyles = css.raw({
    listStylePosition: 'inside',
    listStyleType: 'decimal',
    fontSize: 'sm',
    fontWeight: 'bold',
    color: 'fuchsia.700',
    textShadow: '-1px 1px 0 rgba(255, 255, 255, 0.8)',
    w: 'fit-content',
    '& li:nth-child(odd)': {
      color: 'fuchsia.700',
    },
    '& li:nth-child(even)': {
      color: 'fuchsia.900',
    },
  });

  return (
    <ol className={css(olStyles, mergeStyles)}>
      {notes.length ? (
        notes.map((note, i) => (
          <li key={note.rank}>
            <span
              onClick={() => setSearchParams({ rank: note.rank.toString() }, { state: { ...customer } })}
              onKeyDown={() => setSearchParams({ rank: note.rank.toString() }, { state: { ...customer } })}
              role="button"
              tabIndex={i}
              className={css({
                cursor: 'pointer',
              })}
            >
              {note.body.length < strLen ? note.body : `${note.body.slice(0, strLen)} ...`}
            </span>
          </li>
        ))
      ) : (
        <li
          className={css({
            listStyleType: 'none',
          })}
        >
          この顧客のメモはまだありません
        </li>
      )}
    </ol>
  );
}
