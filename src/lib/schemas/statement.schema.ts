import { z } from 'zod';

export const StatementSchema = z.object({
  quote: z.string().min(5, 'La cita del statement no puede estar vacía'),
  paragraphs: z.array(z.string().min(5, 'El párrafo no puede estar vacío')).min(1, 'Agrega al menos un párrafo'),
});

export type StatementData = z.infer<typeof StatementSchema>;

