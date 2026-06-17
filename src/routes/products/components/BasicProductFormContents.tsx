import { calculateCheckDigitForGTIN } from 'gtin-validator';
import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { z } from 'zod';

import ComboField from '@/components/ui/ComboField';
import Input from '@/components/ui/elements/Input';
import Select from '@/components/ui/elements/Select';
import FormErrorMessage from '@/components/ui/elementSwitchers/FormErrorMessage';
import FormSuggestion from '@/components/ui/elementSwitchers/FormSuggestion';
import env from '@/env';
import checkKeyDown from '@/libs/checkKeyDown';
import { css } from 'styled-system/css';

import type { ProductOptionsIdAndName, ProductPackagingTypeFlags } from '../options/options.types';
import type { PostReqNewProduct } from '../products.types';
import type { Gtin } from './ProductEntryForm';

import { useFetchBasicProducts } from './hooks/useFetchBasicProducts';

interface Props {
  selectOptions: {
    product_sourcing_types: ProductOptionsIdAndName[];
    product_categories: ProductOptionsIdAndName[];
    product_packaging_types: ProductOptionsIdAndName[];
  };
  packagingMap?: Map<number, ProductPackagingTypeFlags>;
  janCode: string | undefined;
  setGtinObj: React.Dispatch<React.SetStateAction<Gtin>>;
  setPackagingFlags?: (flags: { has_depth: boolean; has_width: boolean; has_diameter: boolean }) => void;
  basicId: number | undefined;
}

export default function BasicProductFormContents({ selectOptions, packagingMap, janCode, setGtinObj, setPackagingFlags, basicId }: Props) {
  const {
    register,
    control,
    formState: { errors },
    watch,
  } = useFormContext<PostReqNewProduct>();
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

  // packaging_type_id の変更を監視して packagingMap からフラグをセット
  const selectedPackagingTypeId = watch('packaging_type_id');
  useEffect(() => {
    if (!setPackagingFlags)
      return;
    const id = Number(selectedPackagingTypeId);
    const found = packagingMap?.get(id);
    if (found) {
      setPackagingFlags({
        has_depth: !!found.has_depth,
        has_width: !!found.has_width,
        has_diameter: !!found.has_diameter,
      });
    }
    else {
      setPackagingFlags({ has_depth: false, has_width: false, has_diameter: false });
    }
  }, [selectedPackagingTypeId, packagingMap, setPackagingFlags]);

  const { basicProducts } = useFetchBasicProducts(basicId);
  const basicProductsStrObjList = basicProducts.map((product) => {
    return {
      id: product.id,
      itemStr: `<${product.internal_code}> ${product.name}`,
    };
  });

  // 表示用の options: packagingMap があればそれを優先、なければ既存の selectOptions を使う
  const packagingOptions = packagingMap ? Array.from(packagingMap.values()) : selectOptions.product_packaging_types;

  return (
    <>
      <label htmlFor="basic_name">
        商品カタログ掲載名
        <Input
          {...register('basic_name')}
          onKeyDown={e => checkKeyDown(e, 'internal_code')}
          id="basic_name"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          placeholder="商品カタログ掲載名"
          className={css({ w: '25rem' })}
        />
        <FormErrorMessage message={errors.basic_name?.message} />
      </label>
      <label
        htmlFor="internal_code"
        className={css({ bg: 'linear-gradient(transparent 40%, oklch(from var(--colors-yellow-300) l c h / 60%) 40%)' })}
      >
        品番（社内コード）
        <Input
          {...register('internal_code')}
          onKeyDown={e => checkKeyDown(e, 'jan_code')}
          onChange={handleSetGtinCode}
          id="internal_code"
          placeholder="品番（社内コード）"
          className={css({ w: '10rem' })}
        />
        <FormErrorMessage message={errors.internal_code?.message} />
      </label>
      <label htmlFor="jan_code">
        ＪＡＮコード
        <Input
          {...register('jan_code')}
          onKeyDown={e => checkKeyDown(e, 'expiration_value')}
          id="jan_code"
          placeholder="ＪＡＮコード"
          className={css({ w: '12.75rem' })}
        />
        <FormSuggestion suggestion={janCode} />
        <FormErrorMessage message={errors.jan_code?.message} />
      </label>
      <label htmlFor="sourcing_type_id">
        製造販売タイプ
        <Select {...register('sourcing_type_id')} id="sourcing_type_id">
          {selectOptions.product_sourcing_types.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </Select>
      </label>
      <label htmlFor="packaging_type_id">
        商品パッケージタイプ
        <Select {...register('packaging_type_id')} id="packaging_type_id">
          {packagingOptions.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
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
            onKeyDown={e => checkKeyDown(e, 'short_name')}
            id="expiration_value"
            type="number"
            placeholder="賞味期限（期間）"
            className={css({ w: '10.25rem' })}
          />
          <Select {...register('expiration_unit')} id="expiration_unit">
            <option key="Y" value="Y">年</option>
            <option key="M" value="M">月</option>
            <option key="D" value="D">日</option>
          </Select>
        </div>
        <FormErrorMessage message={errors.expiration_value?.message} />
      </div>
      <label htmlFor="predecessor_id">
        先代商品ＩＤ
        <Controller
          control={control}
          name="predecessor_id"
          render={({ field }) => (
            <ComboField
              {...field}
              itemsList={basicProductsStrObjList}
              nextFocusIdStr="short_name"
              inputIdStr="predecessor_id"
              placeholder="先代商品ＩＤ"
              ariaLabel="先代商品ＩＤ"
            />
          )}
        />
        <FormErrorMessage message={errors.predecessor_id?.message} />
      </label>
    </>
  );
}
