// https://github.com/TokunaKimochi/rest-json-db-R5HARU/blob/main/src/routes/products/products.types.ts

import type { z } from 'zod';

import type {
  newProductCommonDefaultValuesSchema,
  newProductSummarySchema,
  postReqNewProductSchema,
  postReqNewProductSkuSchema,
  postReqNewSetProductSchema,
  postReqProductVariantSchema,
  postReqSetProductVariantSchema,
} from './products.schemas';

export type PostReqNewProduct = z.infer<typeof postReqNewProductSchema>;
export type PostReqNewSetProduct = z.infer<typeof postReqNewSetProductSchema>;
export type PostReqProductVariant = z.infer<typeof postReqProductVariantSchema>;
export type PostReqSetProductVariant = z.infer<typeof postReqSetProductVariantSchema>;
export type PostReqNewProductSku = z.infer<typeof postReqNewProductSkuSchema>;
export type NewProductCommonDefaultValues = z.infer<typeof newProductCommonDefaultValuesSchema>;

type NewProductSummary = z.infer<typeof newProductSummarySchema>;

export type PostResNewProduct = {
  isRegistered: true;
  rows: NewProductSummary;
} | {
  isRegistered: false;
  uniqueConstraintError: {
    key: string;
    value: string;
  };
};
