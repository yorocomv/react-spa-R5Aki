import DatePickerInput from '@/components/ui/DatePickerInput';
import PopoverCalendar from '@/components/ui/PopoverCalendar';
import { css } from 'styled-system/css';

export default function PrintHistoryList() {
  return (
    <main>
      <header
        className={css({
          pos: 'sticky',
          top: 0,
          zIndex: '1',
          backdropFilter: 'blur(6px)',
          px: 2,
          py: 2.5,
          boxShadow: '0 0.125rem 0.25rem rgba(0,0,0,.02),0 1px 0 rgba(0,0,0,.06)',
        })}
      >
        <nav
          className={css({
            display: 'grid',
            alignItems: 'center',
            gridTemplateColumns: '1fr auto 1fr',
          })}
        >
          <DatePickerInput>
            <PopoverCalendar />
          </DatePickerInput>
        </nav>
      </header>
      <section
        className={css({
          w: 'min(900px, 100% - 3rem)',
          marginInline: 'auto',
        })}
      >
        <div
          className={css({
            m: '0.5rem',
            bgColor: 'stone.100',
            border: '1px solid',
            borderRadius: 'lg',
            borderColor: 'stone.300',
            '& tr': {
              h: '2.75rem',
            },
            '& th, & td': {
              p: '0.75rem',
            },
          })}
        >
          <div className={css({ w: 'fit-content', minW: '100%' })}>
            <table
              className={css({
                w: '100%',
                textAlign: 'left',
                borderRadius: 'lg',
                borderCollapse: 'collapse',
                overflow: 'hidden',
                '& tr': { boxShadow: 'inset 0 -1px #d6d3d1' },
                '& tbody tr:last-child': { boxShadow: 'none' },
              })}
            >
              <thead className={css({ bgColor: 'stone.200', borderRadius: 'lg' })}>
                <tr>
                  <th>着日</th>
                  <th>時間指定</th>
                  <th>印刷日時</th>
                  <th>得意先名</th>
                </tr>
              </thead>
              <tbody className={css({ '& >tr': { bgColor: { _hover: 'amber.50' } } })}>
                <tr>
                  <td>2025-02-04</td>
                  <td>AM 必着</td>
                  <td>2025-02-03 11:11:11.0000</td>
                  <td>玉露園</td>
                </tr>
                <tr className={css({ bgColor: 'slate.200' })}>
                  <td>2025-02-04</td>
                  <td>AM 必着</td>
                  <td>2025-02-03 11:11:11.0000</td>
                  <td>玉露園</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
