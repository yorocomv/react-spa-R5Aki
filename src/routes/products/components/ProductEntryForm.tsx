import { useState } from 'react';
import { FormProvider } from 'react-hook-form';

import BubbleTailHeading from '@/components/ui/elements/BubbleTailHeading';
import Button from '@/components/ui/elements/Button';
import FormContainer from '@/components/ui/elements/FormContainer';
import FloatingLinkIcon from '@/components/ui/FloatingLinkIcon';
import { css } from 'styled-system/css';

import BasicProductFormContents from './BasicProductFormContents';
import { useFetchProductOptions } from './hooks/useFetchProductOptions';
import { useFetchSingleProducts } from './hooks/useFetchSingleProducts';
import ProductCombinationsFormContents from './ProductCombinationsFormContents';
import ProductComponentsFormContents from './ProductComponentsFormContents';
import ProductFormContents from './ProductFormContents';
import ProductSkusFormContents from './ProductSkusFormContents';

interface Props {
  heading: string;
}

interface Gtin {
  jan: string | undefined;
  itf1: string | undefined;
  itf2: string | undefined;
}

export default function ProductEntryForm({ heading }: Props) {
  const [isSet, setIsSet] = useState<'0' | '1'>('0');
  const [packagingTypeText, setPackagingTypeText] = useState<string>('未分類');
  const { productOptions } = useFetchProductOptions();
  const { singleProducts } = useFetchSingleProducts();
  const singleProductsStrListObj = singleProducts.map((product) => {
    return {
      id: product.product_id,
      itemStr: `${product.product_short_name} <${product.internal_code}> ${product.display_category_name} ${product.component_amount}${product.component_unit_name} ${product.packaging_type}`,
    };
  });
  const [gtinObj, setGtinObj] = useState<Gtin>({
    jan: undefined,
    itf1: undefined,
    itf2: undefined,
  });

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
        {heading}
      </BubbleTailHeading>
      <FloatingLinkIcon relativePath="/products" size="2rem" title="商品一覧に戻る" iconType="eye" />
      <FormContainer mergedStyles={css.raw({ px: '5rem', borderRadius: '2xl' })}>
        <FormProvider {...methods}>
          <form onSubmit={onPromise(methods.handleSubmit(onSubmit))}>
            <BasicProductFormContents
              setPackagingTypeText={setPackagingTypeText}
              janCode={gtinObj.jan}
              setGtinObj={setGtinObj}
              selectOptions={{
                product_sourcing_types: productOptions.product_sourcing_types,
                product_categories: productOptions.product_categories,
                product_packaging_types: productOptions.product_packaging_types,
              }}
            />

            <ProductFormContents isSet={isSet} setIsSet={setIsSet} packagingTypeText={packagingTypeText} drawContents={{ basic_id: false, product_name: false }} selectOptions={{ suppliers: productOptions.suppliers }} />

            <div className={css({ minH: '12.9rem' })}>
              {isSet === '0'
                ? (
                    componentsArray.fields.map((field, index) => {
                      const isTail = index === componentsArray.fields.length - 1;
                      return (
                        <ProductComponentsFormContents
                          key={field.id}
                          index={index}
                          remove={componentsArray.remove}
                          append={componentsArray.append}
                          defaultComponent={componentDefaultValues}
                          isTail={isTail}
                          selectOptions={{
                            product_categories: productOptions.product_categories,
                            unit_types: productOptions.unit_types,
                            product_inner_packaging_types: productOptions.product_inner_packaging_types,
                          }}
                        />
                      );
                    })
                  )
                : (
                    setsArray.fields.map((field, index) => {
                      const isTail = index === setsArray.fields.length - 1;
                      return (
                        <ProductCombinationsFormContents
                          key={field.id}
                          index={index}
                          remove={setsArray.remove}
                          append={setsArray.append}
                          defaultCombination={combinationDefaultValues}
                          isTail={isTail}
                          singleProductsStrListObj={singleProductsStrListObj}
                        />
                      );
                    })
                  )}
            </div>

            <ProductSkusFormContents
              drawContents={{ skus_name: false, product_id: false }}
              itf1={gtinObj.itf1}
              itf2={gtinObj.itf2}
            />
            <div className={css({ mt: 4 })}>
              <Button disabled={methods.formState.isSubmitting} type="submit">登録</Button>
              <Button
                onClick={handleReset}
                disabled={methods.formState.isSubmitting}
                variant="redo"
                className={css({
                  ml: 1,
                })}
              >
                クリア
              </Button>
            </div>
          </form>
        </FormProvider>
      </FormContainer>
    </>
  );
}
