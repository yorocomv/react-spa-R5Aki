import { useFormContext } from 'react-hook-form';

import Input from '@/components/ui/elements/Input';
import Select from '@/components/ui/elements/Select';
import TextArea from '@/components/ui/elements/TextArea';
import FormErrorMessage from '@/components/ui/elementSwitchers/FormErrorMessage';
import checkKeyDown from '@/libs/checkKeyDown';
import { css } from 'styled-system/css';

import type { ProductOptionsIdAndName } from '../options/options.types';
import type { Products } from '../products.types';

interface Props {
  mode: 'new' | 'edit';
  drawContents?: {
    basic_id?: boolean;
    product_name?: boolean;
  };
  selectOptions: {
    suppliers: ProductOptionsIdAndName[];
  };
  isSet: '0' | '1';
  onTypeChange?: (type: '0' | '1') => void;
  packagingFlags: {
    has_depth: boolean;
    has_width: boolean;
    has_diameter: boolean;
  };
}

export default function ProductFormContents({ mode, drawContents, selectOptions, isSet, onTypeChange, packagingFlags }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext<Products>();
  const handleChange = onTypeChange
    ? (e: React.ChangeEvent<HTMLSelectElement>) => onTypeChange(e.target.value as unknown as '0' | '1')
    : null;
  // 直径パターンかどうかを判定
  const isDiameterPattern = packagingFlags.has_diameter && !Number(isSet);

  return (
    <>
      {drawContents?.basic_id
        ? (
            <label htmlFor="basic_id">
              ＢＡＳＩＣ－ＩＤ
              <Input
                {...register('basic_id')}
                onKeyDown={e => checkKeyDown(e, 'short_name')}
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
          {selectOptions.suppliers.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </Select>
      </label>
      {drawContents?.product_name
        ? (
            <label htmlFor="product_name">
              {/* バリエーションがない場合は basic_products.name のコピー */}
              商品名称
              <Input {...register('product_name')} onKeyDown={e => checkKeyDown(e, 'short_name')} id="product_name" placeholder="商品名称" />
              <FormErrorMessage message={errors.product_name?.message} />
            </label>
          )
        : null}
      <label htmlFor="short_name" className={css({ bg: 'linear-gradient(transparent 40%, oklch(from var(--colors-cyan-300) l c h / 60%) 40%)' })}>
        商品略称
        <Input
          {...register('short_name')}
          onKeyDown={e => checkKeyDown(e, isDiameterPattern ? 'diameter_mm' : 'depth_mm')}
          id="short_name"
          placeholder="商品略称名"
          className={css({ w: '16rem' })}
        />
        <FormErrorMessage message={errors.short_name?.message} />
      </label>
      {mode === 'new' && handleChange
        ? (
            <label htmlFor="is_set_product">
              セット商品（ｎ／Ｙ）
              <Select
                value={isSet}
                {...register('is_set_product')}
                onChange={handleChange}
                id="is_set_product"
              >
                <option key="false" value="0">ＮＯ</option>
                <option key="true" value="1">ＹＥＳ</option>
              </Select>
              <FormErrorMessage message={errors.is_set_product?.message} />
            </label>
          )
        : isSet === '0'
          ? <div>通常商品</div>
          : <div>セット商品</div>}
      {isDiameterPattern
        ? (
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
                  onKeyDown={e => checkKeyDown(e, 'height_mm')}
                  id="diameter_mm"
                  type="number"
                  placeholder="φ mm"
                  className={css({ w: '10.25rem' })}
                />
                <Input
                  {...register('height_mm')}
                  onKeyDown={e => checkKeyDown(e, 'weight_g')}
                  id="height_mm"
                  type="number"
                  placeholder="高さ mm"
                  className={css({ w: '10.25rem' })}
                />
              </div>
              <FormErrorMessage message={errors.diameter_mm?.message} />
              <FormErrorMessage message={errors.height_mm?.message} />
            </fieldset>
          )
        : (
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
                  onKeyDown={e => checkKeyDown(e, 'width_mm')}
                  id="depth_mm"
                  type="number"
                  placeholder="縦 mm"
                  className={css({ w: '10.25rem' })}
                />
                <Input
                  {...register('width_mm')}
                  onKeyDown={e => checkKeyDown(e, 'height_mm')}
                  id="width_mm"
                  type="number"
                  placeholder="横 mm"
                  className={css({ w: '10.25rem' })}
                />
                <Input
                  {...register('height_mm')}
                  onKeyDown={e => checkKeyDown(e, 'weight_g')}
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
          )}
      <label htmlFor="weight_g">
        商品重量 g
        <Input
          {...register('weight_g')}
          onKeyDown={e => checkKeyDown(e, isSet === '0' ? 'components.0.title' : 'combinations.0.item_product_id')}
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
          onKeyDown={e => checkKeyDown(e)}
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
