import type { z } from 'zod';

import type {
  findShippingInstructionsQuerySchema,
  shippingInstructionCorrectionSchema,
  shippingInstructionHistoryTbRowSchema,
  shippingInstructionPrintIDSchema,
  shippingInstructionPrintInputSchema,
} from './shippingInstructionPrintouts.schemas';

export type ShippingInstructionPrintInput = z.infer<typeof shippingInstructionPrintInputSchema>;
export type ShippingInstructionHistoryTbRow = z.infer<typeof shippingInstructionHistoryTbRowSchema>;
export type ShippingInstructionCorrection = z.infer<typeof shippingInstructionCorrectionSchema>;
export type FindShippingInstructionsQuery = z.infer<typeof findShippingInstructionsQuerySchema>;
export type FindShippingInstructionsQueryCategory = FindShippingInstructionsQuery['category'];
export type ShippingInstructionPrintID = z.infer<typeof shippingInstructionPrintIDSchema>;
