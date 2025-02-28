import DatePickerInput from '@/components/ui/DatePickerInput';
import PopoverCalendar from '@/components/ui/PopoverCalendar';
import { today } from '@internationalized/date';
import { css } from 'styled-system/css';
import Select from '@/components/ui/elements/Select';
import { LuArrowLeftRight } from 'react-icons/lu';
import SpotField from '@/components/ui/SpotField';
import { useState } from 'react';
import { FindShippingInstructionsQueryCategory } from './shippingInstructionPrintouts.types';
import { useFetchPrintHistory } from './components/hooks/useFetchPrintHistory';

export default function PrintHistoryList() {
  const { selectCategory, setSelectCategory, dateA, setDateA, dateB, setDateB, printHistories } =
    useFetchPrintHistory();
  const historyCategories: { label: string; category: FindShippingInstructionsQueryCategory }[] = [
    { label: '印刷日時', category: 'printed_at' },
    { label: '着日', category: 'delivery_date' },
    { label: '出荷予定日', category: 'shipping_date' },
  ];
  const [filterString, setFilterString] = useState('');

  const todayDate = today('Asia/Tokyo');

  const smallScreen = '@media(width < 888px)';

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
          <Select
            value={selectCategory}
            onChange={(e) => setSelectCategory(e.target.value as FindShippingInstructionsQueryCategory)}
            className={css({ h: '2.175rem', w: 'fit-content' })}
          >
            {historyCategories.map(({ label, category }) => (
              <option key={category} value={category}>
                {label}
              </option>
            ))}
          </Select>
          <DatePickerInput value={dateA} setValue={setDateA} todayDate={todayDate}>
            <PopoverCalendar todayDate={todayDate} />
          </DatePickerInput>
          <LuArrowLeftRight size="1.3rem" />
          <DatePickerInput value={dateB} setValue={setDateB}>
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
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              '& tr': { boxShadow: 'inset 0 -1px #d6d3d1' },
              '& tbody tr:last-child': { boxShadow: 'none' },
            })}
          >
            <thead className={css({ bgColor: 'stone.200', borderRadius: 'lg' })}>
              <tr>
                <th>着日</th>
                <th className={css({ [smallScreen]: { display: 'none' } })}>時間指定</th>
                <th>印刷日時</th>
                <th className={css({ [smallScreen]: { display: 'none' } })}>印刷頁</th>
                <th>得意先名</th>
                <th className={css({ [smallScreen]: { display: 'none' } })}>住所</th>
                <th className={css({ [smallScreen]: { display: 'none' } })}>帳合</th>
                <th className={css({ [smallScreen]: { display: 'none' } })}>ｵｰﾀﾞｰNo</th>
                <th>
                  出荷<span className={css({ fontSize: '0.75rem' })}>(予)</span>
                </th>
                <th>運送会社</th>
                <th>口数</th>
                <th>商品</th>
              </tr>
            </thead>
            <tbody className={css({ '& >tr': { bgColor: { _hover: 'amber.50' } } })}>
              {printHistories.length ? (
                printHistories.map((po) => (
                  <tr key={po.printed_at} className={css({ _even: { bgColor: 'slate.200' } })}>
                    <td
                      className={css({
                        [smallScreen]: {
                          maxW: '4.3rem',
                          direction: 'rtl',
                          overflow: 'hidden',
                        },
                      })}
                    >
                      {po.delivery_date}
                    </td>
                    <td className={css({ [smallScreen]: { display: 'none' } })}>{po.delivery_time_str}</td>
                    <td
                      className={css({
                        maxW: '8rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      })}
                    >
                      {po.printed_at}
                    </td>
                    <td className={css({ [smallScreen]: { display: 'none' } })}>{po.page_num_str}</td>
                    <td
                      className={css({
                        maxW: '16rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      })}
                    >
                      {po.customer_name}
                    </td>
                    <td
                      className={css({
                        maxW: '12rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        [smallScreen]: { display: 'none' },
                      })}
                    >
                      {po.customer_address}
                    </td>
                    <td className={css({ [smallScreen]: { display: 'none' } })}>{po.wholesaler}</td>
                    <td className={css({ [smallScreen]: { display: 'none' } })}>{po.order_number}</td>
                    <td
                      className={css({
                        [smallScreen]: {
                          maxW: '4.3rem',
                          direction: 'rtl',
                          overflow: 'hidden',
                        },
                      })}
                    >
                      {po.shipping_date}
                    </td>
                    <td>{po.carrier}</td>
                    <td>{po.package_count}</td>
                    <td
                      className={css({
                        maxW: '16rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      })}
                    >
                      {po.items_of_order}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>7日間以内</td>
                  <td> - </td>
                  <td>7日間以内</td>
                  <td> - </td>
                  <td>該当なし</td>
                  <td> - </td>
                  <td> - </td>
                  <td> - </td>
                  <td>7日間以内</td>
                  <td> - </td>
                  <td> - </td>
                  <td> - </td>
                </tr>
              )}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
}
