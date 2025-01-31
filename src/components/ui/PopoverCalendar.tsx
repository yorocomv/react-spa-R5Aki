import { Button, Calendar, CalendarCell, CalendarGrid, Dialog, Heading, Popover } from 'react-aria-components';

export default function PopoverCalendar(): JSX.Element {
  return (
    <Popover>
      <Dialog>
        <Calendar>
          <header>
            <Button slot="previous">◀</Button>
            <Heading />
            <Button slot="next">▶</Button>
          </header>
          <CalendarGrid>{(date) => <CalendarCell date={date} />}</CalendarGrid>
        </Calendar>
      </Dialog>
    </Popover>
  );
}
