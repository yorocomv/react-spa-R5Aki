import { zodResolver } from '@hookform/resolvers/zod';
import { today } from '@internationalized/date';
import { useAtomValue, useSetAtom } from 'jotai';
import { useFieldArray, useForm } from 'react-hook-form';
import { TbTrash } from 'react-icons/tb';
import { z } from 'zod';

import { removeSelectedProductAtom, selectedProductsAtom } from '@/atoms/productsAtom';
import ComboField from '@/components/ui/ComboField';
import CommonDataPicker from '@/components/ui/CommonDataPicker';
import Input from '@/components/ui/elements/Input';
import Select from '@/components/ui/elements/Select';
import TextArea from '@/components/ui/elements/TextArea';
import TooltipWrapper from '@/components/ui/TooltipWrapper';
import { css } from 'styled-system/css';

import { viewProductCombinationsRowSchema, viewProductComponentsRowSchema, viewSkuDetailsRowSchema } from './products.dbTable.schemas';

export default function SelectedProducts() {
  const selectedProducts = useAtomValue(selectedProductsAtom);
  const removeProduct = useSetAtom(removeSelectedProductAtom);

  const componentsSchema = z.object({
    components: z.array(
      viewProductComponentsRowSchema.pick({
        amount: true,
        pieces: true,
      }),
    ).min(1),
  });
  const combinationsSchema = z.object({
    combinations: z.array(
      viewProductCombinationsRowSchema.pick({
        item_product_short_name: true,
        quantity: true,
      }),
    ).min(1),
  });
  const schema = viewSkuDetailsRowSchema.pick({
    sku_id: true,
    sku_name: true,
  }).extend({
    remark: z.string().max(32).optional(),
    ...componentsSchema.shape,
    combinations: z.literal(false),
  });
  const setSchema = schema.extend({
    ...combinationsSchema.shape,
    components: z.literal(false),
  });
  const productsSchema = z.object({
    products: z.array(z.union([schema, setSchema])).min(1).max(7),
  });

  type ProductsFormValues = z.infer<typeof productsSchema>;

  const methods = useForm<ProductsFormValues>({
    mode: 'all',
    resolver: zodResolver(productsSchema),
    defaultValues: {
      products: selectedProducts.map((p) => {
        if (p.is_set_product) {
          // --- セット商品（setSchema）の場合 ---
          return {
            sku_id: p.sku_id,
            sku_name: p.sku_name,
            components: false as const,
            combinations: p.combinations.map(({ item_product_short_name, quantity }) => ({
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
            components: p.components.map(({ amount, pieces }) => ({
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
                  {...methods.register(`products.${i}.sku_name` as const)}
                  className={css({
                    w: '100%',
                    fontWeight: 'bold',
                    fontFamily: '"Plus Jakarta Sans", "Noto Sans JP", sans-serif',
                    fontSize: 'xl',
                  })}
                />
              </div>
              <div className={css({
                display: 'flex',
                gap: '0.425rem',
                alignItems: 'center',
                justifyContent: 'center',
              })}
              >
                <Input
                  type="number"
                  placeholder="発注数"
                  className={css({ w: '6rem' })}
                />
                <Select>
                  <option key="0" value="0">ケース</option>
                  <option key="1" value="1">ボール</option>
                  <option key="2" value="2">バラ</option>
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
                <CommonDataPicker todayDate={todayDate} />
                <ComboField placeholder="納品指定時間" allowsCustomValue={true} inputIdStr="specified_time" nextFocusIdStr={`products.${i}.remark`} itemsList={specifiedTimes} width="11rem" />
              </div>
              <div>
                <TextArea
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
                // '&:has(svg)': {
                display: 'flex',
                flexDir: 'column',
                gap: '0.35rem',
                alignItems: 'center',
                justifyContent: 'center',
                // },
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
    </div>
  );
}
