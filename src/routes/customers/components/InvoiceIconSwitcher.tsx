import { FaPenNib } from 'react-icons/fa6';
import { TbDatabaseSmile } from 'react-icons/tb';

import { css } from '../../../../styled-system/css';

interface InvoiceIconSwitcherProps {
  invoiceType: number;
}

export default function InvoiceIconSwitcher({ invoiceType }: InvoiceIconSwitcherProps): React.JSX.Element | null {
  switch (invoiceType) {
    case 3:
      return (
        <TbDatabaseSmile
          title="本伝 (SMILE)"
          className={`_react-icons_db-smile ${css({
            color: 'red.400',
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
