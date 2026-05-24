import type { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router';

import { useRegisterProducts } from './components/hooks/useRegisterProducts';
import ProductEntryForm from './components/ProductEntryForm';
import { putReqDefaultValuesSchema, putReqUnifiedProductSchema } from './products.schemas';

export type PutInput = z.input<typeof putReqUnifiedProductSchema>;
export type PutOutput = z.output<typeof putReqUnifiedProductSchema>;

export default function EditProductPage() {
  const { registerProducts } = useRegisterProducts();
  const location = useLocation();
  const locationState = putReqDefaultValuesSchema.parse(location.state);

  const methods = useForm<PutInput>({
    mode: 'all',
    resolver: zodResolver(putReqUnifiedProductSchema),
    defaultValues: locationState,
  });

  const resetProcess = () => {
    methods.reset();
    methods.setFocus('basic_name');
  };

  const submitProcess = async (values: PutOutput): Promise<boolean> => {
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

  return (
    <ProductEntryForm
      heading={`${locationState.short_name} 商品情報の修正`}
      isSet={locationState.is_set_product}
      methods={methods}
      componentsArray={componentsArray}
      setsArray={setsArray}
      submitProcess={submitProcess}
      resetProcess={resetProcess}
    />
  );
}
