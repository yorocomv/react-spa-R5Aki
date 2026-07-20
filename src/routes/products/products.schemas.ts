// https://github.com/TokunaKimochi/rest-json-db-R5HARU/blob/main/src/routes/products/products.schemas.ts
// transform() を削除
// z.boolean() => z.coerce.boolean()

import { z } from 'zod';

import { isEmpty, zNullDate, zNullPosInteger, zNullString, zOptDate, zOptPosInteger, zOptString } from '@/libs/zodDistributeEmpties';

export const commonProductsSchema = z.object({
  id: z.coerce.number().int().positive(),
  created_at: z.string().trim().max(40),
  updated_at: z.string().trim().max(40),
});

export const basicProductsSchema = z.object({
  basic_name: z.string().trim().min(1).max(32),
  internal_code: z.preprocess(v => (isEmpty(v) ? undefined : v), z.string().trim().min(5).max(10).optional()),
  jan_code: z.preprocess(v => (isEmpty(v) ? undefined : v), z.string().trim().length(13).regex(/\d/).optional()),
  sourcing_type_id: z.coerce.number().int().positive(),
  packaging_type_id: z.coerce.number().int().positive(),
  expiration_value: zOptPosInteger,
  expiration_unit: z.preprocess(v => (isEmpty(v) ? undefined : v), z.enum(['D', 'M', 'Y']).optional()),
  predecessor_id: zOptPosInteger,
});

export const productsSchema = z.object({
  basic_id: z.coerce.number().int().positive(),
  supplier_id: z.coerce.number().int().positive(),
  product_name: z.string().trim().min(1).max(32),
  short_name: z.string().trim().min(1).max(32),
  is_set_product: z.enum(['0', '1']),
  // * cached_category_id
  // * display_category_name
  // * is_assorted
  // * max_piece_weight
  // * max_piece_weight_unit_type_id はバックエンドで他の入力項目から導出
  depth_mm: zOptPosInteger,
  width_mm: zOptPosInteger,
  diameter_mm: zOptPosInteger,
  height_mm: zOptPosInteger,
  weight_g: zOptPosInteger,
  available_date: zOptDate,
  discontinued_date: zOptDate,
  note: zOptString,
});

const productComponentsSchema = z.object({
  components: z
    .array(
      z.object({
        title: z.string().trim().min(1).max(32),
        category_id: z.coerce.number().int().positive(),
        symbol: z.string().trim().min(1).max(8),
        amount: z.coerce.number().positive(),
        unit_type_id: z.coerce.number().int().positive(),
        pieces: z.coerce.number().int().positive(),
        inner_packaging_type_id: z.coerce.number().int().positive(),
      }),
    )
    .min(1),
});

const productCombinationsSchema = z.object({
  combinations: z
    .array(
      z.object({
        item_product_id: z.coerce.number().int().positive(),
        quantity: z.coerce.number().int().positive(),
      }),
    )
    .min(1),
});

export const productSkusSchema = z.object({
  tags: z.array(z.object({
    value: z.string().min(1).max(32),
    label: z.string().min(1).max(32),
  })).optional(),
  skus_name: z.string().trim().min(1).max(32),
  product_id: z.coerce.number().int().positive(),
  case_quantity: zOptPosInteger,
  inner_carton_quantity: zOptPosInteger,
  itf_case_code: z.preprocess(v => (isEmpty(v) ? undefined : v), z.string().trim().length(14).regex(/\d/).optional()),
  itf_inner_carton_code: z.preprocess(v => (isEmpty(v) ? undefined : v), z.string().trim().length(14).regex(/\d/).optional()),
  case_height_mm: zOptPosInteger,
  case_width_mm: zOptPosInteger,
  case_depth_mm: zOptPosInteger,
  case_weight_g: zOptPosInteger,
  inner_carton_height_mm: zOptPosInteger,
  inner_carton_width_mm: zOptPosInteger,
  inner_carton_depth_mm: zOptPosInteger,
  inner_carton_weight_g: zOptPosInteger,
  priority: z.enum(['A', 'B', 'C']),
});

