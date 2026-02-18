import type { SubmitHandler } from 'react-hook-form';
import type { ZodType } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

import BubbleTailHeading from '@/components/ui/elements/BubbleTailHeading';
import Button from '@/components/ui/elements/Button';
import FormContainer from '@/components/ui/elements/FormContainer';
import onPromise from '@/libs/onPromise';
import { css } from 'styled-system/css';

import type { NewProductCommonDefaultValues, PostReqNewProduct, PostReqNewSetProduct, PostReqNewUnifiedProduct } from './products.types';

import BasicProductFormContents from './components/BasicProductFormContents';
import { useFetchProductOptions } from './components/hooks/useFetchProductOptions';
import { useFetchSingleProducts } from './components/hooks/useFetchSingleProducts';
import { useRegisterProducts } from './components/hooks/useRegisterProducts';
import ProductCombinationsFormContents from './components/ProductCombinationsFormContents';
import ProductComponentsFormContents from './components/ProductComponentsFormContents';
import ProductFormContents from './components/ProductFormContents';
import ProductSkusFormContents from './components/ProductSkusFormContents';
import { postReqNewUnifiedProductSchema } from './products.schemas';

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
interface Gtin {
  jan: string | undefined;
  itf1: string | undefined;
  itf2: string | undefined;
}

export default function RegisterProduct() {
  const [gtinObj, setGtinObj] = useState<Gtin>({
    jan: undefined,
    itf1: undefined,
    itf2: undefined,
  });
  const [isSet, setIsSet] = useState<'0' | '1'>('0');
  const [packagingTypeText, setPackagingTypeText] = useState<string>('未分類');
  const { productOptions } = useFetchProductOptions();
  const { singleProducts } = useFetchSingleProducts();
  const singleProductsStrListObj = singleProducts.map((product) => {
    return {
      id: product.product_id,
      itemStr: `${product.product_short_name} <${product.internal_code}> ${product.category_name} ${product.component_amount}${product.component_unit_name} ${product.packaging_type}`,
    };
  });

  const determineDefaultValue = (
    isSetMode: '0' | '1',
    values?: PostReqNewUnifiedProduct,
  ): PostReqNewUnifiedProduct => {
    const v = values ?? commonDefaultValues;
    if (isSetMode === '0') {
      return {
        ...v,
        is_set_product: '0',
        components: [componentDefaultValues],
      } as unknown as PostReqNewProduct;
    }
    return {
      ...v,
      is_set_product: '1',
      combinations: [combinationDefaultValues],
    } as unknown as PostReqNewSetProduct;
  };

  const methods = useForm<PostReqNewUnifiedProduct>({
    mode: 'all',
    resolver: zodResolver(postReqNewUnifiedProductSchema as ZodType<PostReqNewUnifiedProduct>),
    defaultValues: determineDefaultValue('0'),
  });

  useEffect(() => {
    const currentValuesCopy = determineDefaultValue(isSet, methods.getValues());
    methods.reset(currentValuesCopy);
  }, [isSet, methods]);

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
  const { registerProducts } = useRegisterProducts();

  const commonResetProcess = () => {
    setIsSet('0');
    setGtinObj({
      jan: undefined,
      itf1: undefined,
      itf2: undefined,
    });
    methods.reset(determineDefaultValue('0'));
    if (setsArray.fields.length) {
      setsArray.replace([]);
    }
    methods.setFocus('basic_name');
  };

  const onSubmit: SubmitHandler<PostReqNewUnifiedProduct> = async (values) => {
    try {
      const response = await registerProducts({ url: values.is_set_product === '0' ? '' : '/set-item', values });
      if (response.isRegistered === true) {
        console.log(response);
        commonResetProcess();
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
  const handleReset: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    commonResetProcess();
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
        <FormProvider {...methods}>
          <form onSubmit={onPromise(methods.handleSubmit(onSubmit))}>
            <BasicProductFormContents
              setPackagingTypeText={setPackagingTypeText}
              janCode={gtinObj.jan}
              selectOptions={{
                product_sourcing_types: productOptions.product_sourcing_types,
                product_categories: productOptions.product_categories,
                product_packaging_types: productOptions.product_packaging_types,
              }}
            />

            <ProductFormContents janCode={gtinObj.jan} setGtinObj={setGtinObj} isSet={isSet} setIsSet={setIsSet} packagingTypeText={packagingTypeText} drawContents={{ basic_id: false, product_name: false }} selectOptions={{ suppliers: productOptions.suppliers }} />

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
