import React from 'react';
import { Button } from 'react-aria-components';
import { css } from '../../../../../styled-system/css';
import { SystemStyleObject } from '../../../../../styled-system/types';

export default function DropdownMenuTrigger({
  children,
  mergeStyles = undefined,
}: {
  children: React.ReactNode;
  mergeStyles?: SystemStyleObject;
}): JSX.Element {
  const buttonStyles = css.raw({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    color: {
      base: 'teal.950',
      _active: { base: 'teal.100', _disabled: 'stone.300' },
      _disabled: 'stone.300',
    },
    bg: {
      base: 'teal.400',
      _hover: { base: 'teal.300', _disabled: 'stone.200' },
      _active: 'teal.600',
      _disabled: 'stone.200',
    },
    fontWeight: 'bold',
    textShadow: 'rgba(255, 255, 255, 0.3) 1px 1px',
    py: 0.5,
    px: 1.5,
    gap: 1,
    borderWidth: '1px',
    borderColor: { base: 'teal.300', _disabled: 'stone.300' },
    borderRadius: 'sm',
    boxShadow: 'sm',
    w: 'fit-content',
    fontSize: 'sm',
    lineHeight: 1.5,
  });

  return (
    <Button className={css(buttonStyles, mergeStyles)}>
      {children}
      <svg
        viewBox="0 0 15 15"
        fill="none"
        className={css({
          w: '1rem',
          h: '1rem',
          opacity: '.9',
        })}
      >
        <path
          d="M4.182 6.182a.45.45 0 0 1 .636 0L7.5 8.864l2.682-2.682a.45.45 0 0 1 .636.636l-3 3a.45.45 0 0 1-.636 0l-3-3a.45.45 0 0 1 0-.636z"
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </svg>
    </Button>
  );
}
