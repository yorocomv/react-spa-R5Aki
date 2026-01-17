import type { CalendarDate, DateValue } from '@internationalized/date';

import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  Dialog,
  Heading,
  Popover,
} from 'react-aria-components';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

import { css } from 'styled-system/css';

export default function PopoverCalendar({
  todayDate,
  onChange,
}: {
  todayDate: CalendarDate;
  onChange?: (date: DateValue) => void;
}): React.JSX.Element {
  const cellStyles = css.raw({
    w: '2rem',
    h: '2rem',
    outlineOffset: '2px',
    outline: '2px solid #0000',
    fontFamily: 'Calibri,sans-serif',
    cursor: 'default',
    borderRadius: 'full',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    _hover: { color: 'stone.600', bgColor: 'violet.200' },
    // 😓!important 使用
    _pressed: { bgColor: 'violet.300 !important' },
    _selected: { bgColor: 'violet.700', color: '#fff' },
    '&:focus-visible:where([data-rac])[data-focus-visible]': {
      boxShadow: '0 0 0 2px #fff, 0 0 0 5px #7c3aedb3, 0 0 #0000 ,0 0 #0000',
    },
  });
  const calendarCellStyles = css.raw({
    '&[data-disabled]': { color: 'stone.400', bgColor: 'stone.200', borderRadius: 'unset' },
    '&[data-disabled]:hover': { color: 'stone.200', bgColor: 'stone.200' },
    '&[data-invalid], &[data-invalid]:hover': { color: 'rose.50', bgColor: 'rose.600' },
    '&[data-outside-month]': { color: 'stone.300 !important', bgColor: 'inherit !important' },
    '&[data-outside-month]:hover': {
      color: 'transparent !important',
      bgColor: 'transparent !important',
    },
  });
  const todayStyles = css.raw({ color: 'stone.900', bgColor: 'stone.300' });
  const pageNavStyles = css.raw({
    color: 'stone.600',
    '&[data-disabled]': { color: 'stone.400' },
    '&[data-disabled]:hover': { color: 'transparent', bgColor: 'transparent' },
  });

  return (
    <Popover className={css({ overflow: 'auto', borderRadius: 'lg', bgColor: 'stone.100', boxShadow: 'lg' })}>
      <Dialog className={css({ p: '1rem', color: 'stone.600' })}>
        <Calendar onChange={onChange} firstDayOfWeek="sun">
          <header
            className={css({
              display: 'flex',
              w: '100%',
              alignItems: 'center',
              gap: '0.325rem',
              pb: '0.5rem',
              px: '0.125rem',
              fontFamily: 'Georgia,"BIZ UDMincho Medium",serif',
            })}
          >
            <Heading className={css({ flex: '1', fontWeight: 'bold', fontSize: '2xl', my: '1rem', ml: '0.375rem' })} />
            <Button slot="previous" className={css(cellStyles, pageNavStyles)}>
              <FaChevronLeft />
            </Button>
            <Button slot="next" className={css(cellStyles, pageNavStyles)}>
              <FaChevronRight />
            </Button>
          </header>
          <CalendarGrid className={css({ borderSpacing: '0.325rem', borderCollapse: 'separate' })}>
            <CalendarGridHeader
              className={css({
                '& tr > th:first-child': { color: 'red.600' },
                '& tr > th:last-child': { color: 'blue.600' },
              })}
            >
              {day => (
                <CalendarHeaderCell className={css({ fontSize: 'xs', color: 'stone.500', fontWeight: 'bold' })}>
                  {day}
                </CalendarHeaderCell>
              )}
            </CalendarGridHeader>
            <CalendarGridBody
              className={css({
                '& tr > td:first-child': { color: 'red.500' },
                '& tr > td:last-child': { color: 'blue.500' },
              })}
            >
              {date =>
                date.year === todayDate.year && date.month === todayDate.month && date.day === todayDate.day
                  ? (
                      <CalendarCell date={date} className={css(cellStyles, calendarCellStyles, todayStyles)} />
                    )
                  : (
                      <CalendarCell date={date} className={css(cellStyles, calendarCellStyles)} />
                    )}
            </CalendarGridBody>
          </CalendarGrid>
        </Calendar>
      </Dialog>
    </Popover>
  );
}
