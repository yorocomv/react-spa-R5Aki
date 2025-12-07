import type { SubmitHandler } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

import BubbleTailHeading from '@/components/ui/elements/BubbleTailHeading';
import Button from '@/components/ui/elements/Button';
import FormContainer from '@/components/ui/elements/FormContainer';
import onPromise from '@/libs/onPromise';
import { css } from 'styled-system/css';

import type { NewProductCommonDefaultValues, PostReqNewProduct, PostReqNewSetProduct } from './products.types';

import BasicProductFormContents from './components/BasicProductFormContents';
import { useFetchProductsOptions } from './components/hooks/useFetchProductsOptions';
import { useRegisterProducts } from './components/hooks/useRegisterProducts';
import ProductCombinationsFormContents from './components/ProductCombinationsFormContents';
import ProductComponentsFormContents from './components/ProductComponentsFormContents';
import ProductFormContents from './components/ProductFormContents';
import ProductSkusFormContents from './components/ProductSkusFormContents';
import { postReqNewProductSchema, postReqNewSetProductSchema } from './products.schemas';

const componentDefaultValues: PostReqNewProduct['components'][0] = {
  title: '',
  symbol: '',
  amount: 0,
  unit_type_id: 1,
  pieces: 1,
  inner_packaging_type_id: 1,
};
const combinationDefaultValues: PostReqNewSetProduct['combinations'][0] = {
  item_product_id: 0,
  quantity: 1,
};
const commonDefaultValues: NewProductCommonDefaultValues = {
  sourcing_type_id: 1,
  category_id: 1,
  packaging_type_id: 1,
  expiration_unit: 'Y',
  supplier_id: 1,
  priority: 'A',
};

export default function RegisterProduct() {
  const [isSet, setIsSet] = useState<0 | 1>(0);
  const [packagingTypeText, setPackagingTypeText] = useState<string>('未分類');
  const { productsOptions } = useFetchProductsOptions();

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(postReqNewProductSchema),
    defaultValues: {
      ...commonDefaultValues,
      is_set_product: 0,
      components: [componentDefaultValues],
    },
  });
  const setItemMethods = useForm({
    mode: 'all',
    resolver: zodResolver(postReqNewSetProductSchema),
    defaultValues: {
      ...commonDefaultValues,
      is_set_product: 1,
      combinations: [combinationDefaultValues],
    },
  });

  const arrMethods = useFieldArray({
    name: 'components',
    control: methods.control,
    rules: { minLength: 1 },
  });
  const setItemArrMethods = useFieldArray({
    name: 'combinations',
    control: setItemMethods.control,
    rules: { minLength: 1 },
  });
  const { registerProducts } = useRegisterProducts();

  const onSubmit: SubmitHandler<PostReqNewProduct> = async (values) => {
    try {
      const response = await registerProducts({ url: '', values });
      if (response.isRegistered === true) {
        console.log(response);
        methods.reset();
        methods.setFocus('basic_name');
      }
      else {
        console.error(response);
        // eslint-disable-next-line no-alert
        alert(`💥エラー⁉️\n${response.uniqueConstraintError.key}: ${response.uniqueConstraintError.value}\nは登録済みです`);
      }
    }
    catch (err) {
      console.error('💥💥💥 ', err, ' 💀💀💀');
    }
  };
  const onSubmitSetItem: SubmitHandler<PostReqNewSetProduct> = async (values) => {
    await registerProducts({ url: '/set-item', values });
  };

  return (
    <>
      <BubbleTailHeading
        level={2}
        mergedStyles={css.raw({
          p: 2,
          fontSize: '3xl',
          fontWeight: 'bold',
        })}
      >
        商品情報の登録
      </BubbleTailHeading>
      <FormContainer mergedStyles={css.raw({ px: '5rem', borderRadius: '2xl' })}>
        {Number(isSet)
          ? (
              <FormProvider {...setItemMethods}>
                <form onSubmit={onPromise(setItemMethods.handleSubmit(onSubmitSetItem))}>
                  <BasicProductFormContents
                    setPackagingTypeText={setPackagingTypeText}
                    selectOptions={{
                      product_sourcing_types: productsOptions.product_sourcing_types,
                      product_categories: productsOptions.product_categories,
                      product_packaging_types: productsOptions.product_packaging_types,
                    }}
                  />

                  <ProductFormContents isSet={isSet} setIsSet={setIsSet} packagingTypeText={packagingTypeText} drawContents={{ basic_id: false, product_name: false }} selectOptions={{ suppliers: productsOptions.suppliers }} />

                  {setItemArrMethods.fields.map((field, index) => {
                    const isTail = index === setItemArrMethods.fields.length - 1;
                    return (
                      <ProductCombinationsFormContents
                        key={field.id}
                        index={index}
                        remove={setItemArrMethods.remove}
                        append={setItemArrMethods.append}
                        defaultCombination={{ item_product_id: 0, quantity: 1 }}
                        isTail={isTail}
                      />
                    );
                  })}

                  <ProductSkusFormContents drawContents={{ skus_name: false, product_id: false }} />
                  <div className={css({ mt: 4 })}>
                    <Button type="submit">登録</Button>
                  </div>
                </form>
              </FormProvider>
            )
          : (
              <FormProvider {...methods}>
                <form onSubmit={onPromise(methods.handleSubmit(onSubmit))}>
                  <BasicProductFormContents
                    setPackagingTypeText={setPackagingTypeText}
                    selectOptions={{
                      product_sourcing_types: productsOptions.product_sourcing_types,
                      product_categories: productsOptions.product_categories,
                      product_packaging_types: productsOptions.product_packaging_types,
                    }}
                  />

                  <ProductFormContents isSet={isSet} setIsSet={setIsSet} packagingTypeText={packagingTypeText} drawContents={{ basic_id: false, product_name: false }} selectOptions={{ suppliers: productsOptions.suppliers }} />

                  {
                    arrMethods.fields.map((field, index) => {
                      const isTail = index === arrMethods.fields.length - 1;
                      return (
                        <ProductComponentsFormContents
                          key={field.id}
                          index={index}
                          remove={arrMethods.remove}
                          append={arrMethods.append}
                          defaultComponent={{ title: '', symbol: '', amount: 0, unit_type_id: 1, pieces: 1, inner_packaging_type_id: 1 }}
                          isTail={isTail}
                          selectOptions={{
                            unit_types: productsOptions.unit_types,
                            product_inner_packaging_types: productsOptions.product_inner_packaging_types,
                          }}
                        />
                      );
                    })
                  }

                  <ProductSkusFormContents drawContents={{ skus_name: false, product_id: false }} />
                  <div className={css({ mt: 4 })}>
                    <Button type="submit">登録</Button>
                  </div>
                </form>
              </FormProvider>
            )}
      </FormContainer>
    </>
  );
}
