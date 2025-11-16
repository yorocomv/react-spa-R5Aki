import { Button, ComboBox, Group, Input, ListBox, ListBoxItem, Popover } from 'react-aria-components';
import { MdKeyboardArrowDown } from 'react-icons/md';

import { css } from 'styled-system/css';

interface ComboFieldProps {
  placeholder?: string;
}

export default function ComboField({
  placeholder = '',
}: ComboFieldProps) {
  const arr = [
    'Aardvark',
    'Cat',
    'Dog',
    'Kangaroo',
    'Panda',
    'Snak',
    'Aardvark',
    'Cat',
    'Dog',
    'Kangaroo',
    'Panda',
    'Snak',
    'Aardvark',
    'Cat',
    'Dog',
    'Kangaroo',
    'Panda',
    'Snak',
  ];

  return (
    <ComboBox className={css({
      display: 'flex',
      flexDir: 'column',
      gap: '1rem',
      w: '24rem',
    })}
    >
      <Group className={css({
        display: 'flex',
        h: '2.5rem',
        bgColor: '#f5eeee',
        borderWidth: '1px',
        borderColor: '#fefefe',
        borderRadius: 'sm',
        boxShadow: '2xs',
        _hover: {
          borderColor: 'slate.400',
        },
        '&:focus-within': {
          borderWidth: 0,
          outline: 'solid 0.1rem #2dd4bf',
        },
      })}
      >
        <Input
          placeholder={placeholder}
          className={css({
            flex: '1',
            w: 'full',
            fontWeight: 'bold',
            px: '1rem',
            color: '#0a1612',
            bgColor: 'transparent',
            border: 'none',
            outline: 'none',
            _placeholder: {
              fontSize: '0.8rem',
              fontWeight: 'normal',
            },
          })}
        />
        <Button className={css({
          display: 'flex',
          alignItems: 'center',
          px: '0.5rem',
          py: '0.575rem',
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
          <MdKeyboardArrowDown size={24} />
        </Button>
      </Group>
      <Popover className={css({
        minW: '20rem',
        overflow: 'scroll',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
        color: '#0a1612',
        bgColor: '#f5eeee',
        borderWidth: '1px',
        borderColor: '#fefefe',
        borderRadius: 'sm',
        boxShadow: 'md',

        '&:not(:has([data-focused], [data-pressed])) [data-selected]': {
          color: '#fff',
          bgColor: 'violet.700',
        },
      })}
      >
        <ListBox className={css({
          display: 'block',
          fontWeight: 'bold',
          lineHeight: '2.5rem',
          border: 'none',
          outline: 'none',

          '&.react-aria-Header': {
            pl: '1.75rem',
          },
        })}
        >
          {
            arr.map((item, i) => (
              <ListBoxItem
                key={i}
                className={css({
                  p: '0 0.75rem 0 1.75rem',
                  borderRadius: 'sm',
                  _selected: {
                    '&::before': {
                      content: "'✓' / ''",
                      pos: 'absolute',
                      left: '0.5rem',
                      fontWeight: 'bold',
                      color: 'teal.400',
                    },
                  },
                  '&[data-focused], &[data-pressed]': {
                    color: '#fff',
                    bgColor: 'violet.700',
                  },
                })}
              >
                {item}
              </ListBoxItem>
            ))
          }
        </ListBox>
      </Popover>
    </ComboBox>
  );
}
