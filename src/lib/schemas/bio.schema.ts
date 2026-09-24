import { z } from 'zod';

export const BioSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  title: z.string().min(3, 'El título profesional es obligatorio'),
  bio_summary: z.string().min(10, 'La biografía debe tener al menos 10 caracteres'),
  location: z.string().min(3, 'La ubicación es obligatoria'),
  experience: z.string().min(5, 'Describe brevemente la trayectoria'),
  avatar_url: z.string().url('Debe ser una URL válida o ruta relativa').or(z.string().startsWith('/')),
});

export type BioData = z.infer<typeof BioSchema>;

