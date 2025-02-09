import React from 'react';
import { Button, DateInput, DatePicker, DateSegment, Group } from 'react-aria-components';
import { CalendarDate } from '@internationalized/date';
import { css } from 'styled-system/css';

export default function DatePickerInput({
  children,
  todayDate,
}: {
  children: React.ReactNode;
  todayDate: CalendarDate;
}): JSX.Element {
  return (
    <DatePicker
      aria-label="date picker"
      defaultValue={todayDate}
      className={css({
        display: 'flex',
        alignItems: 'center',
      })}
    >
      <Group className={css({ display: 'flex' })}>
        <DateInput className={css({ display: 'flex', flex: '1' })}>
          {(segment) => <DateSegment segment={segment} />}
        </DateInput>
        <Button>▼</Button>
      </Group>
      {children}
    </DatePicker>
  );
}
