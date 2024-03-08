import React from 'react';
import { css } from '../../../../../styled-system/css';

export default function FormContainer({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={css({
        w: '37rem',
        mx: 'auto',
        my: '1rem',
        p: '1rem',
        color: '#49274a',
        bgColor: '#f8eee7',
        borderWidth: '1px',
        borderColor: 'slate.200',
        borderRadius: 'sm',
        boxShadow: 'sm',
        '& label:has(+ [class*="error"]) > input, & label:has(+ [class*="error"]) > input:focus, input:has(+ [class*="error"]), input:focus:has(+ [class*="error"])':
          {
            borderWidth: 0,
            bgColor: 'pink.100',
            outline: 'solid 0.1rem #ec4899',
          },
        '& label + [class*="error"], input + [class*="error"]': {
          color: 'rose.600',
        },
      })}
    >
      {children}
    </div>
  );
}
