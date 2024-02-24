import { z } from 'zod';
import { invoiceTypesIdAndNameSchemas } from './invoiceTypes.schemas';

type InvoiceTypesIdAndName = z.infer<typeof invoiceTypesIdAndNameSchemas>;

export default InvoiceTypesIdAndName;
