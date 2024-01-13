import { FaFilePen } from 'react-icons/fa6';
import { css } from '../../styled-system/css';
import { RequiredCustomerSummary } from '../routes/customers/customers.types';
import InvoiceIconSwitcher from './InvoiceIconSwitcher';

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
        maxW: '36rem',
        minW: '27.75rem',
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
        '&:hover ._react-icons_file-pen': {
          color: 'sky.600',
        },
        '&:hover ._react-icons_tired': {
          fontSize: '2xl',
          color: 'rose.600',
        },
        '&:hover ._react-icons_pen-nib': {
          color: 'orange.600',
        },
      })}
    >
      <div
        className={css({
          fontSize: 'sm',
          fontWeight: 'bold',
          '&> span, svg': {
            verticalAlign: 'middle',
          },
          '&> svg': {
            display: 'inline-block',
            fontSize: 'lg',
            m: 1,
          },
          '&:has(> svg._react-icons_tired)': {
            lineHeight: '2rem',
          },
        })}
      >
        <span>{tel}</span>
        {notes ? (
          <FaFilePen
            title="メモがあり〼"
            className={`_react-icons_file-pen ${css({
              color: 'sky.400',
              '&:has(+ svg)': {
                mr: 0,
              },
            })}`}
          />
        ) : (
          ''
        )}
        <InvoiceIconSwitcher invoiceType={invoice_type_id} />
      </div>
      <div className={css({ textWrap: 'balance', fontSize: 'md', fontWeight: 'bold' })}>
        {address1}
        {/* eslint-disable-next-line no-irregular-whitespace */}
        {addressII ? `　${addressII}` : ''}
        {/* eslint-disable-next-line no-irregular-whitespace */}
        {addressIII ? `　${addressIII}` : ''}
      </div>
      <div
        className={css({
          textWrap: 'balance',
          fontSize: 'xl',
          fontWeight: 'bold',
          color: 'lime.800',
          textShadow: '-1px 1px 0 rgba(255, 255, 255, 0.6)',
          '&::selection': {
            color: 'slate.50',
            bgColor: 'indigo.300',
            textShadow: 'none',
          },
        })}
      >
        {name1}
        {/* eslint-disable-next-line no-irregular-whitespace */}
        {nameII ? `　${nameII}` : ''}
      </div>
    </div>
  );
}
