import { today } from '@internationalized/date';
import { useState } from 'react';
import { LuArrowLeftRight } from 'react-icons/lu';

import DatePickerInput from '@/components/ui/DatePickerInput';
import Select from '@/components/ui/elements/Select';
import PopoverCalendar from '@/components/ui/PopoverCalendar';
import SpotField from '@/components/ui/SpotField';
import TooltipWrapper from '@/components/ui/TooltipWrapper';
import { css } from 'styled-system/css';

import type { FindShippingInstructionsQueryCategory } from './shippingInstructionPrintouts.types';

import SupIcon from './components/elements/SupFilterIcon';
import HistoryDialog from './components/HistoryDialog';
import { useFetchPrintHistory } from './components/hooks/useFetchPrintHistory';
import { useFilterPrintHistory } from './components/hooks/useFilterPrintHistory';
import PrintHistoryTableTr from './components/PrintHistoryTableTr';
import ThReverseButton from './components/ThReverseButton';

export default function PrintHistoryList() {
  const { selectCategory, setSelectCategory, dateA, setDateA, dateB, setDateB, printHistories } =
    useFetchPrintHistory();
  const { filterString, setFilterString, filteredPrintHistories } = useFilterPrintHistory(printHistories);
  const historyCategories: { label: string; category: FindShippingInstructionsQueryCategory }[] = [
    { label: '印刷日時', category: 'printed_at' },
    { label: '着日', category: 'delivery_date' },
    { label: '出荷予定日', category: 'shipping_date' },
  ];
  const [isReverse, setIsReverse] = useState(true);
  const [selectedHistory, setSelectedHistory] = useState(-1);

  const todayDate = today('Asia/Tokyo');

  // Panda CSS で使用する変数
  const smallScreen = '@media(width < 960px)';
  const hdScreen = '@media(width < 1280px)';
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
          boxShadow: 'sticky',
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
            onChange={e => setSelectCategory(e.target.value as FindShippingInstructionsQueryCategory)}
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
          <TooltipWrapper
            text="リセット"
            fillColor="orange.400"
            className={css({ color: 'orange.950', bgColor: 'orange.400', shadow: '2xl' })}
          >
            <LuArrowLeftRight
              size="1.3rem"
              onClick={() => {
                setSelectCategory('printed_at');
                setDateA(todayDate);
                setDateB(null);
                setIsReverse(true);
              }}
              className={css({ _hover: { cursor: 'pointer' } })}
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
            gap: '0.5rem',
          })}
        >
          <p className={css({
            '@media(width >= 1280px)': {
              pos: 'absolute',
              mx: 'auto',
              left: 0,
              right: 0,
            },
            whiteSpace: 'nowrap',
            w: 'fit-content',
            fontSize: 'md',
            fontWeight: 'bold',
            textShadow: 'rgba(255, 255, 255, 0.3) 1px 1px',
            px: '0.25rem',
            bg: 'linear-gradient(transparent 50%, rgba(255, 255, 105, 0.6) 35%)',
          })}
          >
            <em className={css({ fontStyle: 'normal' })}>
              {filteredPrintHistories.length}
            </em>
            <span className={css({ [smallScreen]: { display: 'none' } })}>
              {' '}
              hit(s)
              {' '}
            </span>
            <em className={css({ fontStyle: 'normal' })}>
              {isReverse ? '降順' : '昇順'}
            </em>
          </p>
          <div className={css({ w: '65%', minW: '18rem', maxW: '30rem' })}>
            <SpotField inputText={filterString} setInputText={setFilterString} placeholder="絞り込み" />
          </div>
        </section>
      </header>
      <main
        className={css({
          pos: 'fixed',
          top: '4rem',
          left: 0,
          right: 0,
          h: 'fit-content',
          maxH: 'calc(100dvh - 4.5rem)',
          w: 'fit-content',
          maxW: '99vw',
          mx: 'auto',
          p: 0,
          overflowX: 'scroll',
          scrollbar: 'hidden',
          shadow: 'xl',
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
            color: 'stone.950',
            bgColor: 'stone.100',
            borderRadius: 'lg',
            borderCollapse: 'collapse',
            whiteSpace: 'nowrap',
            overflowX: 'hidden',
            '& tr': { boxShadow: 'inset 0 -1px #d6d3d1' },
            '& tbody tr:last-child': { boxShadow: 'none' },
          })}
        >
          <thead
            className={css({
              pos: 'sticky',
              top: 0,
              bgColor: 'stone.200',
              borderRadius: 'lg',
            })}
          >
            <tr>
              <th>
                {selectCategory === 'delivery_date'
                  ? (
                      <ThReverseButton setValue={setIsReverse}>着日</ThReverseButton>
                    )
                  : (
                      <>着日</>
                    )}
              </th>
              <th className={css({ [smallScreen]: { display: 'none' } })}>時間指定</th>
              <th>
                {selectCategory === 'printed_at'
                  ? (
                      <ThReverseButton setValue={setIsReverse}>印刷日時</ThReverseButton>
                    )
                  : (
                      <>印刷日時</>
                    )}
              </th>
              <th className={css({ [smallScreen]: { display: 'none' } })}>印刷頁</th>
              <th>
                得意先名
                <SupIcon />
              </th>
              <th className={css({ [hdScreen]: { display: 'none' } })}>
                住所
                <SupIcon />
              </th>
              <th className={css({ [smallScreen]: { display: 'none' } })}>
                帳合
                <SupIcon />
              </th>
              <th className={css({ [hdScreen]: { display: 'none' } })}>
                ｵｰﾀﾞｰNo
                <SupIcon />
              </th>
              <th>
                {selectCategory === 'shipping_date'
                  ? (
                      <ThReverseButton setValue={setIsReverse}>
                        <span className={css({ [bigScreen]: { _after: { content: '"（予定）"' } } })}>発日</span>
                      </ThReverseButton>
                    )
                  : (
                      <span className={css({ [bigScreen]: { _after: { content: '"（予定）"' } } })}>発日</span>
                    )}
              </th>
              <th>
                運送会社
                <SupIcon />
              </th>
              <th>口数</th>
              <th>
                商品
                <SupIcon />
              </th>
            </tr>
          </thead>
          <tbody className={css({ '& >tr': { _hover: { color: 'teal.950', bgColor: 'teal.50/75' } } })}>
            { }
            {filteredPrintHistories?.length
              ? (
                  isReverse
                    ? (
                        [...filteredPrintHistories]
                          .reverse()
                          .map((po, i) => (
                            <PrintHistoryTableTr
                              key={po.printed_at}
                              oneHistory={po}
                              toggleModal={setSelectedHistory}
                              currentIndex={i}
                              parentMediaQuerySmall={smallScreen}
                              parentMediaQueryHd={hdScreen}
                            />
                          ))
                      )
                    : (
                        filteredPrintHistories.map((po, i) => (
                          <PrintHistoryTableTr
                            key={po.printed_at}
                            oneHistory={po}
                            toggleModal={setSelectedHistory}
                            currentIndex={i}
                            parentMediaQuerySmall={smallScreen}
                            parentMediaQueryHd={hdScreen}
                          />
                        ))
                      )
                )
              : (
                  <tr>
                    <td>7日間以内</td>
                    <td className={css({ [smallScreen]: { display: 'none' } })}> - </td>
                    <td>7日間以内</td>
                    <td className={css({ [smallScreen]: { display: 'none' } })}> - </td>
                    <td>該当なし</td>
                    <td className={css({ [hdScreen]: { display: 'none' } })}> - </td>
                    <td className={css({ [smallScreen]: { display: 'none' } })}> - </td>
                    <td className={css({ [hdScreen]: { display: 'none' } })}> - </td>
                    <td>7日間以内</td>
                    <td> - </td>
                    <td> - </td>
                    <td> - </td>
                  </tr>
                )}
          </tbody>
        </table>
      </main>
      { }
      {filteredPrintHistories?.length
        ? isReverse
          ? [...filteredPrintHistories]
              .reverse()
              .map((po, i) => (
                <HistoryDialog
                  key={po.printed_at}
                  oneHistory={po}
                  isOpen={selectedHistory === i}
                  closeModal={setSelectedHistory}
                />
              ))
          : filteredPrintHistories.map((po, i) => (
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
