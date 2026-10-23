import { FaHandPointUp } from 'react-icons/fa';

import type { SpacingToken } from 'styled-system/tokens';
import type { AnyString, ConditionalValue, Number, String } from 'styled-system/types';
import type { Property } from 'styled-system/types/csstype';

import { css } from '../../../../styled-system/css';

interface FormErrorMessageProps {
  message: string | undefined;
  pos?: ConditionalValue<AnyString | Property.Position | readonly NonNullable<Property.Position | undefined>[] | undefined>;
  top?: ConditionalValue<AnyString | SpacingToken | `var(--${string})` | Property.Top<String | Number> | readonly NonNullable<Property.Top<String | Number> | undefined>[] | undefined>;
  left?: ConditionalValue<AnyString | SpacingToken | `var(--${string})` | Property.Left<String | Number> | readonly NonNullable<Property.Left<String | Number> | undefined>[] | undefined>;
  color?: string;
}

export default function FormErrorMessage({ message, pos, top, left, color }: FormErrorMessageProps): React.JSX.Element | null {
  if (message) {
    return (
      <p
        className={`validation-error ${css({
          display: 'flex',
          alignItems: 'center',
          pos,
          top,
          left,
        })}`}
      >
        <FaHandPointUp
          className={css({
            display: 'inline-block',
            mr: '0.25rem',
            color: 'yellow.400',
            filter: 'drop-shadow(-1px 1px 0 #d97706)',
          })}
        />
        <span className={css({ color })}>{message}</span>
      </p>
    );
  }
  return null;
}
