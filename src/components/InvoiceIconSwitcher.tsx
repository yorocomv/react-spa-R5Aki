import { FaFaceTired, FaPenNib } from 'react-icons/fa6';
import { css } from '../../styled-system/css';

interface InvoiceIconSwitcherProps {
  invoiceType: number;
}

export default function InvoiceIconSwitcher({ invoiceType }: InvoiceIconSwitcherProps): JSX.Element | null {
  switch (invoiceType) {
    case 3:
      return (
        <FaFaceTired
          title="本伝 (SMILE)"
          className={`_react-icons_tired ${css({
            color: 'rose.400',
          })}`}
        />
      );
    case 4:
      return (
        <FaPenNib
          title="専用伝票"
          className={`_react-icons_pen-nib ${css({
            color: 'orange.400',
          })}`}
        />
      );
    default:
      return null;
  }
}
