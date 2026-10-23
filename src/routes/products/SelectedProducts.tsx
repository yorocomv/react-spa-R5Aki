import type { SubmitHandler } from 'react-hook-form';
import type { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { today } from '@internationalized/date';
import { useAtomValue, useSetAtom } from 'jotai';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { TbTrash } from 'react-icons/tb';

import { removeSelectedProductAtom, selectedProductsAtom } from '@/atoms/productsAtom';
import ComboField from '@/components/ui/ComboField';
import CommonDatePicker from '@/components/ui/CommonDatePicker';
import Input from '@/components/ui/elements/Input';
import Select from '@/components/ui/elements/Select';
import TextArea from '@/components/ui/elements/TextArea';
import FormErrorMessage from '@/components/ui/elementSwitchers/FormErrorMessage';
import TooltipWrapper from '@/components/ui/TooltipWrapper';
import onPromise from '@/libs/onPromise';
import { css } from 'styled-system/css';

import FloatingPdfButton from './components/FloatingPdfButton';
import { productsStorageSchema } from './products.storage.schemas';

type ProductsFormValues = z.infer<typeof productsStorageSchema>;

export default function SelectedProducts() {
  const selectedProducts = useAtomValue(selectedProductsAtom);
  const removeProduct = useSetAtom(removeSelectedProductAtom);

  const methods = useForm<ProductsFormValues>({
    mode: 'all',
    resolver: zodResolver(productsStorageSchema),
    defaultValues: {
      products: selectedProducts.map((p) => {
        if (p.is_set_product) {
          // --- セット商品（setSchema）の場合 ---
          return {
            sku_id: p.sku_id,
            sku_name: p.sku_name,
            components: false as const,
            combinations: p.combinations.map(({ combination_id, item_product_short_name, quantity }) => ({
              combination_id,
              item_product_short_name,
              quantity,
            })),
          };
        }
        else {
          // --- 通常商品（schema）の場合 ---
          return {
            sku_id: p.sku_id,
            sku_name: p.sku_name,
            components: p.components.map(({ component_id, amount, pieces }) => ({
              component_id,
              amount,
              pieces,
            })),
            combinations: false as const,
          };
        }
      }),
    },
    // 📢重要：アンマウントされたフィールドの値をフォームから除去
    shouldUnregister: true,
  });
  const productsArray = useFieldArray({
    name: 'products',
    control: methods.control,
    rules: { minLength: 1, maxLength: 7 },
  });

  const onSubmit: SubmitHandler<ProductsFormValues> = /* async */ (values)/* : Promise<void> */ => {
    try {
      console.log(values);
      // https://github.com/remix-run/react-router/issues/12348
      /* Promise.resolve(navigate(`/customers/${response.id}/decide`, { state: response })).catch((err: string) => {
        throw new Error(err);
      }); */
    }
    catch (err: unknown) {
      console.error('💥💥💥 ', err, ' 💀💀💀');
    }
  };

  const productsErrors = methods.formState.errors.products;

  // 納品指定時間
  const specifiedTimes = [{
    id: 0,
    itemStr: '14:00 まで',
  }, {
    id: 1,
    itemStr: '14:30 まで',
  }, {
    id: 2,
    itemStr: '16:00 まで',
  }];
  const todayDate = today('Asia/Tokyo');

  return (
    <div className={css({ h: '100lvh', display: 'grid', placeItems: 'center' })}>
      <main className={css({
        maxW: 'calc(100svw - 1rem)',
        borderRadius: 'lg',
        color: '#49274a',
        bgColor: '#f8eee7',
        border: 'solid 1px #e4dad3',
        boxShadow: 'lg',

        '&>div:first-child': { borderTopRadius: 'lg' },
        '&>div:last-child': { borderBottomRadius: 'lg', borderBottom: 'none' },
        '&>div span, &>div input, &>div textarea, &>div select': { color: '#49274a' },

        '& div:has(> div[aria-label="date picker"]):has(+ div[class*="error"], + p[class*="error"], + [aria-hidden="true"] + div[class*="error"], + [aria-hidden="true"] + p[class*="error"]) > div[aria-label="date picker"], input:has(+ div[class*="error"], + p[class*="error"])':
          {
            borderWidth: 0,
            bgColor: 'pink.100',
            outline: 'solid 0.1rem #ec4899',
          },
      })}
      >
        {productsArray.fields.map((field, i) => {
          const {
            category_color,
            category_color_shade,
            display_category_name,
          } = selectedProducts.find(sku => sku.sku_id === field.sku_id) ?? {};
          return (
            <div
              key={field.id}
              className={css({
                display: 'grid',
                gridTemplateColumns: '1fr auto auto 1fr 2.25rem',
                alignItems: 'center',
                gap: '1.25rem',
                w: '100%',
                p: '1.125rem 1.5rem',
                borderBottom: 'solid 1px #e4dad3',
                _hover: { bgColor: '#f6edf5' },
              })}
              style={{
                '--cat-color': `var(--colors-${category_color}-${category_color_shade})`,
                '--cat-color-light': `var(--colors-${category_color}-${Number(category_color_shade) - 100})`,
                '--cat-text-color': `var(--colors-${category_color}-950)`,
              } as React.CSSProperties}
            >
              <div>
                <input type="hidden" {...methods.register(`products.${i}.sku_id` as const)} />
                <span className={css({
                  h: '1.6em',
                  lineHeight: '1.44em',
                  color: 'var(--cat-text-color)',
                  bgColor: 'var(--cat-color-light)',
                  verticalAlign: 'super',
                  fontSize: '0.625em',
                  ml: '0.4em',
                  px: '0.25em',
                  py: '0.125em',
                })}
                >
                  {display_category_name}
                </span>
                <input
                  readOnly
                  aria-label={`sku name ${i}`}
                  {...methods.register(`products.${i}.sku_name` as const)}
                  className={css({
                    w: '100%',
                    fontWeight: 'bold',
                    fontFamily: '"Plus Jakarta Sans", "Noto Sans JP", sans-serif',
                    fontSize: 'xl',
                  })}
                />
                <div className={css({ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '1.5rem', pl: '0.725rem', fontSize: 'sm' })}>
                  {field.components
                    ? field.components.map(({ component_id, amount, pieces }, j) => (
                        <div key={component_id}>
                          <input type="hidden" {...methods.register(`products.${i}.components.${j}.component_id` as const)} />
                          <input type="hidden" {...methods.register(`products.${i}.components.${j}.amount` as const)} />
                          <input type="hidden" {...methods.register(`products.${i}.components.${j}.pieces` as const)} />
                          <span>{`${amount}g × ${pieces}`}</span>
                        </div>
                      ))
                    : (
                        <input
                          type="hidden"
                          aria-label={`component ${i}`}
                          {...methods.register(`products.${i}.components` as const)}
                        />
                      )}
                  {field.combinations
                    ? field.combinations.map(({ combination_id, item_product_short_name, quantity }, j) => (
                        <div key={combination_id}>
                          <input type="hidden" {...methods.register(`products.${i}.combinations.${j}.combination_id` as const)} />
                          <input type="hidden" {...methods.register(`products.${i}.combinations.${j}.item_product_short_name` as const)} />
                          <input type="hidden" {...methods.register(`products.${i}.combinations.${j}.quantity` as const)} />
                          <span>{`${item_product_short_name} × ${quantity}`}</span>
                        </div>
                      ))
                    : (
                        <input
                          type="hidden"
                          aria-label={`combination ${i}`}
                          {...methods.register(`products.${i}.combinations` as const)}
                        />
                      )}
                </div>
              </div>
              <div className={css({
                display: 'flex',
                gap: '0.425rem',
                alignItems: 'center',
                justifyContent: 'center',
                pos: 'relative',
              })}
              >
                <Input
                  aria-label={`products order quantity ${i}`}
                  {...methods.register(`products.${i}.order_quantity` as const)}
                  type="number"
                  placeholder="発注数"
                  className={css({ w: '6rem' })}
                />
                <FormErrorMessage message={productsErrors?.[i]?.order_quantity?.message} pos="absolute" top="2.75rem" left={0} color="rose.600!" />
                <Select
                  aria-label={`products order unit ${i}`}
                  {...methods.register(`products.${i}.order_unit` as const)}
                >
                  <option value="case">ケース</option>
                  <option value="inner_carton">ボール</option>
                  <option value="piece">バラ</option>
                </Select>
              </div>
              <div className={css({
                display: 'flex',
                flexDir: 'column',
                gap: '0.35rem',
                alignItems: 'center',
                justifyContent: 'center',
                '& div, & button': { h: '2rem', lineHeight: '1.5rem' },
              })}
              >
                <CommonDatePicker
                  name={`products.${i}.delivery_date`}
                  todayDate={todayDate}
                  control={methods.control}
                />
                <FormErrorMessage message={productsErrors?.[i]?.delivery_date?.message} color="rose.600!" />
                <Controller
                  control={methods.control}
                  name={`products.${i}.delivery_time_slot`}
                  render={({ field }) => (
                    <ComboField
                      {...field}
                      placeholder="納品指定時間"
                      allowsCustomValue={true}
                      inputIdStr={`products.${i}.delivery_time_slot`}
                      ariaLabel={`delivery time slot ${i}`}
                      nextFocusIdStr={`products.${i}.remark`}
                      itemsList={specifiedTimes}
                      width="11rem"
                      color="#49274a"
                    />
                  )}
                />
                <FormErrorMessage message={productsErrors?.[i]?.delivery_time_slot?.message} color="rose.600!" />
              </div>
              <div>
                <TextArea
                  aria-label={`products remark ${i}`}
                  {...methods.register(`products.${i}.remark` as const)}
                  id={`products.${i}.remark`}
                  placeholder="備考"
                  className={css({
                    w: '100%',
                    h: '100%',
                  })}
                />
              </div>
              <div className={css({
                display: 'flex',
                flexDir: 'column',
                gap: '0.35rem',
                alignItems: 'center',
                justifyContent: 'center',
              })}
              >
                <TooltipWrapper
                  text="削除"
                  fillColor="rose.500"
                  className={css({ color: 'rose.50', bgColor: 'rose.500', shadow: '2xl' })}
                >
                  <TbTrash
                    size="1.3rem"
                    onClick={() => {
                      productsArray.remove(i);
                      removeProduct(field.sku_id);
                    }}
                    className={css({ _hover: { cursor: 'pointer' } })}
                  />
                </TooltipWrapper>
              </div>
            </div>
          );
        })}
      </main>
      <FloatingPdfButton text="PDF を作成" clickHandler={onPromise(methods.handleSubmit(onSubmit))} />
    </div>
  );
}
