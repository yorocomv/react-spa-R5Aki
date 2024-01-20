import { useLocation } from 'react-router-dom';
import { CustomersTbRow } from './customers.types';
import ChoiceCustomer from '../../components/ChoiceCustomer';

export default function ExamineCustomer() {
  const customer = useLocation().state as CustomersTbRow;

  return (
    <ChoiceCustomer
      tel={customer.tel}
      zip_code={customer.zip_code}
      address1={customer.address1}
      address2={customer.address2}
      address3={customer.address3}
      name1={customer.name1}
      name2={customer.name2}
      nja_city={customer.nja_city}
      invoice_type_id={customer.invoice_type_id}
    />
  );
}
