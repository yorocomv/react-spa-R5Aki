import React from 'react';
import { Button, DateInput, DatePicker, DateSegment, Group } from 'react-aria-components';
import { CalendarDate } from '@internationalized/date';
import { css } from 'styled-system/css';
import { RxCalendar } from 'react-icons/rx';

export default function DatePickerInput({
  children,
  todayDate = null,
  value,
  setValue,
}: {
  children: React.ReactNode;
  todayDate?: CalendarDate | null;
  value: CalendarDate | null;
  setValue: React.Dispatch<React.SetStateAction<CalendarDate | null>>;
}): JSX.Element {
  return (
    <DatePicker
      aria-label="date picker"
      value={value ?? todayDate}
      onChange={setValue}
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
          color: 'slate.700/90',
          bgColor: 'slate.50/80',
          borderRadius: 'md',
          boxShadow: 'sm',
          pl: '0.625rem',
          '&:where([data-rac])[data-focus-within]': { color: 'slate.950', bgColor: 'slate.50' },
        })}
      >
        <DateInput className={css({ display: 'flex', flex: '1', py: '0.315rem' })}>
          {(segment) => (
            <DateSegment
              segment={segment}
              className={css({
                fontSize: 'lg',
                lineHeight: '1.5rem',
                px: '0.125rem',
                my: '0.125rem',
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
      {children}
    </DatePicker>
  );
}