// 仕入先の新規登録
export const postReqNewSupplierSchema = z.object({
  tel: z
    .string()
    .min(1)
    .min(3)
    .max(13)
    .regex(/^[0-9-]+$/)
    .refine((val: string) => {
      const phoneNumber = val.replace(/\D/g, '');
      if (phoneNumber.includes('104'))
        return true;
      if (phoneNumber.length === 10)
        return true;
      if (phoneNumber.length === 11)
        return true;
      return false;
    }),
  fax: z
    .string()
    .max(12)
    .regex(/^[0-9-]*$/)
    .refine((val: string) => {
      const faxNumber = val.replace(/\D/g, '');
      if (faxNumber.length === 10)
        return true;
      if (faxNumber.length === 0)
        return true;
      return false;
    }),
  url: z.union([z.string().max(255).url(), z.string().length(0)]),
  zip_code: z
    .string()
    .min(1)
    .min(7)
    .max(8)
    .regex(/^[0-9-]+$/)
    .refine((val: string) => {
      const zipCode = val.replace(/\D/g, '');
      if (zipCode.length === 7)
        return true;
      return false;
    }),
  address1: z.string().min(1).max(32),
  address2: z.string().max(32),
  address3: z.string().max(32),
  name1: z.string().min(1).max(30),
  name2: z.string().max(30),
  contact_person_name: z.string().max(32),
  contact_person_phone: z
    .string()
    .max(13)
    .regex(/^[0-9-]*$/)
    .refine((val: string) => {
      const phoneNumber = val.replace(/\D/g, '');
      if (phoneNumber.length === 10)
        return true;
      if (phoneNumber.length === 11)
        return true;
      if (phoneNumber.length === 0)
        return true;
      return false;
    }),
  contact_person_email: z.union([z.string().max(255).email(), z.string().length(0)]),
  note: z.string(),
});

// 完全新規登録（通常商品）
export const postReqNewProductSchema = basicProductsSchema.extend({
  // product_name は basicProductsSchema.name をコピー
  // ulid_str はサーバ側で計算
  // is_set_product を上書き extend()
  ...productsSchema.extend({ is_set_product: z.literal('0') }).omit({ basic_id: true, product_name: true }).shape,
  ...productComponentsSchema.shape,
  // skus_name は productsSchema.short_name をコピー
  // product_id はコピー
  ...productSkusSchema.omit({ skus_name: true, product_id: true }).shape,
});

// 完全新規登録（セット商品）
export const postReqNewSetProductSchema = basicProductsSchema.extend({
  // product_name は basicProductsSchema.name をコピー
  // ulid_str はサーバ側で計算
  // is_set_product を上書き extend()
  ...productsSchema.extend({ is_set_product: z.literal('1') }).omit({ basic_id: true, product_name: true }).shape,
  ...productCombinationsSchema.shape,
  // skus_name は productsSchema.short_name をコピー
  // product_id はコピー
  ...productSkusSchema.omit({ skus_name: true, product_id: true }).shape,
});

export const postReqNewUnifiedProductSchema = z.discriminatedUnion('is_set_product', [
  postReqNewProductSchema,
  postReqNewSetProductSchema,
]);

// 内容量変更などの既存商品のバリエーション（JAN は同じ）
// のデフォルト値 及び useFieldArray で必要になる配列の長さ
// 商品パッケージが直径が必要なものか縦横か判断するための id
export const newUnifiedRevisionDefaultValuesSchema = z.object({
  basic_id: z.number().int().positive(),
  basic_name: z.string().trim().min(1).max(32),
  packaging_type_id: z.number().int().positive(),
  is_set_product: z.enum(['0', '1']),
  itf_case_code: z.preprocess(v => (isEmpty(v) ? undefined : v), z.string().trim().length(14).regex(/\d/).optional()),
  itf_inner_carton_code: z.preprocess(v => (isEmpty(v) ? undefined : v), z.string().trim().length(14).regex(/\d/).optional()),
  componentsArrayLength: z.number().int().nonnegative(),
  combinationsArrayLength: z.number().int().nonnegative(),
});
// （通常商品の）内容量変更などの既存商品のバリエーション（JAN は同じ）
export const postReqProductRevisionSchema = productsSchema.extend({
  // ulid_str はサーバ側で計算
  // is_set_product を上書き extend()
  is_set_product: z.literal('0'),
  ...productComponentsSchema.shape,
  // skus_name は productsSchema.short_name をコピー
  // product_id はコピー
  ...productSkusSchema.omit({ skus_name: true, product_id: true }).shape,
});

// （セット商品の）内容量変更などの既存商品のバリエーション（JAN は同じ）
export const postReqSetProductRevisionSchema = productsSchema.extend({
  // ulid_str はサーバ側で計算
  // is_set_product を上書き extend()
  is_set_product: z.literal('1'),
  ...productCombinationsSchema.shape,
  // skus_name は productsSchema.short_name をコピー
  // product_id はコピー
  ...productSkusSchema.omit({ skus_name: true, product_id: true }).shape,
});

