import { useFormContext } from 'react-hook-form';

import Input from '@/components/ui/elements/Input';
import Select from '@/components/ui/elements/Select';
import FormErrorMessage from '@/components/ui/elementSwitchers/FormErrorMessage';
import { css } from 'styled-system/css';

import type { PostReqNewProduct } from '../products.types';

interface Props {
  index: number;
  remove: (index: number) => void;
  append: (data: PostReqNewProduct['components'][0]) => void;
  defaultComponent: PostReqNewProduct['components'][0];
  isTail: boolean;
}

export default function ProductComponentsFormContents({
  index,
  remove,
  append,
  defaultComponent,
  isTail,
}: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext<PostReqNewProduct>();
  console.log(errors);

  return (
    <div className={css({
      m: '1rem',
      p: '1rem',
      borderRadius: 'lg',
      shadow: 'inset-2xl',
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
            <option key="dummy01" value="1">🐛ｇ</option>
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
          <option key="dummy01" value="1">🐛タイプＡ</option>
          <option key="dummy02" value="2">🐝タイプＢ</option>
          <option key="dummy03" value="3">🐞タイプＣ</option>
          <option key="dummy04" value="4">🦗タイプＤ</option>
        </Select>
        <FormErrorMessage message={errors.components?.[index]?.inner_packaging_type_id?.message} />
      </label>
      {isTail && index !== 0
        ? (
            <button type="button" onClick={() => remove(index)}>
              削除
            </button>
          )
        : null}
      {isTail
        ? (
            <button type="button" onClick={() => append(defaultComponent)}>
              追加
            </button>
          )
        : null}
    </div>
  );
}
