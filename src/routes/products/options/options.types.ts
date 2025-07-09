// https://github.com/TokunaKimochi/rest-json-db-R5HARU/blob/main/src/routes/products/options/options.types.ts

import type { z } from 'zod';

import type { optionTypesSchemas, productOptionsIdAndNameSchemas } from './options.schemas';

export type ProductOptionsIdAndName = z.infer<typeof productOptionsIdAndNameSchemas>;
export type OptionTypes = z.infer<typeof optionTypesSchemas>;
