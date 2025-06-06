import parse from 'html-react-parser';
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router';

import CustomerNotesList from '@/routes/customers/components/CustomerNotesList';
import DropdownMenu from '@/routes/customers/components/DropdownMenu';
import InvoiceNameSwitcher from '@/routes/customers/components/elementSwitchers/InvoiceNameSwitcher';
import { useCreateCustomerTsv } from '@/routes/customers/components/hooks/useCreateCustomerTsv';

import '@/routes/customers/customers.css';

import { css } from 'styled-system/css';

import type { CustomersTbRow, RequiredChooseCustomer } from '../customers.types';

export default function ChooseCustomer(): React.JSX.Element {
  const customer = useLocation().state as CustomersTbRow;
  const { id: customerId } = useParams();
  const { createCustomerTsv } = useCreateCustomerTsv();

  if (customerId && customerId !== customer.id.toString())
    throw new Error('不正なルートでのアクセスを検知しました❢');

  const {
    tel,
    zip_code,
    address1,
    address2,
    address3,
    name1,
    name2,
    nja_city,
    invoice_type_id,
  }: RequiredChooseCustomer = customer;
  let zipCodeHyphen = zip_code;
  if (/^\d{7}$/.test(zipCodeHyphen)) {
    zipCodeHyphen = `${zipCodeHyphen.slice(0, 3)}-${zipCodeHyphen.slice(3)}`;
  }
  let address1WithCityEmphasis = '';
  if (new RegExp(nja_city).test(address1)) {
    const patternStr = `(${nja_city})`;
    address1WithCityEmphasis = address1.replace(new RegExp(patternStr), '<strong>$1</strong>');
  }

  useEffect(() => {
    createCustomerTsv(customer)
      .then(result => console.log(result))
      .catch(err => console.error(err));
  }, [createCustomerTsv, customer]);

  return (
    <>
      <section
        className={css({
          display: 'grid',
          justifyContent: 'center',
        })}
      >
        <div
          id="chosen-customer-details"
          className={css({
            display: 'grid',
            gridTemplateColumns: '100%',
            fontSize: 'lg',
            m: 4,
            py: 2,
            px: 4,
            border: '1px solid rgba(0, 0, 0, .2)',
            bgColor: 'rgba(0, 0, 0, .2)',
            backdropFilter: 'blur(20px)',
            borderRadius: 'xl',
            boxShadow: 'xl',
          })}
        >
          <div
            className={css({
              mb: 4,
            })}
          >
            <InvoiceNameSwitcher invoiceType={invoice_type_id} />
          </div>
          <div
            className={css({
              fontSize: '3xl',
              fontWeight: 'bold',
              color: 'lime.600',
              textShadow: '-1px 1px 0 rgba(0, 0, 0, 0.6)',
              '&::selection': {
                color: 'slate.50',
                bgColor: 'indigo.600',
                textShadow: 'none',
              },
            })}
          >
            {name1}
          </div>
          <div
            className={css({
              fontSize: '2xl',
              fontWeight: 'bold',
              color: 'lime.600',
              textShadow: '-1px 1px 0 rgba(0, 0, 0, 0.6)',
              '&::selection': {
                color: 'slate.50',
                bgColor: 'indigo.600',
                textShadow: 'none',
              },
            })}
          >
            {name2}
          </div>
          <div
            className={css({
              mt: 10,
              justifySelf: 'right',
            })}
          >
            <div
              className={css({
                display: 'grid',
                gridTemplateColumns: 'auto auto',
              })}
            >
              <div
                className={css({
                  mr: '0.8rem',
                })}
              >
                {`〒${zipCodeHyphen}`}
              </div>
              <div>
                <div>{address1WithCityEmphasis !== '' ? parse(address1WithCityEmphasis) : address1}</div>
                <div>{address2}</div>
                <div>{address3}</div>
              </div>
            </div>
            <div>
              Tel:
              <strong>{tel}</strong>
            </div>
          </div>
        </div>
        <DropdownMenu
          label="編集 / メモを追加"
          mergeStyles={css.raw({ margin: '0 0 1.5rem auto' })}
          menuItems={[
            { label: '編集', toRelativePath: '../edit', state: customer },
            { label: 'メモを追加', toRelativePath: '../take-a-note', state: customer },
          ]}
        />
      </section>
      <CustomerNotesList customer={customer} />
      <ul id="css-anima-bg-circles">
        {
          [...Array.from({ length: 10 })].map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={`css-anima-bg-circles-${i}`} />
          ))
        }
      </ul>
    </>
  );
}
