import { useSearchParams } from 'react-router-dom';
import { TbArrowBigLeftLinesFilled } from 'react-icons/tb';
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
  const [searchParams, setSearchParams] = useSearchParams();
  const currentRank = searchParams.get('rank') ?? '0';
  const strLen = 30;
  const olStyles = css.raw({
    listStylePosition: 'inside',
    listStyleType: 'decimal',
    fontSize: 'sm',
    fontWeight: 'bold',
    color: 'fuchsia.700',
    textShadow: '-1px 1px 0 #fff',
    w: 'fit-content',
    '& li:nth-child(odd)': {
      color: 'fuchsia.700',
    },
    '& li:nth-child(even)': {
      color: 'fuchsia.950',
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
            {note.rank === parseInt(currentRank, 10) ? (
              <>
                <TbArrowBigLeftLinesFilled className={css({ display: 'inline-block' })} />
                <span>編集中</span>
              </>
            ) : null}
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
