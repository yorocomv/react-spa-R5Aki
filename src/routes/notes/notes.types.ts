import type { z } from 'zod';

import type { noteFormSchema, notesTbRowSchemas } from './notes.schemas';

export type NotesTbRow = z.infer<typeof notesTbRowSchemas>;
export type NoteForm = z.infer<typeof noteFormSchema>;
