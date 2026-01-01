// https://github.com/TokunaKimochi/rest-json-db-R5HARU/blob/main/src/routes/products/products.dbTable.types.ts
// 必要なものを抜粋

import type { z } from 'zod';

import type {
  viewSingleProductsRowSchema,
} from './products.dbTable.schemas';

export type ViewSingleProductsRow = z.infer<typeof viewSingleProductsRowSchema>;
