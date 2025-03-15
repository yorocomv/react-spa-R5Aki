import { FaFilter } from 'react-icons/fa';
import { css } from 'styled-system/css';

export default function SupFilterIcon(): JSX.Element {
  return (
    <FaFilter
      size="0.625rem"
      className={css({
        display: 'inline',
        verticalAlign: 'super',
        ml: '0.2rem',
        color: 'stone.400',
      })}
    />
  );
}
