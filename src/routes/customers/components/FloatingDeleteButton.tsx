import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaRegTrashCan } from 'react-icons/fa6';
import Button from './elements/Button';
import { css } from '../../../../styled-system/css';

interface FloatingDeleteButtonProps {
  label: string;
}

export default function FloatingDeleteButton({ label }: FloatingDeleteButtonProps) {
  const [isInvalid, setIsInvalid] = useState(true);
  const handleCheck = () => setIsInvalid(!isInvalid);
  const [searchParams] = useSearchParams();
  const currentRank = searchParams.get('rank') ?? 0;

  useEffect(() => {
    const checkBox = document.getElementById('validate-delete-checkbox') as HTMLInputElement;
    if (currentRank) {
      if (checkBox) {
        checkBox.checked = false;
      }
      setIsInvalid(true);
    }
  }, [currentRank]);

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
      <input id="validate-delete-checkbox" type="checkbox" onChange={handleCheck} />
    </div>
  );
}
