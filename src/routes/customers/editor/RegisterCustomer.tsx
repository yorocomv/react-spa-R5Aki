import BubbleTailHeading from '@/components/ui/elements/BubbleTailHeading';
import FormContainer from '@/components/ui/elements/FormContainer';
import FloatingLinkIcon from '@/components/ui/FloatingLinkIcon';
import CustomerForm from '@/routes/customers/components/CustomerForm';
import { css } from 'styled-system/css';

export default function RegisterCustomer() {
  return (
    <>
      <BubbleTailHeading
        level={2}
        lineColor="rose.400"
        mergedStyles={css.raw({
          p: 2,
          fontSize: '3xl',
          fontWeight: 'bold',
        })}
      >
        得意先情報の登録
      </BubbleTailHeading>
      <FloatingLinkIcon relativePath="/customers" size="2rem" title="🔎検索画面に戻る" iconType="goToSearch" />
      <FormContainer>
        <CustomerForm />
      </FormContainer>
    </>
  );
}
