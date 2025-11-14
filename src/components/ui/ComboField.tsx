import { Button, ComboBox, Group, Input, ListBox, ListBoxItem, Popover } from 'react-aria-components';
import { MdKeyboardArrowDown } from 'react-icons/md';

import { css } from 'styled-system/css';

export default function ComboField() {
  const arr = [
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
      w: '18rem',
      bgColor: 'red',
      // alignItems: 'center',
    })}
    >
      <Group className={css({
        display: 'flex',
        alignItems: 'center',
      })}
      >
        <Input className={css({
          flex: '1',
          w: 'full',
          fontWeight: 'bold',
          h: '2.5rem',
          px: '1rem',
          color: '#0a1612',
          bgColor: '#f5eeee',
          borderWidth: '1px',
          borderColor: '#fefefe',
          borderRadius: 'sm',
          boxShadow: '2xs',
          _placeholder: {
            fontSize: '0.8rem',
            fontWeight: 'normal',
          },
          _hover: {
            borderColor: 'slate.400',
          },
          _focus: {
            borderWidth: 0,
            outline: 'solid 0.1rem #2dd4bf',
          },
        })}
        />
        <Button className={css({
          // ml: '-2.714rem',
          outline: 'none',
          px: '0.5rem',
          py: '0.53rem',
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
          // color: 'teal.700',
          // _pressed: {
          //   color: 'teal.500',
          // },
        })}
        >
          <MdKeyboardArrowDown size={24} />
        </Button>
      </Group>
      <Popover className={css({
        minW: '14rem',
        color: '#0a1612',
        bgColor: '#f5eeee',
        borderWidth: '1px',
        borderColor: '#fefefe',
        borderRadius: 'sm',
        boxShadow: 'md',
      })}
      >
        <ListBox className={css({
          display: 'block',
          fontWeight: 'bold',
          lineHeight: '2.5rem',
          border: 'none',
          outline: 'none',

          '&.react-aria-Header': {
            pl: '1.571rem',
          },
        })}
        >
          {
            arr.map((item, i) => (
              <ListBoxItem
                key={i}
                className={css({
                  p: '0 0.571rem 0 1.571rem',
                  '&[data-focused], &[data-pressed]': {
                    bgColor: 'slate.400',
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
