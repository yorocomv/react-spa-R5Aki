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
            w: 'fit-content',
            lineHeight: 1.1,
            marginX: 'auto',
            marginY: '1rem',
            px: '0.125rem',
            fontWeight: 'bold',
            color: 'orange.900',
            bgColor: 'orange.200',
          })}
        >{`${customers.length} hit(s) / ${latestCommunicationTime} sec`}</div>
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
          : latestCommunicationTime !== '0' && <div>🔍️検索ワードを変えて再度お試しください🙇</div>}
      </div>
    </section>
  );
}
