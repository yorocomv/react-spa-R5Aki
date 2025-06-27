import Input from '@/components/ui/elements/Input';
import { css } from 'styled-system/css';

export default function ProductCombinationsFormContents() {
  return (
    <>
      <label htmlFor="product_id">
        ＰＲＯＤＵＣＴ－ＩＤ（自分自身）
        <Input id="product_id" placeholder="ＰＲＯＤＵＣＴ－ＩＤ" />
      </label>
      <label htmlFor="item_product_id">
        セット内訳 ＰＲＯＤＵＣＴ－ＩＤ
        <Input id="item_product_id" placeholder="セット内訳 ＰＲＯＤＵＣＴ－ＩＤ" />
      </label>
      <label htmlFor="combinations_quantity">
        セット内訳入数
        <Input
          id="combinations_quantity"
          type="number"
          placeholder="セット内訳入数"
          className={css({ w: '10.25rem' })}
        />
      </label>
    </>
  );
}
