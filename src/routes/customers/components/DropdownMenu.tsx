import { Menu, MenuItem, MenuTrigger, Popover } from 'react-aria-components';
import DropdownMenuTrigger from './elements/DropdownMenuTrigger';

export default function DropdownMenu() {
  return (
    <MenuTrigger>
      <DropdownMenuTrigger aria-label="Menu">編集 / メモを追加</DropdownMenuTrigger>
      <Popover>
        <Menu>
          <MenuItem onAction={() => alert('open')}>Open</MenuItem>
          <MenuItem onAction={() => alert('rename')}>Rename…</MenuItem>
          <MenuItem onAction={() => alert('duplicate')}>Duplicate</MenuItem>
          <MenuItem onAction={() => alert('share')}>Share…</MenuItem>
          <MenuItem onAction={() => alert('delete')}>Delete…</MenuItem>
        </Menu>
      </Popover>
    </MenuTrigger>
  );
}
