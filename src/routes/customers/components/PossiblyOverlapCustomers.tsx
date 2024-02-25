import { Link } from 'react-router-dom';
import React, { useMemo } from 'react';
import { TbArrowBigRightLinesFilled } from 'react-icons/tb';
import { vstack } from '../../../../styled-system/patterns/vstack';
import CustomerSummary from './CustomerSummary';
import { CustomersTbRow } from '../customers.types';
import { css } from '../../../../styled-system/css';

interface PossiblyOverlapCustomersProps {
  id: number;
  customers: CustomersTbRow[];
  setIsContinued: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PossiblyOverlapCustomers({
  id,
  customers,
  setIsContinued,
}: PossiblyOverlapCustomersProps): JSX.Element {
  const sortedCustomers = useMemo(
    () =>
      [...customers].sort((a, b) => {
        if (id === a.id) {
          return -1;
        }
        if (id === b.id) {
          return 1;
        }
        return 0;
      }),
    [id, customers],
  );
  const handleClick =
    (isContinued: boolean) =>
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_: React.MouseEvent<HTMLAnchorElement> | undefined): void => {
      setIsContinued(isContinued);
      sessionStorage.setItem('isContinued', isContinued.toString());
    };

  return (
    <section className={vstack()}>
      <h2
        className={css({
          my: 6,
          fontFamily: '"Yu Gothic UI", sans-serif',
          fontSize: '4xl',
          fontWeight: 'bold',
          fontStyle: 'italic',
          letterSpacing: '0.125em',
        })}
      >
        もしかして、、
        <span
          className={css({
            fontStyle: 'normal',
          })}
        >
          🤔
        </span>
      </h2>
      <div
        className={css({
          '& a:first-of-type': {
            pos: 'sticky',
            top: '2.25rem',
          },
          '& :first-child .customer-summary': {
            bgColor: '#AAD9BB',
            borderColor: '#80BCBD',
          },
          '& :first-child .customer-summary div:last-of-type': {
            color: 'indigo.800',
          },
        })}
      >
        {customers.length ? (
          sortedCustomers.map((customer) => (
            <Link
              key={customer.id}
              to={`/customers/${customer.id}`}
              state={customer}
              onClick={handleClick(id === customer.id)}
              className={css({
                '&:has(#chosen)': {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
                '&:has(#chosen) div:first-of-type': {
                  flex: '1',
                },
              })}
            >
              <CustomerSummary
                tel={customer.tel}
                address1={customer.address1}
                address2={customer.address2}
                address3={customer.address3}
                name1={customer.name1}
                name2={customer.name2}
                notes={customer.notes}
                invoice_type_id={customer.invoice_type_id}
              />
              {id === customer.id ? (
                <div
                  id="chosen"
                  className={css({
                    position: 'relative',
                    left: 11,
                    w: 11,
                    ml: -11,
                  })}
                >
                  <TbArrowBigRightLinesFilled
                    className={css({
                      fontSize: '1.75rem',
                      mx: 'auto',
                      color: 'lime.950',
                    })}
                  />
                </div>
              ) : null}
            </Link>
          ))
        ) : (
          <div>Oops!</div>
        )}
      </div>
    </section>
  );
}
