import Input from '@/components/ui/elements/Input';
import Select from '@/components/ui/elements/Select';
import { css } from 'styled-system/css';

interface ProductComponentsFormContentsProps {
  drawContents?: { product_id?: boolean };
}

export default function ProductComponentsFormContents({ drawContents }: ProductComponentsFormContentsProps) {
  return (
    <>
      {drawContents?.product_id
        ? (
            <label htmlFor="product_id">
              ＰＲＯＤＵＣＴ－ＩＤ
              <Input id="product_id" placeholder="ＰＲＯＤＵＣＴ－ＩＤ" />
            </label>
          )
        : null}
      <label htmlFor="product_title">
        内容物名
        <Input id="product_title" placeholder="内容物名" />
      </label>
      <label htmlFor="symbol">
        記号
        <Input id="symbol" placeholder="記号" />
      </label>
      <div aria-labelledby="expiration">
        <label htmlFor="amount">
          内容量
        </label>
        <div className={css({
          display: 'flex',
          gap: '0.5rem',
          alignItems: 'center',
        })}
        >
          <Input
            id="amount"
            type="number"
            placeholder="個別内容量"
            className={css({ w: '10.25rem' })}
          />
          <Select id="unit_type">
            <option key="dummy01" value="dummy01">🐛ｇ</option>
          </Select>
          <Input
            id="pieces"
            type="number"
            placeholder="商品入数"
            className={css({ w: '10.25rem' })}
          />
        </div>
      </div>
      <label htmlFor="category">
        小分けパッケージタイプ
        <Select id="category">
          <option key="dummy01" value="dummy01">🐛タイプＡ</option>
          <option key="dummy02" value="dummy02">🐝タイプＢ</option>
          <option key="dummy03" value="dummy03">🐞タイプＣ</option>
          <option key="dummy04" value="dummy04">🦗タイプＤ</option>
        </Select>
      </label>
    </>
  );
}
