import { FaSort } from 'react-icons/fa';

import TooltipWrapper from '@/components/ui/TooltipWrapper';
import { css } from 'styled-system/css';

export default function ThReverseButton({
  children,
  setValue,
}: {
  children: React.ReactNode;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  return (
    <TooltipWrapper
      fillColor="teal.400"
      text="逆順に並び替え"
      className={css({ color: 'teal.950', bgColor: 'teal.400', shadow: '2xl' })}
    >
      <span
        onClick={() => setValue(prev => !prev)}
        aria-hidden="true"
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: '0.2rem',
          _hover: { cursor: 'pointer', '& svg': { color: 'teal.400' } },
        })}
      >
        {children}
        <FaSort size="1rem" className={css({ color: 'teal.600' })} />
      </span>
    </TooltipWrapper>
  );
}
