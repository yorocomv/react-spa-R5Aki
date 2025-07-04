import { useFormContext } from 'react-hook-form';

import Input from '@/components/ui/elements/Input';
import Select from '@/components/ui/elements/Select';
import FormErrorMessage from '@/components/ui/elementSwitchers/FormErrorMessage';
import { css } from 'styled-system/css';

import type { PostReqNewProductSku } from '../products.types';

export default function ProductSkusFormContents() {
  const {
    register,
    formState: { errors },
  } = useFormContext<PostReqNewProductSku>();

  return (
    <>
      <label htmlFor="skus_name">
        ＳＫＵ名
        <Input {...register('skus_name')} id="skus_name" placeholder="ＳＫＵ名" />
        <FormErrorMessage message={errors.skus_name?.message} />
      </label>
      <label htmlFor="product_id">
        ＰＲＯＤＵＣＴ－ＩＤ
        <Input {...register('product_id')} id="product_id" placeholder="ＰＲＯＤＵＣＴ－ＩＤ" />
        <FormErrorMessage message={errors.product_id?.message} />
      </label>
      <label htmlFor="case_quantity">
        ケース入数
        <Input
          {...register('case_quantity')}
          id="case_quantity"
          type="number"
          placeholder="ケース入数"
          className={css({ w: '10.25rem' })}
        />
        <FormErrorMessage message={errors.case_quantity?.message} />
      </label>
      <label htmlFor="itf_case_code">
        ＩＴＦコード（ケース）
        <Input
          {...register('itf_case_code')}
          id="itf_case_code"
          placeholder="ＩＴＦコード（ケース）"
          className={css({ w: '12.75rem' })}
        />
        <FormErrorMessage message={errors.itf_case_code?.message} />
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
            {...register('case_depth_mm')}
            id="case_depth_mm"
            type="number"
            placeholder="縦 mm"
            className={css({ w: '10.25rem' })}
          />
          <Input
            {...register('case_width_mm')}
            id="case_width_mm"
            type="number"
            placeholder="横 mm"
            className={css({ w: '10.25rem' })}
          />
          <Input
            {...register('case_height_mm')}
            id="case_height_mm"
            type="number"
            placeholder="高さ mm"
            className={css({ w: '10.25rem' })}
          />
        </div>
        <FormErrorMessage message={errors.case_depth_mm?.message} />
        <FormErrorMessage message={errors.case_width_mm?.message} />
        <FormErrorMessage message={errors.case_height_mm?.message} />
      </fieldset>
      <label htmlFor="case_weight_g">
        ケース重量 g
        <Input
          {...register('case_weight_g')}
          id="case_weight_g"
          type="number"
          placeholder="重量 g"
          className={css({ w: '10.25rem' })}
        />
        <FormErrorMessage message={errors.case_weight_g?.message} />
      </label>
      <label htmlFor="inner_carton_quantity">
        ボール入数
        <Input
          {...register('inner_carton_quantity')}
          id="inner_carton_quantity"
          type="number"
          placeholder="ボール入数"
          className={css({ w: '10.25rem' })}
        />
        <FormErrorMessage message={errors.inner_carton_quantity?.message} />
      </label>
      <label htmlFor="itf_inner_carton_code">
        ＩＴＦコード（ボール）
        <Input
          {...register('itf_inner_carton_code')}
          id="itf_inner_carton_code"
          placeholder="ＩＴＦコード（ボール）"
          className={css({ w: '12.75rem' })}
        />
        <FormErrorMessage message={errors.itf_inner_carton_code?.message} />
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
            {...register('inner_carton_depth_mm')}
            id="inner_carton_depth_mm"
            type="number"
            placeholder="縦 mm"
            className={css({ w: '10.25rem' })}
          />
          <Input
            {...register('inner_carton_width_mm')}
            id="inner_carton_width_mm"
            type="number"
            placeholder="横 mm"
            className={css({ w: '10.25rem' })}
          />
          <Input
            {...register('inner_carton_height_mm')}
            id="inner_carton_height_mm"
            type="number"
            placeholder="高さ mm"
            className={css({ w: '10.25rem' })}
          />
        </div>
        <FormErrorMessage message={errors.inner_carton_depth_mm?.message} />
        <FormErrorMessage message={errors.inner_carton_width_mm?.message} />
        <FormErrorMessage message={errors.inner_carton_height_mm?.message} />
      </fieldset>
      <label htmlFor="inner_carton_weight_g">
        ボール重量 g
        <Input
          {...register('inner_carton_weight_g')}
          id="inner_carton_weight_g"
          type="number"
          placeholder="重量 g"
          className={css({ w: '10.25rem' })}
        />
        <FormErrorMessage message={errors.inner_carton_weight_g?.message} />
      </label>
      <label {...register('priority')} htmlFor="priority">
        在庫チェック重要レベル
        <Select id="priority">
          <option key="A" value="A">🐛Ａ</option>
          <option key="B" value="B">🐝Ｂ</option>
          <option key="C" value="C">🐞Ｃ</option>
        </Select>
      </label>
    </>
  );
}
