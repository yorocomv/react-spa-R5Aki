import DatePickerInput from '@/components/ui/DatePickerInput';
import PopoverCalendar from '@/components/ui/PopoverCalendar';
import { today } from '@internationalized/date';
import { css } from 'styled-system/css';
import Select from '@/components/ui/elements/Select';
import { LuArrowLeftRight } from 'react-icons/lu';
import SpotField from '@/components/ui/SpotField';
import { useState } from 'react';

export default function PrintHistoryList() {
  const [filterString, setFilterString] = useState('');

  const todayDate = today('Asia/Tokyo');

  return (
    <div className={css({ fontSize: 'sm' })}>
      <header
        className={css({
          pos: 'sticky',
          top: 0,
          zIndex: '1',
          display: 'grid',
          alignItems: 'center',
          gridTemplateColumns: '1fr 1fr',
          backdropFilter: 'blur(6px)',
          px: 2,
          py: 2.5,
          boxShadow: '0 0.125rem 0.25rem rgba(0,0,0,.02),0 1px 0 rgba(0,0,0,.06)',
        })}
      >
        <nav
          className={css({
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '0.5rem',
          })}
        >
          <Select className={css({ h: '2.175rem', w: 'fit-content' })}>
            <option value="1">印刷日時</option>
            <option value="2">着日</option>
            <option value="3">出荷予定日</option>
          </Select>
          <DatePickerInput todayDate={todayDate}>
            <PopoverCalendar todayDate={todayDate} />
          </DatePickerInput>
          <LuArrowLeftRight size="1.3rem" />
          <DatePickerInput>
            <PopoverCalendar todayDate={todayDate} />
          </DatePickerInput>
        </nav>
        <section
          className={css({
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          })}
        >
          <div className={css({ w: '50%' })}>
            <SpotField inputText={filterString} setInputText={setFilterString} placeholder="絞り込み" />
          </div>
        </section>
      </header>
      <div
        className={css({
          w: 'fit-content',
          maxW: '99vw',
          mx: 'auto',
          overflowX: 'scroll',
          scrollbar: 'hidden',
        })}
      >
        <main
          className={css({
            w: 'fit-content',
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
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
}
