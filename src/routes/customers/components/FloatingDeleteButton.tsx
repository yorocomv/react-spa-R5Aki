import { useState } from 'react';
import { FaRegTrashCan } from 'react-icons/fa6';
import Button from './elements/Button';
import { css } from '../../../../styled-system/css';

interface FloatingDeleteButtonProps {
  label: string;
}

export default function FloatingDeleteButton({ label }: FloatingDeleteButtonProps) {
  const [isInvalid, setIsInvalid] = useState(true);
  const handleCheck = () => setIsInvalid(!isInvalid);

  return (
    <div
      className={css({
        pos: 'fixed',
        bottom: '0.725rem',
        right: '0.725rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
      })}
    >
      <Button
        disabled={isInvalid}
        variant="unsafe"
        className={css({
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          lineHeight: '1.5',
        })}
      >
        <FaRegTrashCan className={css({ display: 'inline-block' })} />
        {label}
      </Button>
      <input type="checkbox" onChange={handleCheck} />
    </div>
  );
}
