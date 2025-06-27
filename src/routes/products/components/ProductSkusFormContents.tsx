import Input from '@/components/ui/elements/Input';
import Select from '@/components/ui/elements/Select';
import { css } from 'styled-system/css';

export default function ProductSkusFormContents() {
  return (
    <>
      <label htmlFor="skus_name">
        ＳＫＵ名
        <Input id="skus_name" placeholder="ＳＫＵ名" />
      </label>
      <label htmlFor="product_id">
        ＰＲＯＤＵＣＴ－ＩＤ
        <Input id="product_id" placeholder="ＰＲＯＤＵＣＴ－ＩＤ" />
      </label>
      <label htmlFor="case_quantity">
        ケース入数
        <Input
          id="case_quantity"
          type="number"
          placeholder="ケース入数"
          className={css({ w: '10.25rem' })}
        />
      </label>
      <label htmlFor="itf_case_code">
        ＩＴＦコード（ケース）
        <Input id="itf_case_code" placeholder="ＩＴＦコード（ケース）" />
      </label>
      <fieldset>
        <legend>ケースサイズ mm（縦・横・高さ）</legend>
        <div className={css({
          display: 'flex',
          gap: '0.5rem',
          alignItems: 'center',
        })}
        >
          <Input
            id="case_depth_mm"
            type="number"
            placeholder="縦 mm"
            className={css({ w: '10.25rem' })}
          />
          <Input
            id="case_width_mm"
            type="number"
            placeholder="横 mm"
            className={css({ w: '10.25rem' })}
          />
          <Input
            id="case_height_mm"
            type="number"
            placeholder="高さ mm"
            className={css({ w: '10.25rem' })}
          />
        </div>
      </fieldset>
      <label htmlFor="case_weight_g">
        ケース重量 g
        <Input
          id="case_weight_g"
          type="number"
          placeholder="重量 g"
          className={css({ w: '10.25rem' })}
        />
      </label>
      <label htmlFor="inner_carton_quantity">
        ボール入数
        <Input
          id="inner_carton_quantity"
          type="number"
          placeholder="ボール入数"
          className={css({ w: '10.25rem' })}
        />
      </label>
      <label htmlFor="itf_inner_carton_code">
        ＩＴＦコード（ボール）
        <Input id="itf_inner_carton_code" placeholder="ＩＴＦコード（ボール）" />
      </label>
      <fieldset>
        <legend>ボールサイズ mm（縦・横・高さ）</legend>
        <div className={css({
          display: 'flex',
          gap: '0.5rem',
          alignItems: 'center',
        })}
        >
          <Input
            id="inner_carton_depth_mm"
            type="number"
            placeholder="縦 mm"
            className={css({ w: '10.25rem' })}
          />
          <Input
            id="inner_carton_width_mm"
            type="number"
            placeholder="横 mm"
            className={css({ w: '10.25rem' })}
          />
          <Input
            id="inner_carton_height_mm"
            type="number"
            placeholder="高さ mm"
            className={css({ w: '10.25rem' })}
          />
        </div>
      </fieldset>
      <label htmlFor="inner_carton_weight_g">
        ボール重量 g
        <Input
          id="inner_carton_weight_g"
          type="number"
          placeholder="重量 g"
          className={css({ w: '10.25rem' })}
        />
      </label>
      <label htmlFor="skus_priority">
        在庫チェック重要レベル
        <Select id="skus_priority">
          <option key="A" value="A">🐛Ａ</option>
          <option key="B" value="B">🐝Ｂ</option>
          <option key="C" value="C">🐞Ｃ</option>
        </Select>
      </label>
    </>
  );
}
