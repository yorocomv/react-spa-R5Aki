import type { SystemStyleObject } from 'styled-system/types';

import { css } from 'styled-system/css';

export default function BubbleTailHeading({
  children,
  level,
  lineColor = 'violet.700',
  mergedStyles = undefined,
}: {
  children: React.ReactNode;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  lineColor?: 'violet.700' | 'rose.400' | 'emerald.400';
  mergedStyles?: SystemStyleObject;
}) {
  const baseStyles = css.raw({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: '"UD Digi Kyokasho NK-B", sans-serif',
    textShadow: 'rgba(255, 255, 255, 0.3) 1px 1px',

    '&::before, &::after': {
      content: "''",
      display: 'inline-block',
      w: '0.1665em',
      h: '1.4em',
      bgColor: lineColor === 'violet.700' ? '#6d28d9' : lineColor === 'rose.400' ? '#fb7185' : '#34d399',
    },
    '&::before': {
      mr: '1.1em',
      transform: 'rotate(-35deg)',
    },
    '&::after': {
      ml: '1.1em',
      transform: 'rotate(35deg)',
    },
  });

  switch (level) {
    case 1:
      return (
        <h1 className={css(baseStyles, mergedStyles)}>{children}</h1>
      );
    case 2:
      return (
        <h2 className={css(baseStyles, mergedStyles)}>{children}</h2>
      );
    case 3:
      return (
        <h3 className={css(baseStyles, mergedStyles)}>{children}</h3>
      );
    case 4:
      return (
        <h4 className={css(baseStyles, mergedStyles)}>{children}</h4>
      );
    case 5:
      return (
        <h5 className={css(baseStyles, mergedStyles)}>{children}</h5>
      );
    case 6:
      return (
        <h6 className={css(baseStyles, mergedStyles)}>{children}</h6>
      );
  }
};
