import { z } from 'zod';

export const SeriesItemSchema = z.object({
  id: z.string().min(1, 'ID es requerido'),
  title: z.string().min(2, 'El título de la serie es requerido'),
  year: z.string().min(4, 'El año es obligatorio'),
  description: z.string().min(5, 'La descripción de la serie es requerida'),
  technique: z.string().min(3, 'La técnica es requerida (ej. Analog collage, Mixed media)'),
  dimensions: z.string().optional(),
  cover_image: z.string().min(1, 'La imagen de portada es requerida'),
  gallery: z.array(z.string()).default([]),
  display_order: z.number().int().default(0),
  published: z.boolean().default(true),
});

export const SeriesListSchema = z.array(SeriesItemSchema);

export type SeriesItem = z.infer<typeof SeriesItemSchema>;

