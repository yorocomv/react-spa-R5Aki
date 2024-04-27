import { css } from '../../../../styled-system/css';
import { useFetchNotes } from './hooks/useFetchNotes';

export default function CustomerNotesList({ customerId }: { customerId: number }): JSX.Element {
  const { notes } = useFetchNotes(customerId);

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
          '& li:last-child': {
            paddingBottom: 0,
            marginBottom: '1.25rem',
          },
        })}
      >
        {notes.length ? (
          notes.map((note) => (
            <li
              key={note.rank}
              className={css({
                pos: 'relative',
                p: '0 0 1.25rem 3.125rem',
                m: 0,
                _before: {
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
                _after: {
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
              })}
            >
              {note.body}
            </li>
          ))
        ) : (
          <li>この顧客のメモはまだありません</li>
        )}
      </ul>
    </section>
  );
}
