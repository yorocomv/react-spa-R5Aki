import { css } from '../../../../styled-system/css';

interface InvoiceNameSwitcherProps {
  invoiceType: number;
}

export default function InvoiceNameSwitcher({ invoiceType }: InvoiceNameSwitcherProps): JSX.Element {
  switch (invoiceType) {
    case 1:
      return (
        <span
          data-invoice-type={invoiceType}
          className={css({
            borderBottom: '.175rem solid #ce9eff',
          })}
        >
          伝票区分が未設定
        </span>
      );
    case 2:
      return (
        <span
          data-invoice-type={invoiceType}
          className={css({
            borderBottom: '.175rem solid #7fff7f',
          })}
        >
          仮伝
        </span>
      );
    case 3:
      return (
        <span
          data-invoice-type={invoiceType}
          className={css({
            borderBottom: '.175rem solid #ff7f7f',
          })}
        >
          本伝 (SMILE)
        </span>
      );
    case 4:
      return (
        <span
          data-invoice-type={invoiceType}
          className={css({
            borderBottom: '.175rem solid #ffbf7f',
          })}
        >
          専用伝票
        </span>
      );
    default:
      return (
        <span
          data-invoice-type={invoiceType}
          className={css({
            borderBottom: '.175rem solid #7f00ff',
          })}
        >
          伝票区分が古いようです
        </span>
      );
  }
}
