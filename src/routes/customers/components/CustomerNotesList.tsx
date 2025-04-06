import { useState } from 'react';

import type { NotesTbRow } from '../../notes/notes.types';
import type { CustomersTbRow } from '../customers.types';

import { css } from '../../../../styled-system/css';
import { useFetchNotes } from './hooks/useFetchNotes';
import NoteInDialog from './NoteInDialog';

export default function CustomerNotesList({ customer }: { customer: CustomersTbRow }): JSX.Element {
  const { notes } = useFetchNotes(customer.id);
  const [selectedNote, setSelectedNote] = useState(-1);

  const dummy = {
    created_at: 'DUMMY',
    updated_at: 'DUMMY',
    customer_id: customer.id,
    rank: 88888888,
    body: ' ----- 以上 ----- ',
  };

  const endMarkerWithNotes: NotesTbRow[] = notes.length ? [...notes, dummy] : [];

  return (
    <section
      className={css({
        w: 'fit-content',
        mx: 'auto',
        px: '1rem',
      })}
    >
      <ul
        className={css({
          m: 0,
          listStyleType: 'none',
          '& li:nth-child(odd)': {
            color: 'emerald.200',
          },
          '& li:nth-child(odd)::before': {
            borderColor: 'emerald.600',
          },
          '& li:nth-child(odd)::after': {
            borderColor: 'emerald.600',
            bgColor: 'emerald.700',
          },
          '& li:nth-child(even)': {
            color: 'indigo.200',
          },
          '& li:nth-child(even)::before': {
            borderColor: 'indigo.500',
          },
          '& li:nth-child(even)::after': {
            borderColor: 'indigo.500',
            bgColor: 'indigo.700',
          },
          '& li:last-child': {
            paddingBottom: 0,
            marginBottom: '1.25rem',
          },
          '& li:last-child:has(> .DUMMY)': {
            color: 'pink.200',
          },
          '& li:last-child:has(> .DUMMY)::before': {
            borderColor: 'pink.500',
          },
          '& li:last-child:has(> .DUMMY)::after': {
            borderColor: 'pink.500',
            bgColor: 'pink.700',
          },
        })}
      >
        {endMarkerWithNotes.length
          ? (
              endMarkerWithNotes.map((note, i) => (
                <li
                  key={note.rank}
                  className={css({
                    pos: 'relative',
                    p: '0 0 0.75rem 2.75rem',
                    m: 0,
                    textShadow: '-1px 1px 0 rgba(0, 0, 0, 0.9)',
                    _before: {
                      pos: 'absolute',
                      top: '0.1rem',
                      left: '0.615rem',
                      // Before and After: Ensure you wrap the content value in double quotes
                      content: '""',
                      h: '100%',
                      w: 0,
                      borderStyle: 'solid',
                      borderWidth: '2px',
                      borderColor: 'lime.600',
                    },
                    _after: {
                      pos: 'absolute',
                      top: '0.1rem',
                      left: 0,
                      // Before and After: Ensure you wrap the content value in double quotes
                      content: '""',
                      borderStyle: 'solid',
                      borderWidth: '1px',
                      borderColor: 'lime.600',
                      borderRadius: '50%',
                      display: 'inline-block',
                      h: '1.5rem',
                      w: '1.5rem',
                      lineHeight: '1.5rem',
                      textAlign: 'center',
                      bgColor: 'lime.600',
                    },
                  })}
                >
                  {note.created_at !== 'DUMMY'
                    ? (
                        <>
                          <span
                            onClick={() => setSelectedNote(i)}
                            onKeyDown={() => setSelectedNote(i)}
                            role="button"
                            tabIndex={i}
                            className={css({
                              cursor: 'pointer',
                            })}
                          >
                            {note.body}
                          </span>
                          <NoteInDialog
                            currentPage={i + 1}
                            totalPages={endMarkerWithNotes.length - 1}
                            isOpen={selectedNote === i}
                            closeModal={setSelectedNote}
                            body={note.body}
                            currentRank={note.rank}
                            customer={customer}
                          />
                        </>
                      )
                    : (
                        <span className="DUMMY">{note.body}</span>
                      )}
                </li>
              ))
            )
          : (
              <li>この顧客のメモはまだありません</li>
            )}
      </ul>
    </section>
  );
}
