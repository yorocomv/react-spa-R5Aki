import DatePickerInput from '@/components/ui/DatePickerInput';
import PopoverCalendar from '@/components/ui/PopoverCalendar';
import { today } from '@internationalized/date';
import { css } from 'styled-system/css';
import Select from '@/components/ui/elements/Select';
import { LuArrowLeftRight } from 'react-icons/lu';
import SpotField from '@/components/ui/SpotField';
import { useState } from 'react';
import TooltipWrapper from '@/components/ui/TooltipWrapper';
import { FindShippingInstructionsQueryCategory } from './shippingInstructionPrintouts.types';
import { useFetchPrintHistory } from './components/hooks/useFetchPrintHistory';
import HistoryDialog from './components/HistoryDialog';
import PrintHistoryTableTr from './components/PrintHistoryTableTr';
import { useFilterPrintHistory } from './components/hooks/useFilterPrintHistory';

export default function PrintHistoryList() {
  const { selectCategory, setSelectCategory, dateA, setDateA, dateB, setDateB, printHistories } =
    useFetchPrintHistory();
  const { filterString, setFilterString, filteredPrintHistories } = useFilterPrintHistory(printHistories);
  const historyCategories: { label: string; category: FindShippingInstructionsQueryCategory }[] = [
    { label: '印刷日時', category: 'printed_at' },
    { label: '着日', category: 'delivery_date' },
    { label: '出荷予定日', category: 'shipping_date' },
  ];
  const [selectedHistory, setSelectedHistory] = useState(-1);

  const todayDate = today('Asia/Tokyo');

  // Panda CSS で使用する変数
  const smallScreen = '@media(width < 960px)';
  const bigScreen = '@media(width >= 960px)';

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
            className={css({ maxH: '2.175rem', w: 'fit-content' })}
          >
            {historyCategories.map(({ label, category }) => (
              <option key={category} value={category}>
                {label}
              </option>
            ))}
          </Select>
          <DatePickerInput
            value={dateA}
            setValue={setDateA}
            todayDate={todayDate}
            minValue={dateB ? dateB.subtract({ days: 7 }) : null}
            maxValue={dateB ? dateB.add({ days: 7 }) : null}
          >
            <PopoverCalendar todayDate={todayDate} />
          </DatePickerInput>
          <TooltipWrapper text="リセット" className={css({ shadow: '4xl' })}>
            <LuArrowLeftRight
              size="1.3rem"
              onClick={() => {
                setSelectCategory('printed_at');
                setDateA(todayDate);
                setDateB(null);
              }}
            />
          </TooltipWrapper>
          <DatePickerInput
            value={dateB}
            setValue={setDateB}
            minValue={dateA ? dateA.subtract({ days: 7 }) : null}
            maxValue={dateA ? dateA.add({ days: 7 }) : null}
          >
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
          <div className={css({ w: '65%', minW: '18rem', maxW: '30rem' })}>
            <SpotField inputText={filterString} setInputText={setFilterString} placeholder="絞り込み" />
          </div>
        </section>
      </header>
      <div
        className={css({
          w: 'fit-content',
          maxW: '99vw',
          mx: 'auto',
          my: '0.5rem',
          p: 0,
          overflowX: 'scroll',
          scrollbar: 'hidden',
          borderRadius: 'lg',
        })}
      >
        <main
          className={css({
            w: 'fit-content',
            m: 0,
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
                <th className={css({ [bigScreen]: { _after: { content: '"（予定）"' } } })}>発日</th>
                <th>運送会社</th>
                <th>口数</th>
                <th>商品</th>
              </tr>
            </thead>
            <tbody className={css({ '& >tr': { bgColor: { _hover: 'amber.50' } } })}>
              {filteredPrintHistories?.length ? (
                filteredPrintHistories.map((po, i) => (
                  <PrintHistoryTableTr
                    key={po.printed_at}
                    oneHistory={po}
                    toggleModal={setSelectedHistory}
                    currentIndex={i}
                    parentMediaQuerySmall={smallScreen}
                  />
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
      {filteredPrintHistories?.length
        ? filteredPrintHistories.map((po, i) => (
            <HistoryDialog
              key={po.printed_at}
              oneHistory={po}
              isOpen={selectedHistory === i}
              closeModal={setSelectedHistory}
            />
          ))
        : null}
    </div>
  );
}
