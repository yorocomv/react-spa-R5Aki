/* eslint no-irregular-whitespace: ["error", { "skipTemplates": true }] */
import { css } from '../../styled-system/css';
import { RequiredCustomerSummary } from '../routes/customers/customers.types';

export default function CustomerSummary({
  tel,
  address1,
  address2,
  address3,
  name1,
  name2,
  notes,
  invoice_type_id,
}: RequiredCustomerSummary): JSX.Element {
  const nameII = name2.replace(/\s{2,}/g, '　');
  const addressII = address2.replace(/\s{2,}/g, '　');
  const addressIII = address3.replace(/\s{2,}/g, '　');
  return (
    <div
      className={css({
        maxWidth: '37rem',
        minWidth: '32rem',
        mx: 1,
        my: 6,
        px: 2,
        py: 1,
        borderRadius: 'md',
        bgColor: '#E1D7C9',
        borderWidth: '1px',
        borderColor: 'rgba(255, 255, 255, 0.36)',
        boxShadow: 'md',
        _hover: { bgColor: '#E7DED3' },
      })}
    >
      <div className={css({ fontSize: 'sm', fontWeight: 'bold' })}>{tel}</div>
      <div className={css({ textWrap: 'balance', fontSize: 'md', fontWeight: 'bold' })}>
        {address1}
        {`　${addressII}`}
        {`　${addressIII}`}
      </div>
      <div
        className={css({
          textWrap: 'balance',
          fontSize: 'xl',
          fontWeight: 'bold',
          color: 'lime.800',
          textShadow: '1px 1px 1px rgba(255, 255, 255, 0.6)',
        })}
      >
        {name1}
        {`　${nameII}`}
      </div>
      <div>{notes ? '📝' : '📝'}</div>
      <div>{invoice_type_id === 2 ? '😫' : '😫'}</div>
    </div>
  );
}
