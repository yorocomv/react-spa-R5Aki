import FormContainer from '@/components/ui/elements/FormContainer';
import { css } from 'styled-system/css';

import ShippingInstructionForm from './components/ShippingInstructionForm';

export default function PrintHistoryCorrection() {
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
        印刷履歴の✒️修正
      </h2>
      <FormContainer>
        <ShippingInstructionForm />
      </FormContainer>
    </>
  );
}
