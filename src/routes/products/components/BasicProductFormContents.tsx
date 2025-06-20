import { useFormContext } from 'react-hook-form';

import Input from '@/components/ui/elements/Input';
import Select from '@/components/ui/elements/Select';
import FormErrorMessage from '@/components/ui/elementSwitchers/FormErrorMessage';
import { css } from 'styled-system/css';

export default function BasicProductFormContents() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <label htmlFor="basic_name">
        商品カタログ掲載名
        <Input {...register('basic_name')} id="basic_name" placeholder="商品カタログ掲載名" />
      </label>
      <FormErrorMessage message={errors.name?.message as string} />
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
    </>
  );
}
