import type { FieldArray, FieldErrorsImpl, FieldValues, Path, UseFieldArrayAppend } from 'react-hook-form';

import { Controller, useFormContext } from 'react-hook-form';
import { TbPencilPlus, TbTrash } from 'react-icons/tb';

import ComboField from '@/components/ui/ComboField';
import Input from '@/components/ui/elements/Input';
import FormErrorMessage from '@/components/ui/elementSwitchers/FormErrorMessage';
import TooltipWrapper from '@/components/ui/TooltipWrapper';
import checkKeyDown from '@/libs/checkKeyDown';
import { css } from 'styled-system/css';

interface Props<
  TForm extends FieldValues & {
    combinations: {
      combination_id?: number;
      item_product_id: number;
      quantity: number;
    }[];
  },
  TCombination extends FieldValues,
> {
  _typeMeta?: TForm;
  index: number;
  remove: (index: number) => void;
  append: UseFieldArrayAppend<TCombination>;
  defaultCombination?: FieldArray<TCombination>;
  isTail: boolean;
  singleProductsStrListObj: {
    id: number;
    itemStr: string;
  }[];
}

export default function ProductCombinationsFormContents<
  TForm extends FieldValues & {
    combinations: {
      combination_id?: number;
      item_product_id: number;
      quantity: number;
    }[];
  },
  TCombination extends FieldValues,
>({
  index,
  remove,
  append,
  defaultCombination,
  isTail,
  singleProductsStrListObj,
}: Props<TForm, TCombination>) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<TForm>();
  const combinationErrors = errors.combinations as FieldErrorsImpl<TForm['combinations']>;
  const label = (i => `セット内訳（構成物${i.toString().replace(/\d/g, s => String.fromCharCode(s.charCodeAt(0) + 0xFEE0))}） PRODUCT-ID`)(index + 1);

  return (
    <div className={css({
      m: '1rem',
      p: '1rem',
      borderWidth: '1px',
      borderColor: '#fefefe',
      borderRadius: 'lg',
      shadow: 'inset-md',
    })}
    >
      <label htmlFor={`combinations.${index}.item_product_id`}>
        {label}
        <Controller
          control={control}
          name={`combinations.${index}.item_product_id` as Path<TForm>}
          render={({ field }) => (
            <ComboField
              {...field}
              itemsList={singleProductsStrListObj}
              placeholder="セット内訳 PRODUCT-ID"
              ariaLabel={label}
            />
          )}
        />
        <FormErrorMessage message={combinationErrors?.[index]?.item_product_id?.message} />
      </label>
      <label htmlFor={`combinations.${index}.quantity`}>
        セット内訳入数
        <Input
          {...register(`combinations.${index}.quantity` as Path<TForm>)}
          onKeyDown={e => checkKeyDown(e, 'case_quantity')}
          id={`combinations.${index}.quantity`}
          type="number"
          placeholder="セット内訳入数"
          className={css({ w: '10.25rem' })}
        />
        <FormErrorMessage message={combinationErrors?.[index]?.quantity?.message} />
      </label>
      {defaultCombination
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
                        onClick={() => append(defaultCombination)}
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
