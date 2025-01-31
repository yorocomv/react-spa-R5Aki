import { Button, DateInput, DatePicker, DateSegment, Group } from 'react-aria-components';

export default function DatePickerInput({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <DatePicker aria-label="date picker">
      <Group>
        <DateInput>{(segment) => <DateSegment segment={segment} />}</DateInput>
        <Button>▼</Button>
      </Group>
      {children}
    </DatePicker>
  );
}
