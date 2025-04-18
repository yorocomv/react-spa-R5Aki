import FormContainer from '@/components/ui/elements/FormContainer';
import CustomerForm from '@/routes/customers/components/CustomerForm';
import FloatingLinkIcon from '@/routes/customers/components/FloatingLinkIcon';
import { css } from 'styled-system/css';

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
