import { Controller, useFormContext } from 'react-hook-form';
import { TbPencilPlus, TbTrash } from 'react-icons/tb';

import ComboField from '@/components/ui/ComboField';
import Input from '@/components/ui/elements/Input';
import FormErrorMessage from '@/components/ui/elementSwitchers/FormErrorMessage';
import TooltipWrapper from '@/components/ui/TooltipWrapper';
import { css } from 'styled-system/css';

import type { PostReqNewSetProduct } from '../products.types';

interface Props {
  index: number;
  remove: (index: number) => void;
  append: (data: PostReqNewSetProduct['combinations'][0]) => void;
  defaultCombination: PostReqNewSetProduct['combinations'][0];
  isTail: boolean;
  singleProductsStrListObj: {
    id: number;
    itemStr: string;
  }[];
}

export default function ProductCombinationsFormContents({
  index,
  remove,
  append,
  defaultCombination,
  isTail,
  singleProductsStrListObj,
}: Props) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<PostReqNewSetProduct>();
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
          name={`combinations.${index}.item_product_id`}
          render={({ field }) => (
            <ComboField
              {...field}
              itemsList={singleProductsStrListObj}
              placeholder="セット内訳 PRODUCT-ID"
              ariaLabel={label}
            />
          )}
        />
        <FormErrorMessage message={errors.combinations?.[index]?.item_product_id?.message} />
      </label>
      <label htmlFor={`combinations.${index}.quantity`}>
        セット内訳入数
        <Input
          {...register(`combinations.${index}.quantity` as const)}
          id={`combinations.${index}.quantity`}
          type="number"
          placeholder="セット内訳入数"
          className={css({ w: '10.25rem' })}
        />
        <FormErrorMessage message={errors.combinations?.[index]?.quantity?.message} />
      </label>
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
    </div>
  );
}
