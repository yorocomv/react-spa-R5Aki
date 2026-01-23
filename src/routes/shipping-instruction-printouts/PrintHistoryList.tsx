import type { CalendarDate } from '@internationalized/date';

import { today } from '@internationalized/date';
import { useEffect, useRef, useState } from 'react';
import { GiPin } from 'react-icons/gi';
import { LuArrowLeftRight } from 'react-icons/lu';
import { useLocation } from 'react-router';

import DatePickerInput from '@/components/ui/DatePickerInput';
import Select from '@/components/ui/elements/Select';
import PopoverCalendar from '@/components/ui/PopoverCalendar';
import SpotField from '@/components/ui/SpotField';
import TooltipWrapper from '@/components/ui/TooltipWrapper';
import { css } from 'styled-system/css';

import type { useFetchPrintHistoryStates } from './components/hooks/useFetchPrintHistory';

import SupIcon from './components/elements/SupFilterIcon';
import HistoryDialog from './components/HistoryDialog';
import { useFetchPrintHistory } from './components/hooks/useFetchPrintHistory';
import { useFilterPrintHistory } from './components/hooks/useFilterPrintHistory';
import PrintHistoryTableTr from './components/PrintHistoryTableTr';
import ThReverseButton from './components/ThReverseButton';

export default function PrintHistoryList() {
  const fetchParams = useLocation().state as useFetchPrintHistoryStates | null;
  const { customerId, setCustomerId, selectCategory, setSelectCategory, dateA, setDateA, setDateAImmediate, dateB, setDateB, setDateBImmediate, printHistories, _lastOpenedPrintHistory, set_LastOpenedPrintHistory } =
    useFetchPrintHistory();

  const { filterString, setFilterString, filteredPrintHistories } = useFilterPrintHistory(printHistories);
  const historyCategories: { label: string; category: useFetchPrintHistoryStates['category'] }[] = customerId
    ? [
        { label: '着日', category: 'delivery_date' },
        { label: '出荷予定日', category: 'shipping_date' },
      ]
    : [
        { label: '印刷日時', category: 'printed_at' },
        { label: '着日', category: 'delivery_date' },
        { label: '出荷予定日', category: 'shipping_date' },
      ];
  const [isReverse, setIsReverse] = useState(true);
  const [selectedHistory, setSelectedHistory] = useState(-1);

  // 動的スタイリング用に printed_at をキーとして DOM ノードを Map に保持する
  const filteredPrintHistoriesRef = useRef(new Map());
  const addRefMap = (id: string, node: HTMLTableRowElement | null) => {
    filteredPrintHistoriesRef.current.set(id, node);
    return () => {
      filteredPrintHistoriesRef.current.delete(id);
    };
  };

  const handleSetStates = (index: number, printedAt: string) => {
    if (_lastOpenedPrintHistory && filteredPrintHistoriesRef.current.size) {
      const node = filteredPrintHistoriesRef.current.get(_lastOpenedPrintHistory) as HTMLTableRowElement;
      if (node)
        node.classList.remove('last-opened-highlight');
    }
    setSelectedHistory(index);
    set_LastOpenedPrintHistory(printedAt);
  };

  useEffect(() => {
    if (_lastOpenedPrintHistory && filteredPrintHistoriesRef.current.size) {
      const node = filteredPrintHistoriesRef.current.get(_lastOpenedPrintHistory) as HTMLTableRowElement;
      if (node)
        node.classList.add('last-opened-highlight');
    }
    // ページ遷移後ステートを引き継ぎ
    // else 無し。直接アクセス時は何もしない
    if (fetchParams) {
      if (fetchParams.non_fk_customer_id) {
        setCustomerId(fetchParams.non_fk_customer_id);
        fetchParams.non_fk_customer_id = null;
      }
      // useFetchPrintHistory のデフォルトと違う場合
      if (fetchParams.category !== 'printed_at') {
        setSelectCategory(fetchParams.category);
        fetchParams.category = 'printed_at';
      }
      if (fetchParams.dateA) {
        setDateAImmediate(fetchParams.dateA);
        fetchParams.dateA = null;
      }
      if (fetchParams.dateB) {
        setDateBImmediate(fetchParams.dateB);
        fetchParams.dateB = null;
      }
      if (fetchParams._lastOpenedPrintHistory) {
        set_LastOpenedPrintHistory(fetchParams._lastOpenedPrintHistory);
        fetchParams._lastOpenedPrintHistory = null;
      }
    }
  }, [_lastOpenedPrintHistory, fetchParams, setCustomerId, setDateAImmediate, setDateBImmediate, setSelectCategory, set_LastOpenedPrintHistory]);

  const todayDate = today('Asia/Tokyo');
  // 全ての顧客対象ではバックエンドのリミットよりもより小さい値に設定
  const rangeDays = customerId !== null && selectCategory !== 'printed_at' ? 731 : 14;

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
            onChange={e => setSelectCategory(e.target.value as useFetchPrintHistoryStates['category'])}
            value={selectCategory}
            className={css({ maxH: '2.175rem', w: 'fit-content' })}
          >
            {historyCategories.map(({ label, category }) => (
              <option key={category} value={category}>
                {label}
              </option>
            ))}
          </Select>
          {/* Why [object Object]
                React Aria の CalendarDate 型は
                （特にパースで文字列から作られた場合）リロードで壊れることがある */}
          <DatePickerInput
            value={dateA && dateA.toString() !== '[object Object]' ? dateA : null}
            setValue={setDateA}
            setValueImmediate={setDateAImmediate}
            todayDate={todayDate}
            isSuppressAutoToday={!!fetchParams?.dateA}
            minValue={dateB && dateB.toString() !== '[object Object]' ? dateB.subtract({ days: rangeDays }) : null}
            maxValue={dateB && dateB.toString() !== '[object Object]' ? dateB.add({ days: rangeDays }) : null}
          >
            <PopoverCalendar onChange={e => setDateAImmediate(e as CalendarDate)} todayDate={todayDate} />
          </DatePickerInput>
          <TooltipWrapper
            text="リセット"
            fillColor="orange.400"
            className={css({ color: 'orange.950', bgColor: 'orange.400', shadow: '2xl' })}
          >
            <LuArrowLeftRight
              size="1.3rem"
              onClick={() => {
                setCustomerId(null);
                setSelectCategory('printed_at');
                setDateAImmediate(todayDate);
                setDateBImmediate(null);
                setIsReverse(true);
              }}
              className={css({ _hover: { cursor: 'pointer' } })}
            />
          </TooltipWrapper>
          <DatePickerInput
            value={dateB && dateB.toString() !== '[object Object]' ? dateB : null}
            setValue={setDateB}
            setValueImmediate={setDateBImmediate}
            minValue={dateA && dateA.toString() !== '[object Object]' ? dateA.subtract({ days: rangeDays }) : null}
            maxValue={dateA && dateA.toString() !== '[object Object]' ? dateA.add({ days: rangeDays }) : null}
          >
            <PopoverCalendar onChange={e => setDateBImmediate(e as CalendarDate)} todayDate={todayDate} />
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
            '& tr': {
              textAlign: 'center',
              boxShadow: 'inset 0 -1px #d6d3d1',
            },
            '& tbody tr:last-child': { boxShadow: 'none' },
            '&:has(.selected-customer)': {
              '& td.printed-at': {
                maxW: '6rem',
              },
              '& td.customer-id-and-name': {
                maxW: '12.5rem',
                fontWeight: 'bold',
                bg: 'linear-gradient(90deg in oklch shorter hue, oklch(0.7049 0.1867 47.6 / 60%), oklch(0.903 0.0732 319.62 / 30%))',
                clipPath: 'polygon(6% 0, 100% 0, 100% 100%, 0 100%, 0 15%)',
                pos: 'relative',
                zIndex: '0',
                [hdScreen]: { maxW: '11rem' },
              },
              '& td.items-of-order': {
                maxW: '21.5rem',
                [hdScreen]: { maxW: '13rem' },
              },
            },
            '&:has(.selected-customer) tr:hover td.customer-id-and-name': {
              color: 'pink.600',
            },
          })}
        >
          <thead
            className={css({
              pos: 'sticky',
              // tbody の td で clip-path を使って必要になった
              zIndex: '1',
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
                {customerId !== null
                  ? (
                      <>
                        <span className={`selected-customer ${css({
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.2rem',
                        })}`}
                        >
                          得意先名
                          <GiPin className={css({
                            color: 'teal.600',
                            filter: 'drop-shadow(1px -1px 0 #99f6e4)',
                          })}
                          />
                        </span>
                        <SupIcon />
                      </>
                    )
                  : (
                      <>
                        得意先名
                        <SupIcon />
                      </>
                    )}
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
          <tbody className={css({
            '& >tr': {
              '&.last-opened-highlight': { bg: 'teal.500/25', boxShadow: 'inset 0 -1px #0d9488' },
              _hover: { color: 'teal.950', bgColor: 'teal.50/75', boxShadow: 'inset 0 -1px #d6d3d1' },
            },
          })}
          >
            { }
            {filteredPrintHistories?.length
              ? (
                  isReverse
                    ? (
                        [...filteredPrintHistories]
                          .reverse()
                          .map((po, i) => (
                            <PrintHistoryTableTr
                              addRefMap={addRefMap}
                              key={po.printed_at}
                              oneHistory={po}
                              handleSetStates={handleSetStates}
                              currentIndex={i}
                              parentMediaQuerySmall={smallScreen}
                              parentMediaQueryHd={hdScreen}
                            />
                          ))
                      )
                    : (
                        filteredPrintHistories.map((po, i) => (
                          <PrintHistoryTableTr
                            addRefMap={addRefMap}
                            key={po.printed_at}
                            oneHistory={po}
                            handleSetStates={handleSetStates}
                            currentIndex={i}
                            parentMediaQuerySmall={smallScreen}
                            parentMediaQueryHd={hdScreen}
                          />
                        ))
                      )
                )
              : (
                  <tr>
                    <td>{`${rangeDays} 日間以内`}</td>
                    <td className={css({ [smallScreen]: { display: 'none' } })}> - </td>
                    <td>{`${rangeDays} 日間以内`}</td>
                    <td className={css({ [smallScreen]: { display: 'none' } })}> - </td>
                    <td>該当なし</td>
                    <td className={css({ [hdScreen]: { display: 'none' } })}> - </td>
                    <td className={css({ [smallScreen]: { display: 'none' } })}> - </td>
                    <td className={css({ [hdScreen]: { display: 'none' } })}> - </td>
                    <td>{`${rangeDays} 日間以内`}</td>
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
                  customerId={customerId}
                  setCustomerId={setCustomerId}
                  setSelectCategory={setSelectCategory}
                  setDateAImmediate={setDateAImmediate}
                  setDateBImmediate={setDateBImmediate}
                />
              ))
          : filteredPrintHistories.map((po, i) => (
              <HistoryDialog
                key={po.printed_at}
                oneHistory={po}
                isOpen={selectedHistory === i}
                closeModal={setSelectedHistory}
                customerId={customerId}
                setCustomerId={setCustomerId}
                setSelectCategory={setSelectCategory}
                setDateAImmediate={setDateAImmediate}
                setDateBImmediate={setDateBImmediate}
              />
            ))
        : null}
    </div>
  );
}
