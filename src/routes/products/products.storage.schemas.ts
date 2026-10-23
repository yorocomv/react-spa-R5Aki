import type { CalendarDate } from '@internationalized/date';

import { z } from 'zod';

import { viewProductCombinationsRowSchema, viewProductComponentsRowSchema, viewSkuDetailsRowSchema } from './products.dbTable.schemas';

const componentsSchema = z.object({
  components: z.array(
    viewProductComponentsRowSchema.pick({
      component_id: true,
      amount: true,
      pieces: true,
    }),
  ).min(1),
});
const combinationsSchema = z.object({
  combinations: z.array(
    viewProductCombinationsRowSchema.pick({
      combination_id: true,
      item_product_short_name: true,
      quantity: true,
    }),
  ).min(1),
});

const schema = viewSkuDetailsRowSchema.pick({
  sku_id: true,
  sku_name: true,
}).extend({
  order_quantity: z.coerce.number().refine(val => val !== 0, { message: '数を入力してください' }),
  order_unit: z.enum(['case', 'inner_carton', 'piece']),
  delivery_date: z.custom<CalendarDate>().refine(val => val !== undefined && val !== null, {
    message: '納期を指定してください',
  }), // TODO FIXME
  delivery_time_slot: z.union([z.string().min(4).max(32), z.number()]).nullable(), // TODO FIXME
  remark: z.string().max(32).optional(),
  ...componentsSchema.shape,
  combinations: z.literal(false),
});
const setSchema = schema.extend({
  ...combinationsSchema.shape,
  components: z.literal(false),
});

export const productsStorageSchema = z.object({
  products: z.array(z.union([schema, setSchema])).min(1).max(7),
});
