import type { ZodType } from 'zod';

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

import { viewSkuDetailsRowSchema } from './products.dbTable.schemas';

export default function SelectedProducts() {
  const selectedProducts = useAtomValue(selectedProductsAtom);
  const removeProduct = useSetAtom(removeSelectedProductAtom);

  const schema = viewSkuDetailsRowSchema.pick({
    sku_id: true,
    sku_name: true,
  }).extend({
    remark: z.string().max(32),
  });
  const productsSchema = z.object({
    products: z.array(schema).min(1).max(7),
  });

  type ProductsFormValues = z.infer<typeof productsSchema>;

  const methods = useForm<ProductsFormValues>({
    mode: 'all',
    resolver: zodResolver(productsSchema as ZodType<ProductsFormValues>),
    defaultValues: { products: selectedProducts.map((p) => {
      return { sku_id: p.sku_id, sku_name: p.sku_name };
    }) },
    // 📢重要：アンマウントされたフィールドの値をフォームから除去
    shouldUnregister: true,
  });
  const productsArray = useFieldArray({
    name: 'products',
    control: methods.control,
    rules: { minLength: 1, maxLength: 7 },
  });
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
      <main>
        {productsArray.fields.map((field, i) => {
          return (
            <div key={field.id}>
              <div>
                <input type="hidden" {...methods.register(`products.${i}.sku_id` as const)} />
              </div>
              <div>
                <input readOnly {...methods.register(`products.${i}.sku_name` as const)} />
              </div>
              <div className={css({
                display: 'flex',
                gap: '0.5rem',
                alignItems: 'center',
              })}
              >
                <Input
                  type="number"
                  placeholder="発注数"
                  className={css({ w: '10.25rem' })}
                />
                <Select>
                  <option key="0" value="0">ケース</option>
                  <option key="1" value="1">ボール</option>
                  <option key="2" value="2">バラ</option>
                </Select>
              </div>
              <div>
                <CommonDataPicker todayDate={todayDate} />
                <ComboField allowsCustomValue={true} inputIdStr="specified_time" nextFocusIdStr={`products.${i}.remark`} itemsList={specifiedTimes} />
              </div>
              <div>
                <TextArea
                  {...methods.register(`products.${i}.remark` as const)}
                  id={`products.${i}.remark`}
                  placeholder="備考"
                  className={css({
                    w: '34.5rem',
                    h: '3.5rem',
                  })}
                />
              </div>
              <div className={css({
                '&:has(svg)': {
                  mt: '1rem',
                  display: 'flex',
                  gap: '0.5rem',
                  alignItems: 'center',
                },
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
