import type { ZodType } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useLocation } from 'react-router';

import BubbleTailHeading from '@/components/ui/elements/BubbleTailHeading';
import Button from '@/components/ui/elements/Button';
import FormContainer from '@/components/ui/elements/FormContainer';
import FloatingLinkIcon from '@/components/ui/FloatingLinkIcon';
import onPromise from '@/libs/onPromise';
import { css } from 'styled-system/css';

import type { PostReqProductRevision, PostReqSetProductRevision, PostReqUnifiedRevision } from './products.types';

import { useFetchProductOptions } from './components/hooks/useFetchProductOptions';
import { useFetchProductPackagingTypeFlags } from './components/hooks/useFetchProductPackagingTypeFlags';
import { useFetchSingleProducts } from './components/hooks/useFetchSingleProducts';
import ProductCombinationsFormContents from './components/ProductCombinationsFormContents';
import ProductComponentsFormContents from './components/ProductComponentsFormContents';
import ProductFormContents from './components/ProductFormContents';
import ProductSkusFormContents from './components/ProductSkusFormContents';
import { newUnifiedRevisionDefaultValuesSchema, postReqUnifiedRevisionSchema } from './products.schemas';

const componentDefaultValues: PostReqProductRevision['components'][0] = {
  title: '',
  category_id: 1,
  symbol: '',
  amount: 0,
  unit_type_id: 1,
  pieces: 1,
  inner_packaging_type_id: 1,
};
const combinationDefaultValues: PostReqSetProductRevision['combinations'][0] = {
  item_product_id: 0,
  quantity: 1,
};

export default function RegisterProductRevisionPage() {
  const location = useLocation();
  const {
    basic_id,
    basic_name,
    packaging_type_id,
    is_set_product,
    itf_case_code,
    itf_inner_carton_code,
    componentsArrayLength,
    combinationsArrayLength,
  } = newUnifiedRevisionDefaultValuesSchema.parse(location.state);

  const { productOptions } = useFetchProductOptions();
  const { singleProducts } = useFetchSingleProducts();
  const { productPackagingTypeFlags } = useFetchProductPackagingTypeFlags();

  const currentPackagingFlag = productPackagingTypeFlags.find(packagingType => packagingType.id === packaging_type_id);
  const packagingFlags = currentPackagingFlag
    ? {
        has_depth: currentPackagingFlag.has_depth,
        has_width: currentPackagingFlag.has_width,
        has_diameter: currentPackagingFlag.has_diameter,
      }
    : {
        has_depth: false,
        has_width: false,
        has_diameter: false,
      };

  // singleProducts の表示文字列
  const singleProductsStrListObj = singleProducts.map((product) => {
    return {
      id: product.product_id,
      itemStr: `${product.product_short_name} <${product.internal_code}> ${product.display_category_name} ${product.component_amount}${product.component_unit_name} ${product.packaging_type}`,
    };
  });

  const methods = useForm<PostReqUnifiedRevision>({
    mode: 'all',
    resolver: zodResolver(postReqUnifiedRevisionSchema as ZodType<PostReqUnifiedRevision>),
    defaultValues: {
      basic_id,
      is_set_product,
      supplier_id: 1,
      ...(is_set_product === '0'
        ? { components: [componentDefaultValues] }
        : { combinations: [combinationDefaultValues] }),
      priority: 'A',
    },
  });

  const componentsArray = useFieldArray({
    name: 'components',
    control: methods.control,
    rules: { minLength: 1 },
  });
  const setsArray = useFieldArray({
    name: 'combinations',
    control: methods.control,
    rules: { minLength: 1 },
  });

  useEffect(() => {
    if (is_set_product === '0') {
      componentsArray.replace(
        // Array.from() が引数に取る「配列風オブジェクト」
        // の要件を 0 以上の整数値を持つ length プロパティでクリア
        Array.from({ length: componentsArrayLength }, () => ({ ...componentDefaultValues })),
      );
    }
    else {
      setsArray.replace(
        Array.from({ length: combinationsArrayLength }, () => ({ ...combinationDefaultValues })),
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = e => console.log(e);

  const handleReset: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    methods.reset();
    methods.setFocus('product_name');
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
        {`${basic_name}の JAN 変更なしの仕様変更を登録`}
      </BubbleTailHeading>
      <FloatingLinkIcon relativePath="/products" size="2rem" title="商品一覧に戻る" iconType="eye" />
      <FormContainer mergedStyles={css.raw({ px: '5rem', borderRadius: '2xl', overflowX: 'visible' })}>
        <FormProvider {...methods}>
          <form onSubmit={onPromise(methods.handleSubmit(handleSubmit))}>
            <ProductFormContents
              mode="new"
              isSet={is_set_product}
              packagingFlags={packagingFlags}
              drawContents={{ basic_id: false, product_name: true }}
              autoFocusOnTop={true}
              selectOptions={{ suppliers: productOptions.suppliers }}
            />

            <div className={css({ minH: '12.9rem' })}>
              {is_set_product === '0'
                ? (
                    componentsArray.fields.map((field, index) => {
                      return (
                        <ProductComponentsFormContents
                          key={field.id}
                          index={index}
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
                      return (
                        <ProductCombinationsFormContents
                          key={field.id}
                          index={index}
                          singleProductsStrListObj={singleProductsStrListObj}
                        />
                      );
                    })
                  )}
            </div>

            <ProductSkusFormContents
              drawContents={{ skus_name: false, product_id: false }}
              itf1={itf_case_code}
              itf2={itf_inner_carton_code}
            />
            <div className={css({
              display: 'flex',
              justifyContent: 'flex-end',
              width: 'calc(100% + 3rem)',
              mt: 4,
            })}
            >
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
