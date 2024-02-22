import { FaFilePen, FaPhone } from 'react-icons/fa6';
import { css } from '../../../../styled-system/css';
import { RequiredCustomerSummary } from '../customers.types';
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
      className={`
        customer-summary
        ${css({
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
            color: 'blue.600',
          },
          '&:hover ._react-icons_tired': {
            ml: '-0.125rem',
            fontSize: '2xl',
            color: 'red.600',
          },
          '&:hover ._react-icons_pen-nib': {
            color: 'orange.600',
          },
        })}`}
    >
      <div
        className={css({
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          fontSize: 'sm',
          fontWeight: 'bold',
          '& span, & svg': {
            display: 'inline-block',
          },
          '& .property-svg-icons svg': {
            fontSize: 'lg',
            mx: 1,
          },
          '&:has(svg._react-icons_tired)': {
            lineHeight: '2rem',
          },
        })}
      >
        <span>
          <FaPhone
            className={css({
              display: 'inline-block',
              verticalAlign: 'middle',
              fontSize: '0.75rem',
              mr: '1px',
            })}
          />
          {tel}
        </span>
        <span
          className={`property-svg-icons ${css({
            justifySelf: 'end',
          })}`}
        >
          {notes ? (
            <FaFilePen
              title="メモがあり〼"
              className={`_react-icons_file-pen ${css({
                color: 'blue.400',
                '&:has(+ svg)': {
                  mr: 0,
                },
              })}`}
            />
          ) : (
            ''
          )}
          <InvoiceIconSwitcher invoiceType={invoice_type_id} />
        </span>
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
            bgColor: 'indigo.600',
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
