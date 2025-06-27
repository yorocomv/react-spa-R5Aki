import { useFormContext } from 'react-hook-form';

import Input from '@/components/ui/elements/Input';
import Select from '@/components/ui/elements/Select';
import FormErrorMessage from '@/components/ui/elementSwitchers/FormErrorMessage';
import { css } from 'styled-system/css';

import type { PostReqNewProduct } from '../products.types';

export default function BasicProductFormContents() {
  const {
    register,
    formState: { errors },
  } = useFormContext<PostReqNewProduct>();

  return (
    <>
      <label htmlFor="basic_name">
        商品カタログ掲載名
        <Input {...register('basic_name')} id="basic_name" placeholder="商品カタログ掲載名" />
        <FormErrorMessage message={errors.basic_name?.message} />
      </label>
      <label htmlFor="jan_code">
        ＪＡＮコード
        <Input
          {...register('jan_code')}
          id="jan_code"
          placeholder="ＪＡＮコード"
          className={css({ w: '12.75rem' })}
        />
        <FormErrorMessage message={errors.jan_code?.message} />
      </label>
      <label htmlFor="sourcing_type_id">
        製造販売タイプ
        <Select {...register('sourcing_type_id')} id="sourcing_type_id">
          <option key="dummy01" value="dummy01">🐛自社製造自社製品</option>
          <option key="dummy02" value="dummy02">🐝ＯＥＭ委託商品</option>
          <option key="dummy03" value="dummy03">🐞ＯＥＭ受託製品</option>
          <option key="dummy04" value="dummy04">🦗仕入れ商品</option>
        </Select>
      </label>
      <label htmlFor="category_id">
        商品カテゴリー
        <Select {...register('category_id')} id="category_id">
          <option key="dummy01" value="dummy01">🐛カテゴリーＡ</option>
          <option key="dummy02" value="dummy02">🐝カテゴリーＢ</option>
          <option key="dummy03" value="dummy03">🐞カテゴリーＣ</option>
          <option key="dummy04" value="dummy04">🦗カテゴリーＤ</option>
        </Select>
      </label>
      <label htmlFor="packaging_type_id">
        商品パッケージタイプ
        <Select {...register('packaging_type_id')} id="packaging_type_id">
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
            {...register('expiration_value')}
            id="expiration_value"
            type="number"
            placeholder="賞味期限（期間）"
            className={css({ w: '10.25rem' })}
          />
          <Select {...register('expiration_unit')} id="expiration_unit">
            <option key="dummy01" value="dummy01">🐛年</option>
            <option key="dummy02" value="dummy02">🐝月</option>
            <option key="dummy03" value="dummy03">🐞日</option>
          </Select>
        </div>
        <FormErrorMessage message={errors.expiration_value?.message} />
      </div>
      <label htmlFor="predecessor_id">
        先代商品ＩＤ
        <Input
          {...register('predecessor_id')}
          id="predecessor_id"
          type="number"
          placeholder="先代商品ＩＤ"
          className={css({ w: '10.25rem' })}
        />
        <FormErrorMessage message={errors.predecessor_id?.message} />
      </label>
    </>
  );
}
