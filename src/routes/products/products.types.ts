// https://github.com/TokunaKimochi/rest-json-db-R5HARU/blob/main/src/routes/products/products.types.ts

import type { z } from 'zod';

import type {
  newProductCommonDefaultValuesSchema,
  newProductSummarySchema,
  postReqNewProductSchema,
  postReqNewProductSkuSchema,
  postReqNewSetProductSchema,
  postReqNewUnifiedProductSchema,
  postReqProductVariantSchema,
  postReqSetProductVariantSchema,
  putReqUnifiedProductSchema,
} from './products.schemas';

export type PostReqNewProduct = z.infer<typeof postReqNewProductSchema>;
export type PostReqNewSetProduct = z.infer<typeof postReqNewSetProductSchema>;
export type PostReqNewUnifiedProduct = z.infer<typeof postReqNewUnifiedProductSchema>;
export type PostReqProductVariant = z.infer<typeof postReqProductVariantSchema>;
export type PostReqSetProductVariant = z.infer<typeof postReqSetProductVariantSchema>;
export type PostReqNewProductSku = z.infer<typeof postReqNewProductSkuSchema>;
export type PutReqUnifiedProduct = z.infer<typeof putReqUnifiedProductSchema>;

// 型レベルで undefined を null に置換する再帰的なマッピング型
type UndefinedToNull<T> = T extends Date
// Date型はそのまま維持
  ? T
  : T extends (infer U)[]
  // 配列の場合は中身を再帰的に処理
    ? UndefinedToNull<U>[]
    : T extends object
    // オブジェクトの各プロパティを処理
    // 💡 -?: をつけることで、プロパティのオプショナル修飾子を強制削除します
      ? { [K in keyof T]-?: UndefinedToNull<T[K]> }
      : undefined extends T
      // undefined が含まれていれば null に置換
        ? Exclude<T, undefined> | null
        : T;

export type PutReqUnifiedProductWithNull = UndefinedToNull<PutReqUnifiedProduct>;

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
