import { z } from 'zod';

export const TallerItemSchema = z.object({
  id: z.string().min(1, 'ID es requerido'),
  title: z.string().min(3, 'El título del taller es obligatorio'),
  date: z.string().min(3, 'La fecha es obligatoria'),
  modality: z.string().min(3, 'La modalidad (ej: Presencial, Online) es requerida'),
  duration: z.string().min(2, 'La duración es requerida'),
  price: z.string().optional(),
  description: z.string().min(10, 'La descripción detallada del taller es requerida'),
  includes: z.array(z.string()).min(1, 'Especifica qué incluye el taller'),
  registration_url: z.string().url('Debe ser un enlace válido').or(z.string().startsWith('#')).or(z.string().startsWith('/')),
  image: z.string().min(1, 'La imagen ilustrativa del taller es requerida'),
  available: z.boolean().default(true),
  display_order: z.number().int().default(0),
});

export const TalleresListSchema = z.array(TallerItemSchema);

export type TallerItem = z.infer<typeof TallerItemSchema>;
