import DatePickerInput from '@/components/ui/DatePickerInput';
import PopoverCalendar from '@/components/ui/PopoverCalendar';
import { css } from 'styled-system/css';

export default function PrintHistoryList() {
  return (
    <main>
      <div
        className={css({
          w: 'min(900px, 100% - 3rem)',
          marginInline: 'auto',
        })}
      >
        <DatePickerInput>
          <PopoverCalendar />
        </DatePickerInput>
        <table
          className={css({
            bgColor: '#999',
            borderCollapse: 'collapse',
          })}
        >
          <caption>印刷履歴一覧</caption>
          <thead>
            <tr>
              <th>着日</th>
              <th>時間指定</th>
              <th>印刷日時</th>
              <th>得意先名</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2025-02-04</td>
              <td>AM 必着</td>
              <td>2025-02-03 11:11:11.0000</td>
              <td>玉露園</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