export const postReqUnifiedRevisionSchema = z.discriminatedUnion('is_set_product', [
  postReqProductRevisionSchema,
  postReqSetProductRevisionSchema,
]);

// フォームのデフォルト値
export const newProductCommonDefaultValuesSchema = z.object({
  ...basicProductsSchema.pick({
    sourcing_type_id: true,
    packaging_type_id: true,
    expiration_unit: true,
  }).extend({
    predecessor_id: z.literal(''),
  }).shape,
  ...productsSchema.pick({ supplier_id: true }).shape,
  ...productSkusSchema.pick({ priority: true }).shape,
});

export const newProductSummarySchema = z.object({
  basic_id: z.number().int().positive(),
  product_id: z.number().int().positive(),
  sku_id: z.number().int().positive(),
  product_name: z.string().trim().min(1).max(32),
  short_name: z.string().trim().min(1).max(32),
});

// 通常商品の編集
export const putReqProductSchema = basicProductsSchema.extend({
  ...productsSchema.extend({ is_set_product: z.literal('0') }).shape,
  components: productComponentsSchema.shape.components.element.extend({
    component_id: z.number().int().positive(),
  }).array().min(1),
  ...productSkusSchema.shape,
  sku_id: z.number().int().positive(),
});

// セット商品の編集
export const putReqSetProductSchema = basicProductsSchema.extend({
  ...productsSchema.extend({ is_set_product: z.literal('1') }).shape,
  combinations: productCombinationsSchema.shape.combinations.element.extend({
    combination_id: z.number().int().positive(),
  }).array().min(1),
  ...productSkusSchema.shape,
  sku_id: z.number().int().positive(),
});

// 商品編集ユニオン型
export const putReqUnifiedProductSchema = z.discriminatedUnion('is_set_product', [
  putReqProductSchema,
  putReqSetProductSchema,
]);

// RHF の defaultValues 用 undefined -> null
const nullableFields = {
  internal_code: z.preprocess(v => (isEmpty(v) ? null : v), z.string().trim().min(5).max(10).nullable()),
  jan_code: z.preprocess(v => (isEmpty(v) ? null : v), z.string().trim().length(13).regex(/\d/).nullable()),
  expiration_value: zNullPosInteger,
  expiration_unit: z.preprocess(v => (isEmpty(v) ? null : v), z.enum(['D', 'M', 'Y']).nullable()),
  predecessor_id: zNullPosInteger,
  depth_mm: zNullPosInteger,
  width_mm: zNullPosInteger,
  diameter_mm: zNullPosInteger,
  height_mm: zNullPosInteger,
  weight_g: zNullPosInteger,
  available_date: zNullDate,
  discontinued_date: zNullDate,
  note: zNullString,
  tags: z.array(z.object({
    value: z.string().min(1).max(32),
    label: z.string().min(1).max(32),
  })).nullable(),
  case_quantity: zNullPosInteger,
  inner_carton_quantity: zNullPosInteger,
  itf_case_code: z.preprocess(v => (isEmpty(v) ? null : v), z.string().trim().length(14).regex(/\d/).nullable()),
  itf_inner_carton_code: z.preprocess(v => (isEmpty(v) ? null : v), z.string().trim().length(14).regex(/\d/).nullable()),
  case_height_mm: zNullPosInteger,
  case_width_mm: zNullPosInteger,
  case_depth_mm: zNullPosInteger,
  case_weight_g: zNullPosInteger,
  inner_carton_height_mm: zNullPosInteger,
  inner_carton_width_mm: zNullPosInteger,
  inner_carton_depth_mm: zNullPosInteger,
  inner_carton_weight_g: zNullPosInteger,
};
export const putReqDefaultValuesSchema = z.discriminatedUnion('is_set_product', [
  putReqProductSchema.extend({
    ...nullableFields,
  }),
  putReqSetProductSchema.extend({
    ...nullableFields,
  }),
]);
export const newQuantityVariantDefaultValuesSchema = z.object({
  product_id: z.coerce.number().int().positive(),
  product_name: z.string().trim().min(1).max(32),
  skus_name: z.string().trim().min(1).max(32),
  itf_case_code: z.preprocess(v => (isEmpty(v) ? undefined : v), z.string().trim().length(14).regex(/\d/).optional()),
  itf_inner_carton_code: z.preprocess(v => (isEmpty(v) ? undefined : v), z.string().trim().length(14).regex(/\d/).optional()),
});
