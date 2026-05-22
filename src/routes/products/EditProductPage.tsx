import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import type { PutReqProductFormValues } from './products.types';

import { putReqUnifiedProductSchema } from './products.schemas';

export default function EditProductPage() {
  const methods = useForm<PutReqProductFormValues>({
    mode: 'all',
    // eslint-disable-next-line ts/no-explicit-any, ts/no-unsafe-assignment
    resolver: zodResolver(putReqUnifiedProductSchema) as any,
  });
}
