import Input from '@/components/ui/elements/Input';
import Select from '@/components/ui/elements/Select';
import TextArea from '@/components/ui/elements/TextArea';
import { css } from 'styled-system/css';

interface ProductFormContentsProps {
  drawContents?: { basic_id?: boolean };
}

export default function ProductFormContents({ drawContents }: ProductFormContentsProps) {
  return (
    <>
      {drawContents?.basic_id
        ? (
            <label htmlFor="basic_id">
              ＢＡＳＩＣ－ＩＤ
              <Input id="basic_id" placeholder="ＢＡＳＩＣ－ＩＤ" />
            </label>
          )
        : null}
      <label htmlFor="packaging_type">
        発注先
        <Select id="packaging_type">
          <option key="dummy01" value="dummy01">🐛発注先Ａ</option>
          <option key="dummy02" value="dummy02">🐝発注先Ｂ</option>
          <option key="dummy03" value="dummy03">🐞発注先Ｃ</option>
          <option key="dummy04" value="dummy04">🦗発注先Ｄ</option>
        </Select>
      </label>
      <label htmlFor="product_name">
        {/* バリエーションがない場合は basic_products.name のコピー */}
        商品名称
        <Input id="product_name" placeholder="商品名称" />
      </label>
      <label htmlFor="short_name">
        商品略称名
        <Input id="short_name" placeholder="商品略称名" />
      </label>
      <label htmlFor="internal_code">
        発注コード（社内コード）
        <Input id="internal_code" placeholder="発注コード（社内コード）" />
      </label>
      <label htmlFor="is_set_product">
        セット商品（ｎ／Ｙ）
        <Select id="is_set_product">
          <option key="false" value={0}>ＮＯ</option>
          <option key="true" value={1}>ＹＥＳ</option>
        </Select>
      </label>
      <fieldset>
        <legend>商品サイズ mm（縦・横・高さ）</legend>
        <div className={css({
          display: 'flex',
          gap: '0.5rem',
          alignItems: 'center',
        })}
        >
          <Input
            id="depth_mm"
            type="number"
            placeholder="縦 mm"
            className={css({ w: '10.25rem' })}
          />
          <Input
            id="width_mm"
            type="number"
            placeholder="横 mm"
            className={css({ w: '10.25rem' })}
          />
          <Input
            id="height_mm"
            type="number"
            placeholder="高さ mm"
            className={css({ w: '10.25rem' })}
          />
        </div>
      </fieldset>
      <fieldset>
        <legend>商品サイズ mm（直径・高さ）</legend>
        <div className={css({
          display: 'flex',
          gap: '0.5rem',
          alignItems: 'center',
        })}
        >
          <Input
            id="diameter_mm"
            type="number"
            placeholder="φ mm"
            className={css({ w: '10.25rem' })}
          />
          <Input
            id="height_mm"
            type="number"
            placeholder="高さ mm"
            className={css({ w: '10.25rem' })}
          />
        </div>
      </fieldset>
      <label htmlFor="weight_g">
        商品重量 g
        <Input
          id="weight_g"
          type="number"
          placeholder="重量 g"
          className={css({ w: '10.25rem' })}
        />
      </label>
      <label htmlFor="delivery_date">
        終売予定日
        <Input
          id="discontinued_date"
          type="date"
          placeholder="終売予定日"
          className={css({
            w: '12rem',
          })}
        />
      </label>
      <label htmlFor="note">
        メモ
        <TextArea
          id="note"
          placeholder="メモ"
          className={css({
            w: '34.5rem',
            h: '3.5rem',
          })}
        />
      </label>
    </>
  );
}
