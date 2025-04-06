import { FaHandPointUp } from 'react-icons/fa';

import { css } from '../../../../../styled-system/css';

interface FormErrorMessageProps {
  message: string | undefined;
}

export default function FormErrorMessage({ message }: FormErrorMessageProps): JSX.Element | null {
  if (message) {
    return (
      <p
        className={`validation-error ${css({
          display: 'flex',
          alignItems: 'center',
        })}`}
      >
        <FaHandPointUp
          className={css({
            display: 'inline-block',
            mr: '0.25rem',
            color: 'amber.400',
            filter: 'drop-shadow(-1px 1px 0 #d97706)',
          })}
        />
        <span>{message}</span>
      </p>
    );
  }
  return null;
}
