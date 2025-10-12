import { useFormContext } from 'react-hook-form';
import { TbPencilPlus, TbTrash } from 'react-icons/tb';

import Input from '@/components/ui/elements/Input';
import Select from '@/components/ui/elements/Select';
import FormErrorMessage from '@/components/ui/elementSwitchers/FormErrorMessage';
import TooltipWrapper from '@/components/ui/TooltipWrapper';
import { css } from 'styled-system/css';

import type { ProductOptionsIdAndName } from '../options/options.types';
import type { PostReqNewProduct } from '../products.types';

interface Props {
  index: number;
  remove: (index: number) => void;
  append: (data: PostReqNewProduct['components'][0]) => void;
  defaultComponent: PostReqNewProduct['components'][0];
  isTail: boolean;
  selectOptions: {
    unit_types: ProductOptionsIdAndName[];
    product_inner_packaging_types: ProductOptionsIdAndName[];
  };
}

export default function ProductComponentsFormContents({
  index,
  remove,
  append,
  defaultComponent,
  isTail,
  selectOptions,
}: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext<PostReqNewProduct>();

  return (
    <div className={css({
      m: '1rem',
      p: '1rem',
      borderWidth: '1px',
      borderColor: '#fefefe',
      borderRadius: 'lg',
      shadow: 'inset-sm',
    })}
    >
      <label htmlFor={`components.${index}.title`}>
        内容物名
        <Input
          {...register(`components.${index}.title` as const)}
          id={`components.${index}.title`}
          placeholder="内容物名"
        />
        <FormErrorMessage message={errors.components?.[index]?.title?.message} />
      </label>
      <label htmlFor={`components.${index}.symbol`}>
        記号
        <Input
          {...register(`components.${index}.symbol` as const)}
          id={`components.${index}.symbol`}
          placeholder="記号"
        />
        <FormErrorMessage message={errors.components?.[index]?.symbol?.message} />
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
            {...register(`components.${index}.amount` as const)}
            id={`components.${index}.amount`}
            type="number"
            placeholder="個別内容量"
            className={css({ w: '10.25rem' })}
          />
          <Select
            {...register(`components.${index}.unit_type_id` as const)}
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
            {...register(`components.${index}.pieces` as const)}
            id={`components.${index}.pieces`}
            type="number"
            placeholder="商品入数"
            className={css({ w: '10.25rem' })}
          />
        </div>
        <FormErrorMessage message={errors.components?.[index]?.amount?.message} />
        <FormErrorMessage message={errors.components?.[index]?.pieces?.message} />
      </div>
      <label htmlFor={`components.${index}.inner_packaging_type_id`}>
        小分けパッケージタイプ
        <Select
          {...register(`components.${index}.inner_packaging_type_id` as const)}
          id={`components.${index}.inner_packaging_type_id`}
        >
          {selectOptions.product_inner_packaging_types.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </Select>
        <FormErrorMessage message={errors.components?.[index]?.inner_packaging_type_id?.message} />
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
                  onClick={() => append(defaultComponent)}
                  className={css({ _hover: { cursor: 'pointer' } })}
                />
              </TooltipWrapper>
            )
          : null}
      </div>
    </div>
  );
}
