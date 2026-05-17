import type { SubmitHandler } from 'react-hook-form';
import type { ZodType } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import type { NewProductCommonDefaultValues, PostReqNewProduct, PostReqNewSetProduct, PostReqNewUnifiedProduct } from './products.types';

import { useRegisterProducts } from './components/hooks/useRegisterProducts';
import ProductEntryForm from './components/ProductEntryForm';
import { postReqNewUnifiedProductSchema } from './products.schemas';

const componentDefaultValues: PostReqNewProduct['components'][0] = {
  title: '',
  category_id: 1,
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
  packaging_type_id: 1,
  expiration_unit: 'Y',
  supplier_id: 1,
  priority: 'A',
};
export interface Gtin {
  jan: string | undefined;
  itf1: string | undefined;
  itf2: string | undefined;
}

export default function RegisterProductPage() {
  const [gtinObj, setGtinObj] = useState<Gtin>({
    jan: undefined,
    itf1: undefined,
    itf2: undefined,
  });
  const [isSet, setIsSet] = useState<'0' | '1'>('0');

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
    // 📢重要：アンマウントされたフィールドの値をフォームから除去
    shouldUnregister: true,
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
    <ProductEntryForm
      heading="商品情報の登録"
      isSet={isSet}
      setIsSet={setIsSet}
      gtinObj={gtinObj}
      setGtinObj={setGtinObj}
      methods={methods}
      componentsArray={componentsArray}
      setsArray={setsArray}
      onSubmit={onSubmit}
      handleReset={handleReset}
      componentDefaultValues={componentDefaultValues}
      combinationDefaultValues={combinationDefaultValues}
    />
  );
}
