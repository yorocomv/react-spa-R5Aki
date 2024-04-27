import { z } from 'zod';
import { notesTbRowSchemas } from './notes.schemas';

type NotesTbRow = z.infer<typeof notesTbRowSchemas>;

export default NotesTbRow;
