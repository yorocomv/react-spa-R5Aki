import type { FieldArray, FieldErrorsImpl, FieldValues, Path, UseFieldArrayAppend } from 'react-hook-form';

import { useFormContext } from 'react-hook-form';
import { TbPencilPlus, TbTrash } from 'react-icons/tb';

import Input from '@/components/ui/elements/Input';
import Select from '@/components/ui/elements/Select';
import FormErrorMessage from '@/components/ui/elementSwitchers/FormErrorMessage';
import TooltipWrapper from '@/components/ui/TooltipWrapper';
import { css } from 'styled-system/css';

import type { ProductOptionsIdAndName } from '../options/options.types';

interface Props<
  TForm extends FieldValues & {
    components: {
      component_id?: number;
      symbol: string;
      title: string;
      category_id: number;
      amount: number;
      unit_type_id: number;
      pieces: number;
      inner_packaging_type_id: number;
    }[];
  },
  TComponent extends FieldValues,
> {
  _typeMeta?: TForm;
  index: number;
  remove: (index: number) => void;
  append: UseFieldArrayAppend<TComponent>;
  defaultComponent?: FieldArray<TComponent>;
  isTail: boolean;
  selectOptions: {
    product_categories: ProductOptionsIdAndName[];
    unit_types: ProductOptionsIdAndName[];
    product_inner_packaging_types: ProductOptionsIdAndName[];
  };
}

export default function ProductComponentsFormContents<
  TForm extends FieldValues & {
    components: {
      symbol: string;
      title: string;
      category_id: number;
      amount: number;
      unit_type_id: number;
      pieces: number;
      inner_packaging_type_id: number;
    }[];
  },
  TComponent extends FieldValues,
>({
  index,
  remove,
  append,
  defaultComponent,
  isTail,
  selectOptions,
}: Props<TForm, TComponent>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<TForm>();
  const componentErrors = errors.components as FieldErrorsImpl<TForm['components']> | undefined;
  const serialNumberStr = (i => i.toString().replace(/\d/g, s => String.fromCharCode(s.charCodeAt(0) + 0xFEE0)))(index + 1);

  return (
    <div className={css({
      m: '1rem',
      p: '1rem',
      borderWidth: '1px',
      borderColor: '#fefefe',
      borderRadius: 'lg',
      shadow: 'inset-md',

      '& mark': {
        px: '0.25rem',
        fontWeight: 'normal',
        bg: 'linear-gradient(transparent 40%, oklch(from var(--colors-fuchsia-400) l c h / 60%) 40%)',
      },
    })}
    >
      <label htmlFor={`components.${index}.title`}>
        内容物（
        {serialNumberStr}
        ）名
        {' '}
        （
        <mark>粉末</mark>
        か
        <mark>顆粒</mark>
        か分かる場合は明記）
        <Input
          {...register(`components.${index}.title` as Path<TForm>)}
          id={`components.${index}.title`}
          placeholder="内容物名"
        />
        <FormErrorMessage message={componentErrors?.[index]?.title?.message} />
      </label>
      <label htmlFor={`components.${index}.category_id`}>
        内容物（
        {serialNumberStr}
        ）カテゴリー
        <Select
          {...register(`components.${index}.category_id` as Path<TForm>)}
          id={`components.${index}.category_id`}
        >
          {selectOptions.product_categories.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </Select>
        <FormErrorMessage message={componentErrors?.[index]?.category_id?.message} />
      </label>
      <label htmlFor={`components.${index}.symbol`}>
        記号
        <Input
          {...register(`components.${index}.symbol` as Path<TForm>)}
          id={`components.${index}.symbol`}
          placeholder="記号"
        />
        <FormErrorMessage message={componentErrors?.[index]?.symbol?.message} />
      </label>
      <div aria-labelledby="expiration">
        <label htmlFor={`components.${index}.amount`}>
          内容量
        </label>
        <div className={css({
          display: 'flex',
          gap: '0.5rem',
          alignItems: 'center',
        })}
        >
          <Input
            {...register(`components.${index}.amount` as Path<TForm>)}
            id={`components.${index}.amount`}
            type="number"
            placeholder="個別内容量"
            className={css({ w: '10.25rem' })}
          />
          <Select
            {...register(`components.${index}.unit_type_id` as Path<TForm>)}
            id={`components.${index}.unit_type_id`}
          >
            {selectOptions.unit_types.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </Select>
          ✕
          <Input
            {...register(`components.${index}.pieces` as Path<TForm>)}
            id={`components.${index}.pieces`}
            type="number"
            placeholder="商品入数"
            className={css({ w: '10.25rem' })}
          />
        </div>
        <FormErrorMessage message={componentErrors?.[index]?.amount?.message} />
        <FormErrorMessage message={componentErrors?.[index]?.pieces?.message} />
      </div>
      <label htmlFor={`components.${index}.inner_packaging_type_id`}>
        小分けパッケージタイプ
        <Select
          {...register(`components.${index}.inner_packaging_type_id` as Path<TForm>)}
          id={`components.${index}.inner_packaging_type_id`}
        >
          {selectOptions.product_inner_packaging_types.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </Select>
        <FormErrorMessage message={componentErrors?.[index]?.inner_packaging_type_id?.message} />
      </label>
      {defaultComponent
        ? (
            <div className={css({
              '&:has(svg)': {
                mt: '1rem',
                display: 'flex',
                gap: '0.5rem',
                alignItems: 'center',
              },
            })}
            >
              {isTail && index !== 0
                ? (
                    <TooltipWrapper
                      text="削除"
                      fillColor="rose.500"
                      className={css({ color: 'rose.50', bgColor: 'rose.500', shadow: '2xl' })}
                    >
                      <TbTrash
                        size="1.3rem"
                        onClick={() => remove(index)}
                        className={css({ _hover: { cursor: 'pointer' } })}
                      />
                    </TooltipWrapper>
                  )
                : null}
              {isTail
                ? (
                    <TooltipWrapper
                      text="追加"
                      fillColor="teal.400"
                      className={css({ color: 'teal.950', bgColor: 'teal.400', shadow: '2xl' })}
                    >
                      <TbPencilPlus
                        size="1.3rem"
                        onClick={() => append(defaultComponent)}
                        className={css({ _hover: { cursor: 'pointer' } })}
                      />
                    </TooltipWrapper>
                  )
                : null}
            </div>
          )
        : null}
    </div>
  );
}
