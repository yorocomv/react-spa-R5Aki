import type { z } from 'zod';

import type {
  findShippingInstructionsQuerySchema,
  shippingInstructionPrintHistoryIDSchema,
  shippingInstructionPrintHistoryInputSchema,
  shippingInstructionPrintHistoryTbRowSchema,
} from './shippingInstructionPrintouts.schemas';

export type ShippingInstructionPrintHistoryInput = z.infer<typeof shippingInstructionPrintHistoryInputSchema>;
export type ShippingInstructionPrintHistoryTbRow = z.infer<typeof shippingInstructionPrintHistoryTbRowSchema>;
export type FindShippingInstructionsQuery = z.infer<typeof findShippingInstructionsQuerySchema>;
export type FindShippingInstructionsQueryCategory = FindShippingInstructionsQuery['category'];
export type ShippingInstructionPrintHistoryID = z.infer<typeof shippingInstructionPrintHistoryIDSchema>;
