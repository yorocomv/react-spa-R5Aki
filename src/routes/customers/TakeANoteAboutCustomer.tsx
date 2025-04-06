import { Link, useLocation, useParams } from 'react-router';

import type { CustomersTbRow } from './customers.types';

import { css } from '../../../styled-system/css';
import CustomerNoteForm from './components/CustomerNoteForm';
import FormContainer from './components/elements/FormContainer';
import FloatingLinkIcon from './components/FloatingLinkIcon';
import { useFetchNotes } from './components/hooks/useFetchNotes';
import ListOfSummaryNotesAboutCustomer from './components/ListOfSummaryNotesAboutCustomer';

export default function TakeANoteAboutCustomer(): JSX.Element {
  const customer = useLocation().state as CustomersTbRow;
  const { id: customerId } = useParams();

  if (customerId && customerId !== customer.id.toString())
    throw new Error('不正なルートでのアクセスを検知しました❢');

  const { notes } = useFetchNotes(customer.id);

  return (
    <>
      <h2
        className={css({
          mx: 'auto',
          p: 2,
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 'lg',
          textWrap: 'balance',
        })}
      >
        <Link to={`/customers/${customer.id}/decide`} state={customer}>
          {/* eslint-disable-next-line no-irregular-whitespace */}
          {`${customer.name1}　${customer.name2}`}
        </Link>
      </h2>
      <FloatingLinkIcon relativePath="/customers" size="2rem" />
      <div
        className={css({
          display: 'grid',
          px: '1rem',
          alignItems: 'center',
          gridTemplateColumns: 'repeat(auto-fit, minmax(37rem, 1fr))',
          gridGap: '1rem',
        })}
      >
        <ListOfSummaryNotesAboutCustomer notes={notes} customer={customer} mergeStyles={css.raw({ mx: 'auto' })} />
        <FormContainer>
          <CustomerNoteForm customer={customer} notes={notes} />
        </FormContainer>
      </div>
    </>
  );
}
