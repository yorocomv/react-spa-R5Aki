import { useFormContext } from 'react-hook-form';

import Input from '@/components/ui/elements/Input';
import Select from '@/components/ui/elements/Select';
import TextArea from '@/components/ui/elements/TextArea';
import FormErrorMessage from '@/components/ui/elementSwitchers/FormErrorMessage';
import { css } from 'styled-system/css';

import type { PostReqProductVariant } from '../products.types';

interface ProductFormContentsProps {
  drawContents?: { basic_id?: boolean };
}

export default function ProductFormContents({ drawContents }: ProductFormContentsProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<PostReqProductVariant>();

  return (
    <>
      {drawContents?.basic_id
        ? (
            <label htmlFor="basic_id">
              ＢＡＳＩＣ－ＩＤ
              <Input
                {...register('basic_id')}
                id="basic_id"
                type="number"
                placeholder="ＢＡＳＩＣ－ＩＤ"
                className={css({ w: '10.25rem' })}
              />
              <FormErrorMessage message={errors.basic_id?.message} />
            </label>
          )
        : null}
      <label htmlFor="supplier_id">
        発注先
        <Select {...register('supplier_id')} id="supplier_id">
          <option key="dummy01" value="dummy01">🐛発注先Ａ</option>
          <option key="dummy02" value="dummy02">🐝発注先Ｂ</option>
          <option key="dummy03" value="dummy03">🐞発注先Ｃ</option>
          <option key="dummy04" value="dummy04">🦗発注先Ｄ</option>
        </Select>
      </label>
      <label htmlFor="product_name">
        {/* バリエーションがない場合は basic_products.name のコピー */}
        商品名称
        <Input {...register('product_name')} id="product_name" placeholder="商品名称" />
        <FormErrorMessage message={errors.product_name?.message} />
      </label>
      <label htmlFor="short_name">
        商品略称名
        <Input {...register('short_name')} id="short_name" placeholder="商品略称名" />
        <FormErrorMessage message={errors.short_name?.message} />
      </label>
      <label htmlFor="internal_code">
        発注コード（社内コード）
        <Input {...register('internal_code')} id="internal_code" placeholder="発注コード（社内コード）" />
        <FormErrorMessage message={errors.internal_code?.message} />
      </label>
      <label htmlFor="is_set_product">
        セット商品（ｎ／Ｙ）
        <Select {...register('is_set_product')} id="is_set_product">
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
            {...register('depth_mm')}
            id="depth_mm"
            type="number"
            placeholder="縦 mm"
            className={css({ w: '10.25rem' })}
          />
          <Input
            {...register('width_mm')}
            id="width_mm"
            type="number"
            placeholder="横 mm"
            className={css({ w: '10.25rem' })}
          />
          <Input
            {...register('height_mm')}
            id="height_mm"
            type="number"
            placeholder="高さ mm"
            className={css({ w: '10.25rem' })}
          />
        </div>
        <FormErrorMessage message={errors.depth_mm?.message} />
        <FormErrorMessage message={errors.width_mm?.message} />
        <FormErrorMessage message={errors.height_mm?.message} />
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
            {...register('diameter_mm')}
            id="diameter_mm"
            type="number"
            placeholder="φ mm"
            className={css({ w: '10.25rem' })}
          />
          <Input
            {...register('height_mm')}
            id="height_mm"
            type="number"
            placeholder="高さ mm"
            className={css({ w: '10.25rem' })}
          />
        </div>
        <FormErrorMessage message={errors.diameter_mm?.message} />
        <FormErrorMessage message={errors.height_mm?.message} />
      </fieldset>
      <label htmlFor="weight_g">
        商品重量 g
        <Input
          {...register('weight_g')}
          id="weight_g"
          type="number"
          placeholder="重量 g"
          className={css({ w: '10.25rem' })}
        />
        <FormErrorMessage message={errors.weight_g?.message} />
      </label>
      <label htmlFor="delivery_date">
        終売予定日
        <Input
          {...register('discontinued_date')}
          id="discontinued_date"
          type="date"
          placeholder="終売予定日"
          className={css({
            w: '12rem',
          })}
        />
        <FormErrorMessage message={errors.discontinued_date?.message} />
      </label>
      <label htmlFor="note">
        メモ
        <TextArea
          {...register('note')}
          id="note"
          placeholder="メモ"
          className={css({
            w: '34.5rem',
            h: '3.5rem',
          })}
        />
        <FormErrorMessage message={errors.note?.message} />
      </label>
    </>
  );
}
