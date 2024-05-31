import { Link } from 'react-router-dom';
import { css } from '../../../../styled-system/css';
import { SystemStyleObject } from '../../../../styled-system/types';
import { NotesTbRow } from '../../notes/notes.types';
import { CustomersTbRow } from '../customers.types';

export default function ListOfSummaryNotesAboutCustomer({
  customer,
  notes,
  mergeStyles = undefined,
}: {
  customer: CustomersTbRow;
  notes: NotesTbRow[];
  mergeStyles?: SystemStyleObject;
}): JSX.Element {
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
        notes.map((note) => (
          <Link
            key={note.rank}
            reloadDocument
            to={`/customers/${customer.id}/take-a-note?rank=${note.rank}`}
            relative="path"
            state={customer}
          >
            <li>{note.body.length < strLen ? note.body : `${note.body.slice(0, strLen)} ...`}</li>
          </Link>
        ))
      ) : (
        <li>この顧客のメモはまだありません</li>
      )}
    </ol>
  );
}
