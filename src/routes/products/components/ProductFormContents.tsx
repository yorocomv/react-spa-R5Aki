import { calculateCheckDigitForGTIN } from 'gtin-validator';
import { useFormContext } from 'react-hook-form';
import { z } from 'zod';

import Input from '@/components/ui/elements/Input';
import Select from '@/components/ui/elements/Select';
import TextArea from '@/components/ui/elements/TextArea';
import FormErrorMessage from '@/components/ui/elementSwitchers/FormErrorMessage';
import env from '@/env';
import { css } from 'styled-system/css';

import type { ProductOptionsIdAndName } from '../options/options.types';
import type { PostReqProductVariant } from '../products.types';

interface Props {
  drawContents?: {
    basic_id?: boolean;
    product_name?: boolean;
  };
  selectOptions: {
    suppliers: ProductOptionsIdAndName[];
  };
  janCode: string | undefined;
  setGtinObj: React.Dispatch<React.SetStateAction<{
    jan: string | undefined;
    itf1: string | undefined;
    itf2: string | undefined;
  }>>;
  isSet: '0' | '1';
  setIsSet: React.Dispatch<React.SetStateAction<'0' | '1'>>;
  packagingTypeText: string;
}

export default function ProductFormContents({ drawContents, selectOptions, janCode, setGtinObj, isSet, setIsSet, packagingTypeText }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext<PostReqProductVariant>();
  const handleSetGtinCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const v = e.target.value;
      if (janCode === undefined && v.length !== 5)
        return;
      const schema = z.string().length(5).regex(/\d/);
      const result = schema.safeParse(v);
      if (!result.success) {
        setGtinObj({ jan: undefined, itf1: undefined, itf2: undefined });
      }
      else {
        const gs1 = env.VITE_GS1_COMPANY_PREFIX;
        const jan = gs1 + result.data + calculateCheckDigitForGTIN(gs1 + result.data);
        const itf1 = `1${gs1}${result.data}${calculateCheckDigitForGTIN(`1${gs1}${result.data}`)}`;
        const itf2 = `2${gs1}${result.data}${calculateCheckDigitForGTIN(`2${gs1}${result.data}`)}`;
        setGtinObj({ jan, itf1, itf2 });
      }
    }
    catch (err) {
      console.error(err);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => setIsSet(e.target.value as unknown as '0' | '1');

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
              <Input {...register('product_name')} id="product_name" placeholder="商品名称" />
              <FormErrorMessage message={errors.product_name?.message} />
            </label>
          )
        : null}
      <label htmlFor="short_name">
        商品略称名
        <Input {...register('short_name')} id="short_name" placeholder="商品略称名" />
        <FormErrorMessage message={errors.short_name?.message} />
      </label>
      <label
        htmlFor="internal_code"
        className={css({ bg: 'linear-gradient(transparent 40%, oklch(0.9052 0.1657 98.11 / 60%) 40%)' })}
      >
        品番（社内コード）
        <Input
          {...register('internal_code')}
          onChange={handleSetGtinCode}
          id="internal_code"
          placeholder="品番（社内コード）"
        />
        <FormErrorMessage message={errors.internal_code?.message} />
      </label>
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
      {(packagingTypeText.includes('缶') && !Number(isSet))
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
          )}
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
