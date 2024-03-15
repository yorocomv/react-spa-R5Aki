import { css } from '../../../styled-system/css';
import CustomerForm from './components/CustomerForm';
import FormContainer from './components/elements/FormContainer';

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
        新規顧客情報登録
      </h2>
      <FormContainer>
        <CustomerForm />
      </FormContainer>
    </>
  );
}
