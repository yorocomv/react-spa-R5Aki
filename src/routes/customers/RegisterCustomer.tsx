import { css } from '../../../styled-system/css';
import CustomerInputs from './components/CustomerInputs';
import Button from './components/elements/Button';
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
        <CustomerInputs />
        <div
          className={css({
            mt: 4,
          })}
        >
          <Button>登録</Button>
          <Button
            variant="redo"
            className={css({
              ml: 1,
            })}
          >
            クリア
          </Button>
        </div>
      </FormContainer>
    </>
  );
}
