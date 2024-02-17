import React from 'react';
import { css } from '../../../../../styled-system/css';

function FormContainer({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={css({
        w: 'prose',
        mx: 'auto',
        my: '1rem',
        p: '1rem',
        color: '#49274a',
        bgColor: '#f8eee7',
        borderWidth: '1px',
        borderColor: 'slate.200',
        borderRadius: 'sm',
        boxShadow: 'sm',
      })}
    >
      {children}
    </div>
  );
}

export default FormContainer;
