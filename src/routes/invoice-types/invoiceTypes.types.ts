import type { z } from 'zod';

import type { invoiceTypesIdAndNameSchemas } from './invoiceTypes.schemas';

type InvoiceTypesIdAndName = z.infer<typeof invoiceTypesIdAndNameSchemas>;

export default InvoiceTypesIdAndName;
