import Button from '@/routes/customers/components/elements/Button';
import { useState } from 'react';
import { FaRegTrashCan } from 'react-icons/fa6';
import { css } from 'styled-system/css';

interface CommonFloatingDeleteButtonProps {
  label: string;
  position?: 'fixed' | 'absolute';
  handleClickDelete: () => Promise<void>;
}

export default function CommonFloatingDeleteButton({
  label,
  position = 'fixed',
  handleClickDelete,
}: CommonFloatingDeleteButtonProps) {
  const [isInvalid, setIsInvalid] = useState(true);
  const handleCheck = () => setIsInvalid(!isInvalid);
  // https://github.com/orgs/react-hook-form/discussions/8020#discussioncomment-2584580
  function onPromise<T>(promise: (event: React.SyntheticEvent) => Promise<T>) {
    return (event: React.SyntheticEvent) => {
      if (promise) {
        promise(event).catch((error) => {
          console.error('Unexpected error', error);
        });
      }
    };
  }

  return (
    <div
      className={css({
        pos: position,
        bottom: '0.725rem',
        right: '0.725rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
      })}
    >
      <Button
        onClick={onPromise(handleClickDelete)}
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
