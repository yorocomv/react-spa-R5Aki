import { calculateCheckDigitForGTIN } from 'gtin-validator';
import { useFormContext } from 'react-hook-form';
import { z } from 'zod';

import Input from '@/components/ui/elements/Input';
import Select from '@/components/ui/elements/Select';
import FormErrorMessage from '@/components/ui/elementSwitchers/FormErrorMessage';
import FormSuggestion from '@/components/ui/elementSwitchers/FormSuggestion';
import env from '@/env';
import { css } from 'styled-system/css';

import type { ProductOptionsIdAndName } from '../options/options.types';
import type { PostReqNewProduct } from '../products.types';

interface Props {
  selectOptions: {
    product_sourcing_types: ProductOptionsIdAndName[];
    product_categories: ProductOptionsIdAndName[];
    product_packaging_types: ProductOptionsIdAndName[];
  };
  janCode: string | undefined;
  setGtinObj: React.Dispatch<React.SetStateAction<{
    jan: string | undefined;
    itf1: string | undefined;
    itf2: string | undefined;
  }>>;
  setPackagingTypeText: React.Dispatch<React.SetStateAction<string>>;
}

export default function BasicProductFormContents({ selectOptions, janCode, setGtinObj, setPackagingTypeText }: Props) {
  const {
    register,
    formState: { errors },
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
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => setPackagingTypeText(e.target.selectedOptions[0].text);

  return (
    <>
      <label htmlFor="basic_name">
        商品カタログ掲載名
        <Input
          {...register('basic_name')}
          id="basic_name"
          placeholder="商品カタログ掲載名"
          className={css({ w: '25rem' })}
        />
        <FormErrorMessage message={errors.basic_name?.message} />
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
      <label htmlFor="jan_code">
        ＪＡＮコード
        <Input
          {...register('jan_code')}
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
      <label htmlFor="category_id">
        商品カテゴリー
        <Select {...register('category_id')} id="category_id">
          {selectOptions.product_categories.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </Select>
      </label>
      <label htmlFor="packaging_type_id">
        商品パッケージタイプ
        <Select
          {...register('packaging_type_id')}
          onChange={handleChange}
          id="packaging_type_id"
        >
          {selectOptions.product_packaging_types.map(({ id, name }) => (
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
