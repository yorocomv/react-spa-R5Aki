import FormContainer from '@/components/ui/elements/FormContainer';
import Input from '@/components/ui/elements/Input';
import Select from '@/components/ui/elements/Select';
import TextArea from '@/components/ui/elements/TextArea';
import { css } from 'styled-system/css';

export default function RegisterProduct() {
  return (
    <>
      <h2 className={css({
        mx: 'auto',
        p: 2,
        textAlign: 'center',
        fontSize: '3xl',
        fontWeight: 'bold',
      })}
      >
        商品新規登録
      </h2>
      <FormContainer>
        <form>
          <label htmlFor="basic_name">
            商品カタログ掲載名
            <Input id="basic_name" placeholder="商品カタログ掲載名" />
          </label>
          <label htmlFor="jan_code">
            ＪＡＮコード
            <Input id="jan_code" placeholder="ＪＡＮコード" />
          </label>
          <label htmlFor="sourcing_type">
            製造販売タイプ
            <Select id="sourcing_type">
              <option key="dummy01" value="dummy01">🐛自社製造自社製品</option>
              <option key="dummy02" value="dummy02">🐝ＯＥＭ委託商品</option>
              <option key="dummy03" value="dummy03">🐞ＯＥＭ受託製品</option>
              <option key="dummy04" value="dummy04">🦗仕入れ商品</option>
            </Select>
          </label>
          <label htmlFor="category">
            商品カテゴリー
            <Select id="category">
              <option key="dummy01" value="dummy01">🐛カテゴリーＡ</option>
              <option key="dummy02" value="dummy02">🐝カテゴリーＢ</option>
              <option key="dummy03" value="dummy03">🐞カテゴリーＣ</option>
              <option key="dummy04" value="dummy04">🦗カテゴリーＤ</option>
            </Select>
          </label>
          <label htmlFor="packaging_type">
            商品パッケージタイプ
            <Select id="packaging_type">
              <option key="dummy01" value="dummy01">🐛パッケージＡ</option>
              <option key="dummy02" value="dummy02">🐝パッケージＢ</option>
              <option key="dummy03" value="dummy03">🐞パッケージＣ</option>
              <option key="dummy04" value="dummy04">🦗パッケージＤ</option>
            </Select>
          </label>
          <div aria-labelledby="expiration">
            <label htmlFor="expiration_value">
              賞味期限（期間）
            </label>
            <div className={css({
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center',
            })}
            >
              <Input
                id="expiration_value"
                type="number"
                placeholder="賞味期限（期間）"
                className={css({ w: '10.25rem' })}
              />
              <Select id="packaging_type">
                <option key="dummy01" value="dummy01">🐛年</option>
                <option key="dummy02" value="dummy02">🐝月</option>
                <option key="dummy03" value="dummy03">🐞日</option>
              </Select>
            </div>
          </div>
          <label htmlFor="predecessor_id">
            先代商品ＩＤ
            <Input id="predecessor_id" placeholder="先代商品ＩＤ" />
          </label>
          {/* ------- /basic_products ------- */}
          <label htmlFor="basic_id">
            ＢＡＳＩＣ－ＩＤ
            <Input id="basic_id" placeholder="ＢＡＳＩＣ－ＩＤ" />
          </label>
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
          {/* /products */}
          <label htmlFor="product_id">
            ＰＲＯＤＵＣＴ－ＩＤ
            <Input id="product_id" placeholder="ＰＲＯＤＵＣＴ－ＩＤ" />
          </label>
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
          {/* /product_components */}
          <label htmlFor="product_id">
            ＰＲＯＤＵＣＴ－ＩＤ
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
          {/* /product_combinations */}
          <label htmlFor="product_id">
            ＰＲＯＤＵＣＴ－ＩＤ
            <Input id="product_id" placeholder="ＰＲＯＤＵＣＴ－ＩＤ" />
          </label>
          <label htmlFor="skus_name">
            ＳＫＵ名
            <Input id="skus_name" placeholder="ＳＫＵ名" />
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
          {/* /product_skus */}
        </form>
      </FormContainer>
    </>
  );
}
