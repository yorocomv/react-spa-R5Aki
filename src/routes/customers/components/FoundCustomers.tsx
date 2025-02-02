import { Link, useOutletContext } from 'react-router-dom';
import { css } from 'styled-system/css';
import { vstack } from '../../../../styled-system/patterns/vstack';
import CustomerSummary from './CustomerSummary';
import { CustomersTbRow } from '../customers.types';

export default function FoundCustomers() {
  const { latestCommunicationTime, customers }: { latestCommunicationTime: string; customers: CustomersTbRow[] } =
    useOutletContext();

  return (
    <section className={vstack()}>
      <div>
        <div
          className={css({
            textAlign: 'center',
            marginY: '1rem',
          })}
        >
          <span
            className={css({
              display: 'inline-block',
              lineHeight: 1.3,
              px: '0.4rem',
              borderRadius: 'md',
              fontFamily: 'Times New Roman',
              fontSize: '1.125rem',
              fontWeight: 'bold',
              color: 'orange.500',
              bgColor: 'orange.200',
              bgGradient: 'to-r',
              gradientFrom: 'orange.200',
              gradientTo: 'orange.100',
              opacity: '0.6',
              boxShadow: 'lg',
            })}
          >{`${customers.length} hit(s) / ${latestCommunicationTime} sec`}</span>
        </div>
        {customers.length
          ? customers.map((customer) => (
              <Link key={customer.id} to={`./${customer.id}`} state={customer}>
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
              </Link>
            ))
          : latestCommunicationTime !== '0' && (
              <div>
                <span className={css({ bg: 'linear-gradient(transparent 40%, rgba(255, 105, 180, 0.6) 40%)' })}>
                  🔍️検索ワードを変えて再度お試しください🙇‍♂️
                </span>
              </div>
            )}
      </div>
    </section>
  );
}
