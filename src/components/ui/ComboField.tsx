import { Button, ComboBox, Input, ListBox, ListBoxItem, Popover } from 'react-aria-components';
import { TbSquareChevronDownFilled } from 'react-icons/tb';

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
    <ComboBox>
      <div className={css({
        display: 'flex',
        alignItems: 'center',
      })}
      >
        <Input className={css({
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
          ml: '-1.714rem',
          color: 'teal.700',
          _pressed: {
            color: 'teal.500',
          },
        })}
        >
          <TbSquareChevronDownFilled size={24} />
        </Button>
      </div>
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
