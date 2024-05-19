import { Menu, MenuItem, MenuTrigger, Popover } from 'react-aria-components';
import { useNavigate } from 'react-router-dom';
import { css } from '../../../../styled-system/css';
import DropdownMenuTrigger from './elements/DropdownMenuTrigger';
import { CustomersTbRow } from '../customers.types';
import { SystemStyleObject } from '../../../../styled-system/types';

interface DropdownMenuProps {
  label: string;
  marginStyle?: SystemStyleObject;
  menuItems: {
    label: string;
    toRelativePath: string;
    state?: CustomersTbRow;
  }[];
}

export default function DropdownMenu({ label, marginStyle = undefined, menuItems }: DropdownMenuProps): JSX.Element {
  const navigate = useNavigate();

  return (
    <MenuTrigger>
      <DropdownMenuTrigger marginStyle={marginStyle}>{label}</DropdownMenuTrigger>
      <Popover>
        <Menu
          className={css({
            minW: '14rem',
            py: 2,
            fontSize: 'sm',
            color: 'teal.50',
            bgColor: 'teal.950',
            borderRadius: 'sm',
            boxShadow: 'md',
          })}
        >
          {menuItems.map((item) => (
            <MenuItem
              key={item.label}
              onAction={() => navigate(item.toRelativePath, { relative: 'path', state: { ...item.state } })}
              className={css({
                cursor: 'default',
                lineHeight: 1,
                px: 3,
                py: 1,
                _hover: {
                  color: 'teal.50',
                  bgColor: 'teal.500',
                },
              })}
            >
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      </Popover>
    </MenuTrigger>
  );
}
