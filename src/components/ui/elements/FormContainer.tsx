import React from 'react';

import type { SystemStyleObject } from 'styled-system/types';

import { css } from 'styled-system/css';

export default function FormContainer({
  children,
  mergedStyles = undefined,
}: {
  children: React.ReactNode;
  mergedStyles?: SystemStyleObject;
}) {
  return (
    <div
      className={css({
        w: 'fit-content',
        mx: 'auto',
        my: '1rem',
        px: '1.8rem',
        py: '1rem',
        color: '#49274a',
        bgColor: '#f8eee7',
        borderWidth: '1px',
        borderColor: 'slate.200',
        borderRadius: 'lg',
        boxShadow: 'md',
        '& fieldset > legend + div:has(+ [class*="error"]) > input, & fieldset > legend + div:has(+ [class*="error"]) > input:focus, & label + div:has(+ [class*="error"]) > input, & label + div:has(+ [class*="error"]) > input:focus, & label + div:has(+ [class*="error"]) > select, & label:has(+ [class*="error"]) > input, & label:has(+ [class*="error"]) > input:focus, input:has(+ [class*="error"]), input:focus:has(+ [class*="error"])':
          {
            borderWidth: 0,
            bgColor: 'pink.100',
            outline: 'solid 0.1rem #ec4899',
          },
        '& fieldset > legend + div ~ [class*="error"], & label + div ~ [class*="error"], & label + [class*="error"], input + [class*="error"]': {
          color: 'rose.600',
        },
      }, mergedStyles)}
    >
      {children}
    </div>
  );
}
