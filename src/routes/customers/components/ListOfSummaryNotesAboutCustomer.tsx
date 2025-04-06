import { TbArrowBigLeftLinesFilled } from 'react-icons/tb';
import { useSearchParams } from 'react-router';

import type { SystemStyleObject } from '../../../../styled-system/types';
import type { NotesTbRow } from '../../notes/notes.types';
import type { CustomersTbRow } from '../customers.types';

import { css } from '../../../../styled-system/css';

export default function ListOfSummaryNotesAboutCustomer({
  notes,
  customer,
  mergeStyles = undefined,
}: {
  notes: NotesTbRow[];
  customer: CustomersTbRow;
  mergeStyles?: SystemStyleObject;
}): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentRank = searchParams.get('rank') ?? '0';
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
      {notes.length
        ? (
            notes.map((note, i) => (
              <li
                key={note.rank}
                className={css({
                  px: '0.5rem',
                  '&:has(em)': {
                    bgImage: 'linear-gradient(90deg, rgba(253, 224, 71, 0.7), rgba(254, 249, 195, 0.3))',
                    borderRadius: 'lg',
                  },
                })}
              >
                <div
                  className={css({
                    maxW: '88vw',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                  })}
                >
                  <span
                    onClick={() => setSearchParams({ rank: note.rank.toString() }, { state: { ...customer } })}
                    onKeyDown={() => setSearchParams({ rank: note.rank.toString() }, { state: { ...customer } })}
                    role="button"
                    tabIndex={i}
                    className={css({
                      cursor: 'pointer',
                      '@media(max-width: 1231px)': {
                        maxW: '73vw',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      },
                    })}
                  >
                    {note.body}
                  </span>
                  {note.rank === Number.parseInt(currentRank, 10)
                    ? (
                        <div
                          className={css({
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 1,
                          })}
                        >
                          <TbArrowBigLeftLinesFilled className={css({ display: 'inline-block', color: 'rose.600' })} />
                          <em className={css({ whiteSpace: 'nowrap', color: 'rose.500', textShadow: 'none' })}>編集中</em>
                        </div>
                      )
                    : null}
                </div>
              </li>
            ))
          )
        : (
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
