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
    textShadow: 'rgba(0, 0, 0, 0.2) 1px 1px',

    '&::before, &::after': {
      content: "''",
      w: '0.3125rem',
      h: '2.55rem',
      bgColor: lineColor,
    },
    '&::before': {
      mr: '2.125rem',
      transform: 'rotate(-35deg)',
    },
    '&::after': {
      ml: '2.125rem',
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
