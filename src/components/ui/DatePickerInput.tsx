import React, { useEffect } from 'react';
import { Button, DateInput, DatePicker, DateSegment, DateValue, Group } from 'react-aria-components';
import { CalendarDate } from '@internationalized/date';
import { css } from 'styled-system/css';
import { RxCalendar } from 'react-icons/rx';

export default function DatePickerInput({
  children,
  todayDate = null,
  value,
  minValue = null,
  maxValue = null,
  setValue,
}: {
  children: React.ReactNode;
  todayDate?: CalendarDate | null;
  value: CalendarDate | null;
  minValue?: DateValue | null | undefined;
  maxValue?: DateValue | null | undefined;
  setValue: React.Dispatch<React.SetStateAction<CalendarDate | null>>;
}): JSX.Element {
  // 初回のみ実行
  useEffect(() => {
    if (!value && todayDate) {
      setValue(todayDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DatePicker
      aria-label="date picker"
      value={value}
      onChange={setValue}
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
          color: 'slate.700/90',
          bgColor: 'slate.50/80',
          borderRadius: 'md',
          boxShadow: 'sm',
          pl: '0.625rem',
          _hover: {
            outline: 'solid 0.05rem #94a3b8',
          },
          '&:where([data-rac])[data-focus-within]': { color: 'slate.950', bgColor: 'slate.50' },
        })}
      >
        <DateInput
          className={css({
            display: 'flex',
            flex: '1',
            py: '0.315rem',
            '&[data-invalid]': {
              color: 'rose.600',
              _after: {
                content: '"🚫"',
                flex: '1',
                textAlign: 'end',
                my: '0.125rem',
              },
            },
          })}
        >
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
