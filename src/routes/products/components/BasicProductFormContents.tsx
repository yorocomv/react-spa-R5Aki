import { useFormContext } from 'react-hook-form';

import Input from '@/components/ui/elements/Input';
import Select from '@/components/ui/elements/Select';
import FormErrorMessage from '@/components/ui/elementSwitchers/FormErrorMessage';
import { css } from 'styled-system/css';

import type { ProductOptionsIdAndName } from '../options/options.types';
import type { PostReqNewProduct } from '../products.types';

interface Props {
  selectOptions: {
    product_sourcing_types: ProductOptionsIdAndName[];
    product_categories: ProductOptionsIdAndName[];
    product_packaging_types: ProductOptionsIdAndName[];
  };
  setPackagingTypeText: React.Dispatch<React.SetStateAction<string>>;
}

export default function BasicProductFormContents({ selectOptions, setPackagingTypeText }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext<PostReqNewProduct>();
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => setPackagingTypeText(e.target.selectedOptions[0].text);

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
