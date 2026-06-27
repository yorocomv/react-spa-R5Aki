// https://github.com/TokunaKimochi/rest-json-db-R5HARU/blob/main/src/routes/products/products.dbTable.types.ts
// 必要なものを抜粋

import type { z } from 'zod';

import type {
  basicProductsTbRowSchema,
  viewProductCombinationsArraySchema,
  viewProductCombinationsRowSchema,
  viewProductComponentsArraySchema,
  viewProductComponentsRowSchema,
  viewProductSkusTagCountsArraySchema,
  viewProductSkuTagsArraySchema,
  viewSingleProductsRowSchema,
  viewSkuDetailsRowSchema,
} from './products.dbTable.schemas';

export type BasicProductsTbRow = z.infer<typeof basicProductsTbRowSchema>;
export type ViewSingleProductsRow = z.infer<typeof viewSingleProductsRowSchema>;
export type ViewSkuDetailsRow = z.infer<typeof viewSkuDetailsRowSchema>;
export type ViewProductCombinationsRow = z.infer<typeof viewProductCombinationsRowSchema>;
export type ViewProductCombinationsArray = z.infer<typeof viewProductCombinationsArraySchema>;
export type ViewProductComponentsRow = z.infer<typeof viewProductComponentsRowSchema>;
export type ViewProductComponentsArray = z.infer<typeof viewProductComponentsArraySchema>;
export type ViewProductSkusTagCountsArray = z.infer<typeof viewProductSkusTagCountsArraySchema>;
export type ViewProductSkuTagsArray = z.infer<typeof viewProductSkuTagsArraySchema>;
