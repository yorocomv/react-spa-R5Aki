import type { SubmitHandler } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

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

export default function RegisterProduct() {
  const methods = useForm<PostReqNewProduct>({
    mode: 'all',
    resolver: zodResolver(postReqNewProductSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<PostReqNewProduct> = (values) => {
    console.log(values);
  };
  /* interface ProductFormContentsProps {
  drawContents: { basic_id?: boolean };
} */

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
            <ProductComponentsFormContents />
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
