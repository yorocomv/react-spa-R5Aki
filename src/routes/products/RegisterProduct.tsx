import type { SubmitHandler } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

import Button from '@/components/ui/elements/Button';
import FormContainer from '@/components/ui/elements/FormContainer';
import onPromise from '@/libs/onPromise';
import { css } from 'styled-system/css';

import type { /* PostReqNewProduct, */ PostReqNewSetProduct } from './products.types';

import BasicProductFormContents from './components/BasicProductFormContents';
import ProductCombinationsFormContents from './components/ProductCombinationsFormContents';
// import ProductComponentsFormContents from './components/ProductComponentsFormContents';
import ProductFormContents from './components/ProductFormContents';
import ProductSkusFormContents from './components/ProductSkusFormContents';
import { /* postReqNewProductSchema, */ postReqNewSetProductSchema } from './products.schemas';

// const componentDefaultValues: PostReqNewProduct['components'][0] = {
//   title: '',
//   symbol: '',
//   amount: 0,
//   unit_type_id: 1,
//   pieces: 1,
//   inner_packaging_type_id: 1,
// };
const combinationDefaultValues: PostReqNewSetProduct['combinations'][0] = {
  item_product_id: 0,
  quantity: 1,
};

export default function RegisterProduct() {
  const [isSet, setIsSet] = useState<0 | 1>(0);
  // const methods = useForm({
  //   mode: 'all',
  //   resolver: zodResolver(postReqNewProductSchema),
  //   defaultValues: {
  //     components: [componentDefaultValues],
  //   },
  // });
  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(postReqNewSetProductSchema),
    defaultValues: {
      combinations: [combinationDefaultValues],
    },
  });

  const { control, handleSubmit } = methods;
  const { fields, append, remove } = useFieldArray({
    name: 'combinations', // 'components',
    control,
    rules: { minLength: 1 },
  });

  const onSubmit: SubmitHandler<PostReqNewSetProduct>/* <PostReqNewProduct> */ = (values) => {
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
            <ProductFormContents isSet={isSet} setIsSet={setIsSet} drawContents={{ basic_id: true }} />
            <hr />
            <hr />
            {/* {fields.map((field, index) => {
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
            })} */}
            <hr />
            <hr />
            {fields.map((field, index) => {
              const isTail = index === fields.length - 1;
              return (
                <ProductCombinationsFormContents
                  key={field.id}
                  index={index}
                  remove={remove}
                  append={append}
                  defaultCombination={{ item_product_id: 0, quantity: 1 }}
                  isTail={isTail}
                />
              );
            })}
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
