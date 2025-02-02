import { Button, DateInput, DatePicker, DateSegment, Group } from 'react-aria-components';
import { css } from 'styled-system/css';

export default function DatePickerInput({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <DatePicker
      aria-label="date picker"
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
