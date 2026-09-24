import { z } from 'zod';

export const KitItemSchema = z.object({
  id: z.string().min(1, 'ID es requerido'),
  title: z.string().min(2, 'El nombre del kit o recurso es requerido'),
  category: z.string().min(2, 'La categoría es requerida'),
  description: z.string().min(5, 'La descripción es requerida'),
  price: z.string().optional(),
  image: z.string().min(1, 'La imagen de portada es requerida'),
  purchase_url: z.string().url('Debe ser una URL válida').or(z.string().startsWith('#')).or(z.string().startsWith('/')),
  in_stock: z.boolean().default(true),
  display_order: z.number().int().default(0),
});

export const KitListSchema = z.array(KitItemSchema);

export type KitItem = z.infer<typeof KitItemSchema>;
