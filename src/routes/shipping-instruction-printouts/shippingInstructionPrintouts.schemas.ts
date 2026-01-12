/* https://github.com/TokunaKimochi/rest-json-db-R5HARU/blob/main/src/routes/shipping-instruction-printouts/shippingInstructionPrintouts.schemas.ts より抜粋 */

import { z } from 'zod';

export const shippingInstructionPrintInputSchema = z.object({
  delivery_date: z.coerce
    .date()
    .transform(val => val.toLocaleString('sv-SE', { timeZone: 'Asia/Tokyo', dateStyle: 'short' })),
  delivery_time_str: z.string().max(32),
  // タイムスタンプ with Timezone
  printed_at: z.string().datetime({ offset: true }).optional(),
  page_num_str: z.string().max(8),
  non_fk_customer_id: z.coerce.number().int().positive(),
  customer_name: z.string().max(60),
  customer_address: z.string().max(96),
  wholesaler: z.string().max(32),
  order_number: z.string().max(64),
  shipping_date: z
    .union([
      // ただし、DB側はDATE型で固定なのでデフォルトになるように
      // shipping_date 自体を削る処理をする
      z.string().length(0),
      z.coerce.date().transform(val => val.toLocaleString('sv-SE', { timeZone: 'Asia/Tokyo', dateStyle: 'short' })),
    ])
    .optional(),
  carrier: z.string().max(32),
  package_count: z.coerce.number().int().nonnegative().optional(),
  items_of_order: z.string(),
});
// .extend ここでは上書き
export const shippingInstructionHistoryTbRowSchema = shippingInstructionPrintInputSchema
  .required()
  .extend({
    shipping_date: z.coerce
      .date()
      .transform(val => val.toLocaleString('sv-SE', { timeZone: 'Asia/Tokyo', dateStyle: 'short' })),
    package_count: z.coerce.number().int().nonnegative().nullable(),
  });

export const shippingInstructionCorrectionSchema = shippingInstructionPrintInputSchema
  .required()
  .extend({
    printed_at: z.string(),
    delivery_date: z.string().trim().regex(/^20\d{2}[-/][01]?\d[-/][0-3]?\d/),
    shipping_date: z.string().trim().regex(/^20\d{2}[-/][01]?\d[-/][0-3]?\d/),
  })
  .omit({
    printed_at: true,
    non_fk_customer_id: true,
  });

export const shippingInstructionPrintIDSchema = z
  .object({
    delivery_date: z.coerce
      .date()
      .transform(val => val.toLocaleString('sv-SE', { timeZone: 'Asia/Tokyo', dateStyle: 'short' })),
    printed_at: z
      .string()
      .min(22)
      .regex(/[0-9:.+ -]+/),
  })
  .brand<'ShippingInstructionPrintID'>();
