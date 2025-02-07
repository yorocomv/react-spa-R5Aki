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
import { getLocalTimeZone, today } from '@internationalized/date';
import { css } from 'styled-system/css';

export default function PopoverCalendar(): JSX.Element {
  return (
    <Popover className={css({ overflow: 'auto', borderRadius: 'lg', bgColor: 'stone.100' })}>
      <Dialog className={css({ p: '0.75rem', color: 'stone.600' })}>
        <Calendar defaultValue={today(getLocalTimeZone())} defaultFocusedValue={today(getLocalTimeZone())}>
          <header
            className={css({
              display: 'flex',
              w: '100%',
              alignItems: 'center',
              gap: '0.325rem',
              pb: '0.5rem',
              px: '0.125rem',
              fontFamily: 'serif',
            })}
          >
            <Heading className={css({ flex: '1', fontWeight: 'bold', fontSize: '2xl', ml: '0.25rem' })} />
            <Button slot="previous">◀</Button>
            <Button slot="next">▶</Button>
          </header>
          <CalendarGrid className={css({ borderSpacing: '0.325rem', borderCollapse: 'separate' })}>
            <CalendarGridHeader>
              {(day) => (
                <CalendarHeaderCell className={css({ fontSize: 'xs', color: 'stone.500', fontWeight: 'bold' })}>
                  {day}
                </CalendarHeaderCell>
              )}
            </CalendarGridHeader>
            <CalendarGridBody>
              {(date) => (
                <CalendarCell
                  date={date}
                  className={css({
                    w: '1.525rem',
                    h: '1.525rem',
                    outlineOffset: '2px',
                    outline: '2px solid #0000',
                    cursor: 'default',
                    borderRadius: 'full',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '&[data-outside-month]': { color: 'stone.300' },
                    _hover: { bgColor: 'violet.100' },
                    _pressed: { bgColor: 'violet.200' },
                    _selected: { bgColor: 'violet.700', color: '#fff' },
                    _focusVisible: { boxShadow: '0 0 0 2px #fff, 0 0 0 5px #7c3aedb3, 0 0 #0000 ,0 0 #0000' },
                  })}
                />
              )}
            </CalendarGridBody>
          </CalendarGrid>
        </Calendar>
      </Dialog>
    </Popover>
  );
}
