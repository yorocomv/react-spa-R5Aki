import { css } from '../../../../styled-system/css';

interface InvoiceNameSwitcherProps {
  invoiceType: number;
}

export default function InvoiceNameSwitcher({ invoiceType }: InvoiceNameSwitcherProps): JSX.Element {
  let text: string;
  //   https://kagesai.net/css-marker-design
  let color: string;
  switch (invoiceType) {
    case 1:
      text = '伝票区分が未設定';
      color = '#ce9eff';
      break;
    case 2:
      text = '仮伝';
      color = '#7fff7f';
      break;
    case 3:
      text = '本伝 (SMILE)';
      color = '#ff7f7f';
      break;
    case 4:
      text = '専用伝票';
      color = '#ffbf7f';
      break;
    default:
      text = '伝票区分が古いようです';
      color = '#7f00ff';
  }
  return (
    <span
      data-invoice-type={invoiceType}
      className={css({
        borderBottom: `.175rem solid ${color}`,
      })}
    >
      {text}
    </span>
  );
}
