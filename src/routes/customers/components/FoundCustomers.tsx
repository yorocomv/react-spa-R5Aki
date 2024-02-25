import { Link, useOutletContext } from 'react-router-dom';
import { vstack } from '../../../../styled-system/patterns/vstack';
import CustomerSummary from './CustomerSummary';
import { CustomersTbRow } from '../customers.types';

export default function FoundCustomers() {
  const { latestCommunicationTime, customers }: { latestCommunicationTime: string; customers: CustomersTbRow[] } =
    useOutletContext();
  if (sessionStorage.getItem('isContinued')) {
    sessionStorage.removeItem('isContinued');
  }

  return (
    <section className={vstack()}>
      <div>
        <div>{latestCommunicationTime}</div>
        {customers.length ? (
          customers.map((customer) => (
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
        ) : (
          <div>Hit 0</div>
        )}
      </div>
    </section>
  );
}
