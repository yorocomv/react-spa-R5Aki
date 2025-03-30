import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router';
import { FaRegTrashCan } from 'react-icons/fa6';
import Button from './elements/Button';
import { css } from '../../../../styled-system/css';
import { useDeleteCustomer } from './hooks/useDeleteCustomer';
import { useDeleteCustomersInBulk } from './hooks/useDeleteCustomersInBulk';
import { useDeleteNote } from '../../notes/components/hooks/useDeleteNote';
import { CustomersTbRow } from '../customers.types';

interface FloatingDeleteButtonProps {
  customer: CustomersTbRow;
  label: string;
  deleteFlaggedNumbers?: number[];
}

export default function FloatingDeleteButton({
  customer,
  label,
  deleteFlaggedNumbers = [],
}: FloatingDeleteButtonProps) {
  // `/:id/edit` と `/:id/take-a-note` と `/:id/checking-overlap` の３パターン
  const { pathname } = useLocation();
  const { id: customerId } = useParams();

  if (customerId && customerId !== customer.id.toString()) throw new Error('不正なルートでのアクセスを検知しました❢');

  const [isInvalid, setIsInvalid] = useState(true);
  const handleCheck = () => setIsInvalid(!isInvalid);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentRank = searchParams.get('rank') ?? 0;

  const { deleteCustomer } = useDeleteCustomer(parseInt(customerId ?? '0', 10));
  const { deleteCustomersInBulk } = useDeleteCustomersInBulk();
  const { deleteNote } = useDeleteNote(parseInt(customerId ?? '0', 10));

  const handleClickDelete = async () => {
    try {
      if (customerId) {
        if (/\/take-a-note/.test(pathname) && currentRank) {
          const response = await deleteNote(parseInt(currentRank, 10));
          console.log(response);
          // https://github.com/remix-run/react-router/issues/12348
          Promise.resolve(navigate(`/customers/${customer.id}/decide`, { state: customer })).catch((err: string) => {
            throw new Error(err);
          });
        } else if (/\/checking-overlap/.test(pathname) && deleteFlaggedNumbers.length > 0) {
          const response = await deleteCustomersInBulk(deleteFlaggedNumbers);
          console.log(response);
          // https://github.com/remix-run/react-router/issues/12348
          Promise.resolve(navigate(`/customers/${customer.id}/decide`, { state: customer })).catch((err: string) => {
            throw new Error(err);
          });
        } else if (/\/edit/.test(pathname) && deleteFlaggedNumbers.length === 0) {
          const response = await deleteCustomer();
          console.log(response);
          // https://github.com/remix-run/react-router/issues/12348
          Promise.resolve(navigate('/customers')).catch((err: string) => {
            throw new Error(err);
          });
        } else {
          throw new Error('想定外の削除イベントが発生しました🔥');
        }
      }
    } catch (err: unknown) {
      console.error('💥💥💥 ', err, ' 💀💀💀');
    }
  };
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

  useEffect(() => {
    if (currentRank) {
      const checkBox = document.getElementById('validate-delete-checkbox') as HTMLInputElement;
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
