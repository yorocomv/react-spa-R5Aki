import { Link, useLocation } from 'react-router-dom';
import parse from 'html-react-parser';
import { css } from '../../../styled-system/css';
import InvoiceNameSwitcher from './components/InvoiceNameSwitcher';
import { CustomersTbRow, RequiredChooseCustomerTbRow } from './customers.types';
import './customers.css';

export default function ChooseCustomer(): JSX.Element {
  const customer = useLocation().state as CustomersTbRow;
  const {
    tel,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    zip_code,
    address1,
    address2,
    address3,
    name1,
    name2,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    nja_city,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    invoice_type_id,
  }: RequiredChooseCustomerTbRow = customer;
  let zipCodeHyphen = zip_code;
  if (/^[0-9]{7}$/.test(zipCodeHyphen)) {
    zipCodeHyphen = `${zipCodeHyphen.slice(0, 3)}-${zipCodeHyphen.slice(3)}`;
  }
  let address1WithCityEmphasis = '';
  if (new RegExp(nja_city).test(address1)) {
    const patternStr = `(${nja_city})`;
    address1WithCityEmphasis = address1.replace(new RegExp(patternStr), '<strong>$1</strong>');
  }

  return (
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
          m: 8,
          py: 3,
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
          <div>
            {/* eslint-disable-next-line no-irregular-whitespace */}
            {`〒${zipCodeHyphen}　`}
            {address1WithCityEmphasis !== '' ? parse(address1WithCityEmphasis) : address1}
          </div>
          <div>{address2}</div>
          <div>{address3}</div>
          <div>
            Tel:<strong>{tel}</strong>
          </div>
        </div>
      </div>
      <Link to="../edit" relative="path">
        <div>編集</div>
      </Link>
      <ul id="css-anima-bg-circles">
        {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          [...Array(10)].map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={`css-anima-bg-circles-${i}`} />
          ))
        }
      </ul>
    </section>
  );
}