import type { SubmitHandler } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

import Button from '@/components/ui/elements/Button';
import FormContainer from '@/components/ui/elements/FormContainer';
import onPromise from '@/libs/onPromise';
import { css } from 'styled-system/css';

import type { PostReqNewProduct } from './products.types';

import BasicProductFormContents from './components/BasicProductFormContents';
import ProductCombinationsFormContents from './components/ProductCombinationsFormContents';
import ProductComponentsFormContents from './components/ProductComponentsFormContents';
import ProductFormContents from './components/ProductFormContents';
import ProductSkusFormContents from './components/ProductSkusFormContents';
import { postReqNewProductSchema } from './products.schemas';

const componentDefaultValues: PostReqNewProduct['components'][0] = {
  title: '',
  symbol: '',
  amount: 0,
  unit_type_id: 1,
  pieces: 1,
  inner_packaging_type_id: 1,
};

export default function RegisterProduct() {
  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(postReqNewProductSchema),
    defaultValues: {
      components: [componentDefaultValues],
    },
  });

  const { control, handleSubmit } = methods;
  const { fields, append, remove } = useFieldArray({
    name: 'components',
    control,
    rules: { minLength: 1 },
  });

  const onSubmit: SubmitHandler<PostReqNewProduct> = (values) => {
    console.log(values);
  };

  return (
    <>
      <h2 className={css({
        mx: 'auto',
        p: 2,
        textAlign: 'center',
        fontSize: '3xl',
        fontWeight: 'bold',
      })}
      >
        商品新規登録
      </h2>
      <FormContainer>
        <FormProvider {...methods}>
          <form onSubmit={onPromise(handleSubmit(onSubmit))}>
            <BasicProductFormContents />
            <hr />
            <hr />
            <ProductFormContents drawContents={{ basic_id: true }} />
            <hr />
            <hr />
            {fields.map((field, index) => {
              const isTail = index === fields.length - 1;
              return (
                <ProductComponentsFormContents
                  key={field.id}
                  index={index}
                  remove={remove}
                  append={append}
                  defaultComponent={{ title: '', symbol: '', amount: 0, unit_type_id: 1, pieces: 1, inner_packaging_type_id: 1 }}
                  isTail={isTail}
                />
              );
            })}
            <hr />
            <hr />
            <ProductCombinationsFormContents />
            <hr />
            <hr />
            <ProductSkusFormContents />
            <Button type="submit">登録</Button>
          </form>
        </FormProvider>
      </FormContainer>
    </>
  );
}
