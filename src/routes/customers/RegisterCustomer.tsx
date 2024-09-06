import { css } from '../../../styled-system/css';
import CustomerForm from './components/CustomerForm';
import FormContainer from './components/elements/FormContainer';
import FloatingLinkIcon from './components/FloatingLinkIcon';

export default function RegisterCustomer() {
  return (
    <>
      <h2
        className={css({
          mx: 'auto',
          p: 2,
          textAlign: 'center',
          fontSize: '3xl',
          fontWeight: 'bold',
        })}
      >
        得意先情報
      </h2>
      <FloatingLinkIcon relativePath="/customers" size="2rem" />
      <FormContainer>
        <CustomerForm />
      </FormContainer>
    </>
  );
}
