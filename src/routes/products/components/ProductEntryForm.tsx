import type { FieldArray, FieldValues, SubmitHandler, UseFieldArrayReturn, UseFormReturn } from 'react-hook-form';

import { useMemo, useState } from 'react';
import { FormProvider } from 'react-hook-form';

import BubbleTailHeading from '@/components/ui/elements/BubbleTailHeading';
import Button from '@/components/ui/elements/Button';
import FormContainer from '@/components/ui/elements/FormContainer';
import FloatingLinkIcon from '@/components/ui/FloatingLinkIcon';
import onPromise from '@/libs/onPromise';
import { css } from 'styled-system/css';

import type { ProductPackagingTypeFlags } from '../options/options.types';

import BasicProductFormContents from './BasicProductFormContents';
import { useFetchProductOptions } from './hooks/useFetchProductOptions';
import { useFetchProductPackagingTypeFlags } from './hooks/useFetchProductPackagingTypeFlags';
import { useFetchSingleProducts } from './hooks/useFetchSingleProducts';
import ProductCombinationsFormContents from './ProductCombinationsFormContents';
import ProductComponentsFormContents from './ProductComponentsFormContents';
import ProductFormContents from './ProductFormContents';
import ProductSkusFormContents from './ProductSkusFormContents';

interface Props<
  TForm extends FieldValues,
  TComponent extends FieldValues,
  TCombination extends FieldValues,
> {
  mode: 'new' | 'edit';
  heading: string;
  isSet: '0' | '1';
  onTypeChange?: (t: '0' | '1') => void;
  methods: UseFormReturn<TForm>;
  componentsArray: UseFieldArrayReturn<TComponent>;
  setsArray: UseFieldArrayReturn<TCombination>;
  submitProcess: (val: TForm) => Promise<boolean>;
  resetProcess: () => void;
  componentDefaultValues?: FieldArray<TComponent>;
  combinationDefaultValues?: FieldArray<TCombination>;
}
export interface Gtin {
  jan: string | undefined;
  itf1: string | undefined;
  itf2: string | undefined;
}

export default function ProductEntryForm<
  TForm extends FieldValues,
  TComponent extends FieldValues,
  TCombination extends FieldValues,
>({ mode, heading, isSet, onTypeChange, methods, componentsArray, setsArray, submitProcess, resetProcess, componentDefaultValues, combinationDefaultValues }: Props<TForm, TComponent, TCombination>) {
  const { productOptions } = useFetchProductOptions();
  const { singleProducts } = useFetchSingleProducts();
  const { productPackagingTypeFlags } = useFetchProductPackagingTypeFlags();

  const [gtinObj, setGtinObj] = useState<Gtin>({
    jan: undefined,
    itf1: undefined,
    itf2: undefined,
  });
  const [packagingFlags, setPackagingFlags] = useState({
    has_depth: false,
    has_width: false,
    has_diameter: false,
  });

  // packagingRows を Map にして高速参照できるようにする
  const packagingMap = useMemo(() => {
    const m = new Map<number, ProductPackagingTypeFlags>();
    (productPackagingTypeFlags ?? []).forEach(r => m.set(r.id, r));
    return m;
  }, [productPackagingTypeFlags]);

  // singleProducts の表示文字列
  const singleProductsStrListObj = singleProducts.map((product) => {
    return {
      id: product.product_id,
      itemStr: `${product.product_short_name} <${product.internal_code}> ${product.display_category_name} ${product.component_amount}${product.component_unit_name} ${product.packaging_type}`,
    };
  });
  const handleSubmit: SubmitHandler<TForm> = async (val) => {
    const isSuccess = await submitProcess(val);
    if (isSuccess) {
      setGtinObj({ jan: undefined, itf1: undefined, itf2: undefined });
    }
  };
  const handleReset: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    resetProcess();
    setGtinObj({ jan: undefined, itf1: undefined, itf2: undefined });
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
        {heading}
      </BubbleTailHeading>
      <FloatingLinkIcon relativePath="/products" size="2rem" title="商品一覧に戻る" iconType="eye" />
      <FormContainer mergedStyles={css.raw({ px: '5rem', borderRadius: '2xl', overflowX: 'visible' })}>
        <FormProvider {...methods}>
          <form onSubmit={onPromise(methods.handleSubmit(handleSubmit))}>
            <BasicProductFormContents
              janCode={gtinObj.jan}
              setGtinObj={setGtinObj}
              packagingMap={packagingMap}
              selectOptions={{
                product_sourcing_types: productOptions.product_sourcing_types,
                product_categories: productOptions.product_categories,
                product_packaging_types: productOptions.product_packaging_types,
              }}
              setPackagingFlags={setPackagingFlags}
            />

            <ProductFormContents
              mode={mode}
              isSet={isSet}
              onTypeChange={onTypeChange}
              packagingFlags={packagingFlags}
              drawContents={{ basic_id: false, product_name: false }}
              selectOptions={{ suppliers: productOptions.suppliers }}
            />

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
            <div className={css({
              display: 'flex',
              justifyContent: 'flex-end',
              width: 'calc(100% + 3rem)',
              mt: 4,
            })}
            >
              <Button disabled={methods.formState.isSubmitting} type="submit">{mode === 'new' ? '登録' : '修正'}</Button>
              <Button
                onClick={handleReset}
                disabled={methods.formState.isSubmitting}
                variant="redo"
                className={css({
                  ml: 1,
                })}
              >
                {mode === 'new' ? 'クリア' : 'リセット'}
              </Button>
            </div>
          </form>
        </FormProvider>
      </FormContainer>
    </>
  );
}
