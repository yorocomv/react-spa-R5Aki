import DatePickerInput from '@/components/ui/DatePickerInput';
import PopoverCalendar from '@/components/ui/PopoverCalendar';
import { css } from 'styled-system/css';

export default function PrintHistoryList() {
  return (
    <main className={css({ fontSize: 'sm' })}>
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
          w: 'fit-content',
          maxW: '99vw',
          marginInline: 'auto',
          overflowX: 'scroll',
          scrollbar: 'hidden',
        })}
      >
        <div
          className={css({
            m: '0.5rem',
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
                bgColor: 'stone.100',
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
                  <th>印刷頁</th>
                  <th>得意先名</th>
                  <th>住所</th>
                  <th>帳合</th>
                  <th>ｵｰﾀﾞｰNo</th>
                  <th>出荷予定日</th>
                  <th>運送会社</th>
                  <th>口数</th>
                  <th>商品</th>
                </tr>
              </thead>
              <tbody className={css({ '& >tr': { bgColor: { _hover: 'amber.50' } } })}>
                <tr>
                  <td>2025-02-04</td>
                  <td>AM 必着</td>
                  <td>2025-02-03 11:11:11.0000</td>
                  <td>1/2</td>
                  <td>令和株式会社</td>
                  <td>東京都千代田区</td>
                  <td>帝国商事</td>
                  <td>0123-456-789</td>
                  <td>2025-02-04</td>
                  <td>ヤマト</td>
                  <td>3</td>
                  <td>水: 2ケース\nパックご飯: 1ケース</td>
                </tr>
                <tr className={css({ bgColor: 'slate.200' })}>
                  <td>2025-02-04</td>
                  <td>AM 必着</td>
                  <td>2025-02-03 11:11:11.0000</td>
                  <td>1/2</td>
                  <td>令和株式会社</td>
                  <td>東京都千代田区</td>
                  <td>帝国商事</td>
                  <td>0123-456-789</td>
                  <td>2025-02-04</td>
                  <td>ヤマト</td>
                  <td>3</td>
                  <td>水: 2ケース\nパックご飯: 1ケース</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
