import { z } from 'zod';
import { customerInputsSchema, customersTbRowSchema } from './customers.schemas';

// 使わなくなったが型マージの見本としてコメントで残している
// type Merge<T> = {
//   [K in keyof T]: T[K];
// };

export type CustomersTbRow = z.infer<typeof customersTbRowSchema>;
export type RequiredCustomerSummary = Pick<
  CustomersTbRow,
  'tel' | 'address1' | 'address2' | 'address3' | 'name1' | 'name2' | 'notes' | 'invoice_type_id'
>;
export type RequiredChooseCustomerTbRow = Pick<
  CustomersTbRow,
  'tel' | 'zip_code' | 'address1' | 'address2' | 'address3' | 'name1' | 'name2' | 'nja_city' | 'invoice_type_id'
>;
export type CustomerInputs = z.infer<typeof customerInputsSchema>;

// 使わなくなったが型マージの見本としてコメントで残している
// export type RequiredChooseCustomer = Merge<
//   RequiredChooseCustomerTbRow & { setIsContinued: React.Dispatch<React.SetStateAction<boolean>> }
// >;
