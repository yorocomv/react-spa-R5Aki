import type { CalendarDate } from '@internationalized/date';
import type { DateValue } from 'react-aria-components';
import type { Control, FieldValues, Path } from 'react-hook-form';

import { Button, Calendar, CalendarCell, CalendarGrid, CalendarGridBody, CalendarGridHeader, CalendarHeaderCell, DateInput, DatePicker, DateSegment, Dialog, Group, Heading, Popover } from 'react-aria-components';
import { Controller } from 'react-hook-form';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { RxCalendar } from 'react-icons/rx';

import { css } from 'styled-system/css';

export default function CommonDatePicker<T extends FieldValues>({
  todayDate,
  control,
  name,
  minValue = null,
  maxValue = null,
}: {
  todayDate: CalendarDate;
  control: Control<T>;
  name: Path<T>;
  minValue?: DateValue | null | undefined;
  maxValue?: DateValue | null | undefined;
}) {
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
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <DatePicker
          aria-label="date picker"
          {...field}
          value={field.value ?? null}
          minValue={minValue}
          maxValue={maxValue}
          className={css({
            display: 'flex',
            flexDir: 'column',
            w: '11rem',
          })}
        >
          <Group
            className={css({
              display: 'flex',
              alignItems: 'center',
              fontFamily: 'Calibri,"Meiryo UI",sans-serif',
              fontWeight: 'bold',
              color: '#0a1612',
              bgColor: '#f5eeee',
              borderRadius: 'md',
              boxShadow: '2xs',
              pl: '0.625rem',
              '&:hover:not(:focus-within)': {
                outline: 'solid 0.05rem #94a3b8',
              },
              '&:where([data-rac])[data-focus-within]': { outline: 'solid 0.1rem #2dd4bf' },
              '[data-open] &': { outline: 'solid 0.1rem #2dd4bf' },
            })}
          >
            <DateInput
              aria-label="date input"
              className={css({
                display: 'flex',
                flex: '1',
                py: '0.315rem',
                '&[data-invalid]': {
                  color: 'rose.600',
                  '& > span': { color: 'rose.600' },
                  _after: {
                    content: '"🚫"',
                    flex: '1',
                    textAlign: 'end',
                    // my: '0.125rem',
                  },
                },
              })}
            >
              {segment => (
                <DateSegment
                  segment={segment}
                  className={css({
                    fontSize: 'lg',
                    lineHeight: '1.5rem',
                    px: '0.125rem',
                    // my: '0.125rem',
                    borderRadius: 'sm',
                    fontVariantNumeric: 'tabular-nums',
                    outline: 'none',
                    _focus: { color: '#fff', bgColor: 'violet.700' },
                  })}
                />
              )}
            </DateInput>
            <Button
              className={css({
                display: 'flex',
                alignItems: 'center',
                outline: 'none',
                px: '0.625rem',
                py: '0.54rem',
                borderRightRadius: 'md',
                color: 'slate.700/90',
                bgColor: 'transparent',
                borderWidth: '0 0 0 1px',
                borderStyle: 'solid',
                borderColor: 'slate.200',
                _hover: { color: 'slate.950' },
                _pressed: {
                  color: 'slate.950',
                  bgColor: 'purple.100',
                  borderColor: 'purple.200',
                },
              })}
            >
              <RxCalendar size="1.3rem" />
            </Button>
          </Group>
          <Popover className={css({ overflow: 'auto', borderRadius: 'lg', bgColor: 'stone.100', boxShadow: 'lg' })}>
            <Dialog className={css({ p: '1rem', color: 'stone.600' })}>
              <Calendar firstDayOfWeek="sun">
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
        </DatePicker>
      )}
    />
  );
}
