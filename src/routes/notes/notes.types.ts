import { z } from 'zod';
import { noteFormSchema, notesTbRowSchemas } from './notes.schemas';

export type NotesTbRow = z.infer<typeof notesTbRowSchemas>;
export type NoteForm = z.infer<typeof noteFormSchema>;
