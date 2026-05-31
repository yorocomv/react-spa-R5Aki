import type { ZodType } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useLocation } from 'react-router';

import type { PutReqUnifiedProduct } from './products.types';

import { useUpdateProducts } from './components/hooks/useUpdateProducts';
import ProductEntryForm from './components/ProductEntryForm';
import { putReqDefaultValuesSchema, putReqUnifiedProductSchema } from './products.schemas';

export default function EditProductPage() {
  const location = useLocation();
  const locationState = putReqDefaultValuesSchema.parse(location.state);

  const methods = useForm<PutReqUnifiedProduct>({
    mode: 'all',
    resolver: zodResolver(putReqUnifiedProductSchema as ZodType<PutReqUnifiedProduct>),
    defaultValues: locationState as PutReqUnifiedProduct,
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
    if (locationState.is_set_product === '0') {
      componentsArray.replace(locationState.components);
    }
    else {
      setsArray.replace(locationState.combinations);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetProcess = () => {
    methods.reset();
    methods.setFocus('basic_name');
  };

  const { updateProducts } = useUpdateProducts();
  const submitProcess = async (values: PutReqUnifiedProduct): Promise<boolean> => {
    try {
      console.log(values);
      const response = await updateProducts({ url: values.is_set_product === '0' ? '' : '/set-item', values });
      console.log(response);
      return true;
    }
    catch (err) {
      console.error('💥💥💥 ', err, ' 💀💀💀');
      return false;
    }
  };

  return (
    <ProductEntryForm
      mode="edit"
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
