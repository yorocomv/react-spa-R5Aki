import { Menu, MenuItem, MenuTrigger, Popover } from 'react-aria-components';
import { useNavigate } from 'react-router';

import type { useFetchPrintHistoryStates } from '@/routes/shipping-instruction-printouts/components/hooks/useFetchPrintHistory';

import type { SystemStyleObject } from '../../../../styled-system/types';
import type { CustomersTbRow } from '../customers.types';

import { css } from '../../../../styled-system/css';
import DropdownMenuTrigger from './elements/DropdownMenuTrigger';

interface DropdownMenuProps {
  label: string;
  mergeStyles?: SystemStyleObject;
  menuItems: {
    label: string;
    toRelativePath: string;
    state: CustomersTbRow | useFetchPrintHistoryStates;
  }[];
}

export default function DropdownMenu({ label, mergeStyles = undefined, menuItems }: DropdownMenuProps): React.JSX.Element {
  const navigate = useNavigate();

  return (
    <MenuTrigger>
      <DropdownMenuTrigger mergeStyles={mergeStyles}>{label}</DropdownMenuTrigger>
      <Popover>
        <Menu
          className={css({
            minW: '14rem',
            p: 2,
            fontSize: 'sm',
            lineHeight: '1.125rem',
            color: 'teal.50',
            border: '1px solid rgba(4, 47, 46, .7)',
            bgColor: 'rgba(4, 47, 46, .7)',
            backdropFilter: 'blur(15px)',
            borderRadius: 'sm',
            boxShadow: 'md',
          })}
        >
          {menuItems.map(item => (
            <MenuItem
              key={item.label}
              onAction={() => {
                // https://github.com/remix-run/react-router/issues/12348
                Promise.resolve(navigate(item.toRelativePath, { relative: 'path', state: { ...item.state } })).catch(
                  (err: string) => {
                    throw new Error(err);
                  },
                );
              }}
              className={css({
                cursor: 'default',
                fontSize: 'sm',
                lineHeight: '1.125rem',
                borderRadius: 'sm',
                px: 3,
                py: 1,
                _hover: {
                  color: 'teal.50',
                  bgColor: 'rgba(20, 184, 166, .7)',
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
