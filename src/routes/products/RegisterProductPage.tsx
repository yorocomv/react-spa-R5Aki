import type { ZodType } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
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
  predecessor_id: '',
  supplier_id: 1,
  priority: 'A',
};

export default function RegisterProductPage() {
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
  const isSet = methods.watch('is_set_product') || '0';

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

  const resetProcess = () => {
    methods.reset(determineDefaultValue('0'));
    if (setsArray.fields.length) {
      setsArray.replace([]);
    }
    methods.setFocus('basic_name');
  };

  const submitProcess = async (values: PostReqNewUnifiedProduct): Promise<boolean> => {
    try {
      const response = await registerProducts({ url: values.is_set_product === '0' ? '' : '/set-item', values });
      if (response.isRegistered === true) {
        console.log(response);
        resetProcess();
        return true;
      }
      else {
        console.error(response);
        // eslint-disable-next-line no-alert
        alert(`💥エラー⁉️\n${response.uniqueConstraintError.key}: ${response.uniqueConstraintError.value}\nは登録済みです`);
        return false;
      }
    }
    catch (err) {
      console.error('💥💥💥 ', err, ' 💀💀💀');
      return false;
    }
  };
  // セット品か否かで毎回実行するクレンジング＆初期化
  const handleProductTypeChange = (nextType: '0' | '1') => {
    methods.setValue('is_set_product', nextType);

    // 切り替え先に応じて、FieldArray（配列）の中身を入れ替える
    if (nextType === '0') {
      setsArray.replace([]);
      componentsArray.replace([componentDefaultValues]);
    }
    else {
      componentsArray.replace([]);
      setsArray.replace([combinationDefaultValues]);
    }
  };

  return (
    <ProductEntryForm
      mode="new"
      heading="商品情報の登録"
      isSet={isSet}
      onTypeChange={handleProductTypeChange}
      methods={methods}
      componentsArray={componentsArray}
      setsArray={setsArray}
      submitProcess={submitProcess}
      resetProcess={resetProcess}
      componentDefaultValues={componentDefaultValues}
      combinationDefaultValues={combinationDefaultValues}
    />
  );
}
