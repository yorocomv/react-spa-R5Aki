import type { SubmitHandler } from 'react-hook-form';
import type { ZodType } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';

import BubbleTailHeading from '@/components/ui/elements/BubbleTailHeading';
import Button from '@/components/ui/elements/Button';
import FormContainer from '@/components/ui/elements/FormContainer';
import FloatingLinkIcon from '@/components/ui/FloatingLinkIcon';
import onPromise from '@/libs/onPromise';
import { css } from 'styled-system/css';

import type { ProductSkus } from './products.types';

import { useRegisterQuantityVariantProducts } from './components/hooks/useRegisterQuantityVariantProducts';
import ProductSkusFormContents from './components/ProductSkusFormContents';
import { postReqNewQuantityVariantDefaultValuesSchema, productSkusSchema } from './products.schemas';

export default function RegisterProductQuantityVariantsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = postReqNewQuantityVariantDefaultValuesSchema.parse(location.state);

  const methods = useForm<ProductSkus>({
    mode: 'all',
    resolver: zodResolver(productSkusSchema as ZodType<ProductSkus>),
    defaultValues: { product_id: locationState.product_id, priority: 'A' },
  });
  const { registerProductsSku } = useRegisterQuantityVariantProducts();
  const handleSubmit: SubmitHandler<ProductSkus> = async (values) => {
    try {
      const response = await registerProductsSku({ values });
      if (response.isRegistered === true) {
        console.log(response);
      }
      else {
        console.error(response);
        // eslint-disable-next-line no-alert
        alert(`💥エラー⁉️\n${response.uniqueConstraintError.key}: ${response.uniqueConstraintError.value}\nは登録済みです`);
      }
    }
    catch (err) {
      console.error('💥💥💥 ', err, ' 💀💀💀');
      return false;
    }
    Promise.resolve(navigate('/products')).catch((err: string) => {
      throw new Error(err);
    });
  };
  const handleReset: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    methods.reset();
    methods.setFocus('skus_name');
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
        {`${locationState.skus_name}の入数違いを登録`}
      </BubbleTailHeading>
      <FloatingLinkIcon relativePath="/products" size="2rem" title="商品一覧に戻る" iconType="eye" />
      <FormContainer mergedStyles={css.raw({ px: '5rem', borderRadius: '2xl', overflowX: 'visible' })}>
        <FormProvider {...methods}>
          <form onSubmit={onPromise(methods.handleSubmit(handleSubmit))}>
            <ProductSkusFormContents
              drawContents={{ skus_name: true, product_id: false }}
              itf1={locationState.itf_case_code}
              itf2={locationState.itf_inner_carton_code}
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
