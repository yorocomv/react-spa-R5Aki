// https://github.com/TokunaKimochi/rest-json-db-R5HARU/blob/main/src/routes/products/products.dbTable.schemas.ts
// 必要なものを抜粋

import { z } from 'zod';

export const viewSingleProductsRowSchema = z.object({
  // Product (単体商品)
  product_id: z.number().int().positive(),
  product_name: z.string().min(1).max(32),
  product_short_name: z.string().min(1).max(32),
  internal_code: z.string().min(5).max(10).nullable(),
  available_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  discontinued_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  depth_mm: z.number().int().positive().nullable(),
  width_mm: z.number().int().positive().nullable(),
  diameter_mm: z.number().int().positive().nullable(),
  height_mm: z.number().int().positive().nullable(),
  weight_g: z.number().int().positive().nullable(),
  product_note: z.string().nullable(),
  ulid_str: z.string().ulid(),
  // Basic Product
  basic_product_name: z.string().min(1).max(32),
  jan_code: z.string().length(13).regex(/\d/).nullable(),
  predecessor_id: z.number().int().positive().nullable(),
  expiration_value: z.number().int().positive(),
  expiration_unit: z.enum(['D', 'M', 'Y']),
  sourcing_type: z.string().min(1).max(32),
  category_name: z.string().min(1).max(32),
  packaging_type: z.string().min(1).max(32),
  // Supplier
  // 半角スペースで連結のため name1.length + name2.length + 1
  supplier_name: z.string().min(1).max(61),
  // First Component (代表成分・内容量)
  component_title: z.string().min(1).max(32),
  component_symbol: z.string().min(1).max(8),
  component_amount: z.number().positive(),
  component_unit_name: z.string().min(1).max(8),
  component_pieces: z.number().int().positive(),
  component_inner_packaging_type: z.string().min(1).max(32),
});
